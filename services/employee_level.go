package services

import (
	"encoding/json"
	"go/pizzeria-backend/models"
	"io"
	"net/http"
)

func (s *Service) HandleListEmployeeLevels(w http.ResponseWriter, r *http.Request) {
	token := s.HandleConfirmToken(w, r)

	if !token {
		http.Error(w, "token inválido!", http.StatusUnauthorized)
		return
	}

	levels, err := s.db.GetEmployeeLevels()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string][]*models.EmployeeLevel{"data": levels}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleEmployeeLevelByID(w http.ResponseWriter, r *http.Request) {
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

	employeeLevel, err := s.db.EmployeeLevelById(mod.Id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string]*models.EmployeeLevel{"data": employeeLevel}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
