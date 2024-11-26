package services

import (
	"encoding/json"
	"fmt"
	"go/pizzeria-backend/models"
	"go/pizzeria-backend/utils"
	"io"
	"log"
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

	response := map[string][]*models.OrderResponse{"data": orders}
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

	val := s.GetTotalValueOrder(order.OrderItems)
	order.Self.TotalValue = val

	id, err := s.db.InsertOrder(order.Self)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	for _, item := range order.OrderItems {
		if item != nil {
			item.Self.OrderID = id
			err := s.db.InsertOrderItem(item.Self)
			if err != nil {
				log.Println(fmt.Errorf("erro ao inserir o item: %v", err))
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}
		}
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

	val := s.GetTotalValueOrder(order.OrderItems)
	if order.Self.IdStatus != 6 {
		order.Self.TotalValue = val
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
		item.Self.OrderID = order.Self.Id
		hasItem, err := s.db.OrderItemById(item.Self.Id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		if hasItem != nil && hasItem.Self.Id > 0 {
			err := s.db.UpdateOrderItem(item.Self)
			if err != nil {
				log.Println(fmt.Errorf("erro ao atualizar o item: %v", err))
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}
			continue
		}
		err = s.db.InsertOrderItem(item.Self)
		if err != nil {
			log.Println(fmt.Errorf("erro ao inserir o item: %v", err))
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
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

func (s *Service) GetTotalValueOrder(oi []*models.OrderItemResponse) float64 {
	var i float64

	for _, r := range oi {
		if r != nil && r.Self.Quantity > 0 && r.Self.ProductID > 0 {
			prd, err := s.db.ProductById(r.Self.ProductID)
			if err != nil || prd == nil {
				continue
			}
			i += (prd.Price * float64(r.Self.Quantity))
		}
	}

	return i
}
