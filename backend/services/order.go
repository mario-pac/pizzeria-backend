package services

import (
	"encoding/json"
	"go/pizzeria-backend/models"
	"go/pizzeria-backend/utils"
	"io"
	"net/http"
	"strconv"
	"time"
)

func (s *Service) HandleListOrders(w http.ResponseWriter, r *http.Request) {
	token := s.HandleConfirmToken(w, r)

	if !token {
		http.Error(w, "token inválido!", http.StatusUnauthorized)
		return
	}

	filters := &models.OrdersListFilters{}

	val := r.Header.Get("customerName")
	filters.CustomerName = &val

	val = r.Header.Get("employeeId")
	if val != "" {
		aux := int64(utils.ConvertStringToInt(val))
		filters.EmployeeId = &aux
	}

	val = r.Header.Get("idStatus")
	if val != "" {
		aux := int64(utils.ConvertStringToInt(val))
		filters.IdStatus = &aux
	}

	val = r.Header.Get("idCompany")
	filters.IdCompany = utils.ConvertStringToInt(val)

	val = r.Header.Get("createdAtInit")
	if val != "" {
		createdAtInit, err := time.Parse("20060102", val)
		if err != nil {
			http.Error(w, "erro ao converter dados de string para time", http.StatusBadRequest)
			return
		}
		filters.CreatedAtInit = &createdAtInit
	}

	val = r.Header.Get("createdAtFinal")
	if val != "" {
		createdAtFinal, err := time.Parse("20060102", val)
		if err != nil {
			http.Error(w, "erro ao converter dados de string para time", http.StatusBadRequest)
			return
		}
		filters.CreatedAtFinal = &createdAtFinal
	}

	orders, err := s.db.ListOrders(*filters)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string][]*models.Order{"data": orders}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleAddOrder(w http.ResponseWriter, r *http.Request) {
	token := s.HandleConfirmToken(w, r)
	if !token {
		http.Error(w, "token inválido!", http.StatusUnauthorized)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var order models.OrderResponse

	err = json.Unmarshal(body, &order)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(order.Self.CustomerName) == 0 {
		http.Error(w, "nome do cliente é obrigatório!", http.StatusBadRequest)
		return
	}
	if order.Self.EmployeeId == 0 {
		http.Error(w, "funcionário é obrigatório!", http.StatusBadRequest)
		return
	}
	if int64(order.Self.IdCompany) == 0 {
		http.Error(w, "idEmpresa é obrigatório!", http.StatusBadRequest)
		return
	}
	if order.Self.TableNumber == 0 {
		http.Error(w, "número da mesa é obrigatório!", http.StatusBadRequest)
		return
	}

	id, err := s.db.InsertOrder(order.Self)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	for _, item := range order.OrderItems {
		item.Self.OrderID = id
		s.db.InsertOrderItem(item.Self)
	}

	response := map[string]string{"message": "Pedido adicionado com sucesso!"}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleUpdateOrder(w http.ResponseWriter, r *http.Request) {
	token := s.HandleConfirmToken(w, r)
	if !token {
		http.Error(w, "token inválido!", http.StatusUnauthorized)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var order models.OrderResponse

	err = json.Unmarshal(body, &order)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(order.Self.CustomerName) == 0 {
		http.Error(w, "nome do cliente é obrigatório!", http.StatusBadRequest)
		return
	}
	if order.Self.EmployeeId == 0 {
		http.Error(w, "funcionário é obrigatório!", http.StatusBadRequest)
		return
	}
	if order.Self.TableNumber == 0 {
		http.Error(w, "número da mesa é obrigatório!", http.StatusBadRequest)
		return
	}
	if len(strconv.Itoa(int(order.Self.Id))) == 0 {
		http.Error(w, "o id do pedido é obrigatório!", http.StatusBadRequest)
		return
	}

	err = s.db.UpdateOrder(order.Self)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	for _, id := range order.ItemsDeleted {
		if id != nil {
			s.db.DeleteOrderItem(*id)
		}
	}

	for _, item := range order.OrderItems {
		hasItem, err := s.db.OrderItemById(item.Self.Id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		if hasItem != nil {
			s.db.UpdateOrderItem(item.Self)
			continue
		}
		s.db.InsertOrderItem(item.Self)
	}

	response := map[string]string{"message": "Pedido atualizado com sucesso!"}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleRemoveOrder(w http.ResponseWriter, r *http.Request) {
	token := s.HandleConfirmToken(w, r)
	if !token {
		http.Error(w, "token inválido!", http.StatusUnauthorized)
		return
	}

	idOrder, err := strconv.Atoi(r.Header.Get("idOrder"))
	if err != nil {
		http.Error(w, "erro ao converter dados de string para int", http.StatusBadRequest)
		return
	}

	items, err := s.db.OrderItemsByIdOrder(int64(idOrder))
	if err != nil {
		http.Error(w, "erro ao buscar itens do pedido", http.StatusBadRequest)
		return
	}

	for _, it := range items {
		err = s.db.DeleteOrderItem(it.Self.Id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
	}

	err = s.db.DeleteOrder(int64(idOrder))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string]string{"message": "Pedido removido com sucesso!"}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleOrderByID(w http.ResponseWriter, r *http.Request) {
	token := s.HandleConfirmToken(w, r)
	if !token {
		http.Error(w, "token inválido!", http.StatusUnauthorized)
		return
	}

	idOrder, err := strconv.Atoi(r.Header.Get("idOrder"))
	if err != nil {
		http.Error(w, "erro ao converter dados de string para int", http.StatusBadRequest)
		return
	}

	order, err := s.db.OrderById(int64(idOrder))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string]*models.OrderResponse{"data": order}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleGetUsedTables(w http.ResponseWriter, r *http.Request) {
	token := s.HandleConfirmToken(w, r)
	if !token {
		http.Error(w, "token inválido!", http.StatusUnauthorized)
		return
	}

	idCompany, err := strconv.Atoi(r.Header.Get("idCompany"))
	if err != nil {
		http.Error(w, "erro ao converter dados de string para int", http.StatusBadRequest)
		return
	}

	desks, err := s.db.GetUsedDesks(idCompany)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string][]*models.Desk{"data": desks}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
