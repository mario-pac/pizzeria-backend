package services

import (
	"encoding/json"
	"go/pizzeria-backend/models"
	"io"
	"log"
	"net/http"
	"strconv"
)

func (s *Service) HandleListProducts(w http.ResponseWriter, r *http.Request) {
	token := s.HandleConfirmToken(w, r)

	if !token {
		http.Error(w, "token inválido!", http.StatusUnauthorized)
		return
	}

	filters := &models.ProductListFilters{}

	val := r.Header.Get("description")
	log.Printf("descricao: %s", val)
	if val != "" {
		filters.Description = &val
	}
	val = r.Header.Get("category")
	log.Printf("categoria: %s", val)
	if val != "" {
		filters.Category = &val
	}
	idCompany, err := strconv.Atoi(r.Header.Get("idCompany"))
	if err != nil {
		http.Error(w, "erro ao converter dados de string para int", http.StatusBadRequest)
		return
	}
	filters.IdCompany = idCompany

	products, err := s.db.ListProducts(filters)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string][]*models.Product{"data": products}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleAddProduct(w http.ResponseWriter, r *http.Request) {
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

	var product models.Product

	err = json.Unmarshal(body, &product)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(product.Category) == 0 {
		http.Error(w, "categoria é obrigatório!", http.StatusBadRequest)
		return
	}
	if len(product.Description) == 0 {
		http.Error(w, "descrição é obrigatório!", http.StatusBadRequest)
		return
	}
	if len(strconv.Itoa(int(product.Price))) == 0 {
		http.Error(w, "preço é obrigatório!", http.StatusBadRequest)
		return
	}
	if len(strconv.Itoa(product.IdCompany)) == 0 {
		http.Error(w, "idEmpresa é obrigatório!", http.StatusBadRequest)
		return
	}

	err = s.db.InsertProduct(product)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string]string{"message": "Produto adicionado com sucesso!"}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleUpdateProduct(w http.ResponseWriter, r *http.Request) {
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

	var product models.Product

	err = json.Unmarshal(body, &product)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(product.Category) == 0 {
		http.Error(w, "categoria é obrigatório!", http.StatusBadRequest)
		return
	}
	if len(product.Description) == 0 {
		http.Error(w, "descrição é obrigatório!", http.StatusBadRequest)
		return
	}
	if len(strconv.Itoa(int(product.Price))) == 0 {
		http.Error(w, "preço é obrigatório!", http.StatusBadRequest)
		return
	}
	if len(strconv.Itoa(int(product.ID))) == 0 {
		http.Error(w, "o id do usuário é obrigatório!", http.StatusBadRequest)
		return
	}

	err = s.db.UpdateProduct(product)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string]string{"message": "Produto atualizado com sucesso!"}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleRemoveProduct(w http.ResponseWriter, r *http.Request) {
	token := s.HandleConfirmToken(w, r)
	if !token {
		http.Error(w, "token inválido!", http.StatusUnauthorized)
		return
	}

	idProduct, err := strconv.Atoi(r.Header.Get("idProduct"))
	if err != nil {
		http.Error(w, "erro ao converter dados de string para int", http.StatusBadRequest)
		return
	}

	err = s.db.DeleteProduct(int64(idProduct))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string]string{"message": "Produto removido com sucesso!"}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleProductByID(w http.ResponseWriter, r *http.Request) {
	token := s.HandleConfirmToken(w, r)
	if !token {
		http.Error(w, "token inválido!", http.StatusUnauthorized)
		return
	}

	idProduct, err := strconv.Atoi(r.Header.Get("idProduct"))
	if err != nil {
		http.Error(w, "erro ao converter dados de string para int", http.StatusBadRequest)
		return
	}

	product, err := s.db.ProductById(int64(idProduct))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string]*models.Product{"data": product}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
