package services

import (
	"encoding/json"
	"net/http"

	"github.com/mario-pac/apiCNPJa/auth"
)

func (s *Service) HandleLogin(w http.ResponseWriter, r *http.Request) {
	username := r.FormValue("username")
	password := r.FormValue("password")

	err := s.db.Login(username, password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	token, err := auth.CreateToken(username)
	if err != nil {
		http.Error(w, "Erro ao criar token JWT", http.StatusInternalServerError)
		return
	}

	response := map[string]string{"token": token}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (s *Service) HandleConfirmToken(w http.ResponseWriter, r *http.Request) {
	// Obter o token JWT do cabeçalho de autorização
	tokenString := r.Header.Get("Authorization")
	if tokenString == "" {
		http.Error(w, "Token JWT ausente no cabeçalho de autorização", http.StatusUnauthorized)
		return
	}

	// Verificar e decodificar o token JWT
	claims, err := auth.VerifyToken(tokenString)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	// Recurso protegido
	response := map[string]string{"message": "Este é um recurso protegido", "username": claims.Username}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
