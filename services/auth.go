package services

import (
	"encoding/json"
	"io"
	"net/http"

	"go/pizzeria-backend/auth"
	"go/pizzeria-backend/models"
)

func (s *Service) CreateDefaultUser() error {
	employee := models.Employee{
		CompleteName: "Administrador",
		Username:     "admin",
		Password:     "123Mudar",
		Level_Id:     3,
		IdCompany:    1,
	}

	err := s.db.InsertEmployee(employee)
	if err != nil {
		return err
	}

	return nil
}

func (s *Service) HandleLogin(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	login := models.Login{}

	err = json.Unmarshal(body, &login)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = s.db.Login(login.Username, login.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	token, err := auth.CreateToken(login.Username)
	if err != nil {
		http.Error(w, "Erro ao criar token JWT", http.StatusInternalServerError)
		return
	}

	response := map[string]string{"token": token}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleLogout(w http.ResponseWriter, r *http.Request) {
	auth.ClearToken(w, r)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "deslogado com sucesso!"}`))
}

func (s *Service) HandleConfirmToken(w http.ResponseWriter, r *http.Request) bool {
	// Obter o token JWT do cabeçalho de autorização
	tokenString := r.Header.Get("Authorization")
	if tokenString == "" {
		http.Error(w, "Token JWT ausente no cabeçalho de autorização", http.StatusUnauthorized)
		return false
	}

	// Verificar e decodificar o token JWT
	_, err := auth.VerifyToken(tokenString)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return false
	}

	return true
}

func (s *Service) IsTokenValid(w http.ResponseWriter, r *http.Request) {
	// Obter o token JWT do cabeçalho de autorização
	tokenString := r.Header.Get("Authorization")
	if tokenString == "" {
		http.Error(w, "Token JWT ausente no cabeçalho de autorização", http.StatusUnauthorized)
		return
	}

	// Verificar e decodificar o token JWT
	_, err := auth.VerifyToken(tokenString)
	if err != nil {
		http.Error(w, "erro: token inválido!", http.StatusUnauthorized)
		return
	}

	response := map[string]string{"message": "Token válido!"}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
