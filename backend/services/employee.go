package services

import (
	"encoding/json"
	"go/pizzeria-backend/models"
	"go/pizzeria-backend/utils"
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

	filters := models.EmployeeListFilters{}

	val := r.Header.Get("name")
	filters.Name = &val

	val = r.Header.Get("idCompany")
	filters.IdCompany = utils.ConvertStringToInt(val)

	val = r.Header.Get("levelId")
	if val != "" {
		aux := int64(utils.ConvertStringToInt(val))
		filters.LevelId = &aux
	}

	employees, err := s.db.ListEmployees(filters)
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

	idEmployee, err := strconv.Atoi(r.Header.Get("idEmployee"))
	if err != nil {
		http.Error(w, "erro ao converter dados de string para int", http.StatusBadRequest)
		return
	}

	err = s.db.DeleteEmployee(int64(idEmployee))
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

	idEmployee, err := strconv.Atoi(r.Header.Get("idEmployee"))
	if err != nil {
		http.Error(w, "erro ao converter dados de string para int", http.StatusBadRequest)
		return
	}

	employee, err := s.db.EmployeeById(int64(idEmployee))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := map[string]*models.EmployeeResponse{"data": employee}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
