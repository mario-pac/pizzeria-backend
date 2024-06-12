package services

import (
	"encoding/json"
	"go/pizzeria-backend/models"
	"net/http"
)

func (s *Service) HandleListStatus(w http.ResponseWriter, r *http.Request) {
	token := s.HandleConfirmToken(w, r)

	if !token {
		http.Error(w, "token inválido!", http.StatusUnauthorized)
		return
	}

	status, err := s.db.ListStatus()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string][]*models.Status{"data": status}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}