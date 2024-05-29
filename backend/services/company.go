package services

import (
	"encoding/json"
	"go/pizzeria-backend/models"
	"net/http"
	"strconv"
)

func (s *Service) HandleListCompanies(w http.ResponseWriter, r *http.Request) {

	companies, err := s.db.ListCompanies()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string][]*models.Company{"data": companies}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleCompanyById(w http.ResponseWriter, r *http.Request) {
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

	company, err := s.db.CompanyById(int64(idCompany))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string]*models.Company{"data": company}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
