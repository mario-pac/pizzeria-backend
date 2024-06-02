package services

import (
	"encoding/json"
	"go/pizzeria-backend/models"
	"net/http"
	"strconv"
)

func (s *Service) HandleConfigByID(w http.ResponseWriter, r *http.Request) {
	token := s.HandleConfirmToken(w, r)
	if !token {
		http.Error(w, "token inválido!", http.StatusUnauthorized)
		return
	}

	idConfig, err := strconv.Atoi(r.Header.Get("idConfig"))
	if err != nil {
		http.Error(w, "erro ao converter dados de string para int", http.StatusBadRequest)
		return
	}

	cfg, err := s.db.ConfigById(int64(idConfig))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string]*models.Config{"data": cfg}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleListUsedDesks(w http.ResponseWriter, r *http.Request){
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

	usedTables, err := s.db.ListUsedTables(int64(idCompany))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string][]int64{"data": usedTables}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}