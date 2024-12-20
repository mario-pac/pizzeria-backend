package services

import (
	"encoding/json"
	"go/pizzeria-backend/models"
	"io"
	"net/http"
	"strconv"
	"strings"
)

func (s *Service) HandleAddOrderItem(w http.ResponseWriter, r *http.Request) {
	tx, err := s.db.DB().Beginx()

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer tx.Rollback()

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

	var orderItem models.OrderItem

	err = json.Unmarshal(body, &orderItem)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if orderItem.Quantity == 0 {
		http.Error(w, "quantidade é obrigatório!", http.StatusBadRequest)
		return
	}
	if orderItem.ProductID == 0 {
		http.Error(w, "id do produto é obrigatório!", http.StatusBadRequest)
		return
	}
	if orderItem.OrderID == 0 {
		http.Error(w, "id do pedido é obrigatório!", http.StatusBadRequest)
		return
	}

	err = s.db.InsertOrderItem(tx, orderItem)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := tx.Commit(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]string{"message": "Item do pedido adicionado com sucesso!"}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleUpdateOrderItem(w http.ResponseWriter, r *http.Request) {
	tx, err := s.db.DB().Beginx()

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer tx.Rollback()

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

	var orderItem models.OrderItem

	err = json.Unmarshal(body, &orderItem)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if orderItem.Quantity == 0 {
		http.Error(w, "quantidade é obrigatório!", http.StatusBadRequest)
		return
	}
	if orderItem.ProductID == 0 {
		http.Error(w, "id do produto é obrigatório!", http.StatusBadRequest)
		return
	}
	if orderItem.OrderID == 0 {
		http.Error(w, "id do pedido é obrigatório!", http.StatusBadRequest)
		return
	}
	if len(strconv.Itoa(int(orderItem.Id))) == 0 {
		http.Error(w, "o id do item do pedido é obrigatório!", http.StatusBadRequest)
		return
	}

	err = s.db.UpdateOrderItem(tx, orderItem)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := tx.Commit(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]string{"message": "Item do pedido atualizado com sucesso!"}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleRemoveOrderItem(w http.ResponseWriter, r *http.Request) {
	tx, err := s.db.DB().Beginx()

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer tx.Rollback()

	token := s.HandleConfirmToken(w, r)
	if !token {
		http.Error(w, "token inválido!", http.StatusUnauthorized)
		return
	}

	idOrderItem, err := strconv.Atoi(r.Header.Get("idOrderItem"))
	if err != nil {
		http.Error(w, "erro ao converter dados de string para int", http.StatusBadRequest)
		return
	}

	err = s.db.DeleteOrderItem(tx, int64(idOrderItem))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := tx.Commit(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]string{"message": "Item do pedido removido com sucesso!"}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleOrderItemByID(w http.ResponseWriter, r *http.Request) {
	token := s.HandleConfirmToken(w, r)
	if !token {
		http.Error(w, "token inválido!", http.StatusUnauthorized)
		return
	}

	idOrderItem, err := strconv.Atoi(r.Header.Get("idOrderItem"))
	if err != nil {
		http.Error(w, "erro ao converter dados de string para int", http.StatusBadRequest)
		return
	}

	OrderItem, err := s.db.OrderItemById(int64(idOrderItem))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string]*models.OrderItemResponse{"data": OrderItem}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleOrderItemByIdStatus(w http.ResponseWriter, r *http.Request) {
	token := s.HandleConfirmToken(w, r)
	if !token {
		http.Error(w, "token inválido!", http.StatusUnauthorized)
		return
	}

	trimmed := strings.Trim(r.Header.Get("ids"), "[]")
	strSlice := strings.Split(trimmed, ", ")

	orderItem, err := s.db.OrderItemsByIdsStatus(strSlice)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string][]*models.OrderItemResponse{"data": orderItem}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleGetNextSequenceIdOrderItem(w http.ResponseWriter, r *http.Request) {
	token := s.HandleConfirmToken(w, r)
	if !token {
		http.Error(w, "token inválido!", http.StatusUnauthorized)
		return
	}

	newId, err := s.db.GetNextSequenceIdOrderItem()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string]int64{"data": newId}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
