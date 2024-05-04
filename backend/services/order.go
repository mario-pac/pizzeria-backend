package services

import (
	"encoding/json"
	"go/pizzeria-backend/models"
	"io"
	"net/http"
	"strconv"
)

func (s *Service) HandleListOrders(w http.ResponseWriter, r *http.Request) {
	token := s.HandleConfirmToken(w, r)

	if !token {
		http.Error(w, "token inválido!", http.StatusUnauthorized)
		return
	}

	filters := &models.OrdersListFilters{}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = json.Unmarshal(body, &filters)
	if err != nil {

		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if filters == nil {
		http.Error(w, "é necessário informar o idEmpresa", http.StatusBadRequest)
		return
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

	var order models.Order

	err = json.Unmarshal(body, &order)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(order.CustomerName) == 0 {
		http.Error(w, "nome do cliente é obrigatório!", http.StatusBadRequest)
		return
	}
	if order.EmployeeId == 0 {
		http.Error(w, "funcionário é obrigatório!", http.StatusBadRequest)
		return
	}
	if int64(order.IdCompany) == 0 {
		http.Error(w, "idEmpresa é obrigatório!", http.StatusBadRequest)
		return
	}
	if order.TableNumber == 0 {
		http.Error(w, "número da mesa é obrigatório!", http.StatusBadRequest)
		return
	}

	err = s.db.InsertOrder(order)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
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

	var order models.Order

	err = json.Unmarshal(body, &order)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(order.CustomerName) == 0 {
		http.Error(w, "nome do cliente é obrigatório!", http.StatusBadRequest)
		return
	}
	if order.EmployeeId == 0 {
		http.Error(w, "funcionário é obrigatório!", http.StatusBadRequest)
		return
	}
	if order.TableNumber == 0 {
		http.Error(w, "número da mesa é obrigatório!", http.StatusBadRequest)
		return
	}
	if len(strconv.Itoa(int(order.Id))) == 0 {
		http.Error(w, "o id do pedido é obrigatório!", http.StatusBadRequest)
		return
	}

	err = s.db.UpdateOrder(order)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
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

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var mod models.ModelByID

	err = json.Unmarshal(body, &mod)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = s.db.DeleteOrder(mod.Id)
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

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var mod models.ModelByID

	err = json.Unmarshal(body, &mod)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	order, err := s.db.OrderById(mod.Id)
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

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var mod models.ModelByID

	err = json.Unmarshal(body, &mod)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if mod.Id == 0 {
		http.Error(w, "idEmpresa é obrigatório", http.StatusBadRequest)
		return
	}

	desks, err := s.db.GetUsedDesks(int(mod.Id))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string][]*models.Desk{"data": desks}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
