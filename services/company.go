package services

import (
	"encoding/json"
	"go/pizzeria-backend/models"
	"net/http"
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
