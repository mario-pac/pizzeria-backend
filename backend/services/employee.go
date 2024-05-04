package services

import (
	"encoding/json"
	"fmt"
	"go/pizzeria-backend/models"
	"io"
	"net/http"
	"strconv"
)

func (s *Service) HandleListEmployees(w http.ResponseWriter, r *http.Request) {
	token := s.HandleConfirmToken(w, r)

	if !token {
		http.Error(w, "token inválido!", http.StatusUnauthorized)
		return
	}

	filters := &models.EmployeeListFilters{}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Println(body)

	err = json.Unmarshal(body, &filters)
	if err != nil {
		fmt.Printf("erro em unmarshall %s", err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if filters == nil {
		http.Error(w, "é necessário informar o idEmpresa", http.StatusBadRequest)
		return
	}

	employees, err := s.db.ListEmployees(*filters)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string][]*models.Employee{"data": employees}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleAddEmployee(w http.ResponseWriter, r *http.Request) {
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

	var employee models.Employee

	err = json.Unmarshal(body, &employee)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(employee.CompleteName) == 0 {
		http.Error(w, "nome é obrigatório!", http.StatusBadRequest)
		return
	}
	if len(employee.Username) == 0 {
		http.Error(w, "usuário é obrigatório!", http.StatusBadRequest)
		return
	}
	if len(employee.Password) == 0 {
		http.Error(w, "senha é obrigatório!", http.StatusBadRequest)
		return
	}
	if len(strconv.Itoa(int(employee.Level_Id))) == 0 {
		http.Error(w, "tipo funcionário é obrigatório!", http.StatusBadRequest)
		return
	}

	if len(strconv.Itoa(int(employee.IdCompany))) == 0 {
		http.Error(w, "idEmpresa é obrigatório!", http.StatusBadRequest)
		return
	}

	err = s.db.InsertEmployee(employee)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string]string{"message": "Funcionário adicionado com sucesso!"}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleUpdateEmployee(w http.ResponseWriter, r *http.Request) {
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

	var employee models.Employee

	err = json.Unmarshal(body, &employee)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(employee.CompleteName) == 0 {
		http.Error(w, "nome é obrigatório!", http.StatusBadRequest)
		return
	}
	if len(employee.Username) == 0 {
		http.Error(w, "usuário é obrigatório!", http.StatusBadRequest)
		return
	}
	if len(employee.Password) == 0 {
		http.Error(w, "senha é obrigatório!", http.StatusBadRequest)
		return
	}
	if len(strconv.Itoa(int(employee.Level_Id))) == 0 {
		http.Error(w, "tipo funcionário é obrigatório!", http.StatusBadRequest)
		return
	}
	if len(strconv.Itoa(int(employee.Id))) == 0 {
		http.Error(w, "o id do usuário é obrigatório!", http.StatusBadRequest)
		return
	}

	err = s.db.UpdateEmployee(employee)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string]string{"message": "Funcionário atualizado com sucesso!"}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleRemoveEmployee(w http.ResponseWriter, r *http.Request) {
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

	err = s.db.DeleteEmployee(mod.Id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string]string{"message": "Funcionário removido com sucesso!"}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleEmployeeByID(w http.ResponseWriter, r *http.Request) {
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

	employee, err := s.db.EmployeeById(mod.Id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string]*models.EmployeeResponse{"data": employee}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
