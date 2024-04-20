package services

import (
	"log"
	"net/http"

	"go/pizzeria-backend/config"
	"go/pizzeria-backend/database"

	"github.com/gorilla/mux"
)

// Struct que aponta para os serviços
type Service struct {
	cfg *config.Config
	db  *database.DAO
}

// Função que cria uma instância do serviço
func New(cfg *config.Config, dao *database.DAO) *Service {
	return &Service{cfg: cfg, db: dao}
}

// Função que define a rota padrão da api, devolvendo status 200 - OK
func (s *Service) RouteDefault(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "OK"}`))
}

// Função que monta o serviço da api com as rotas
func (s *Service) Listen() {
	usr, err := s.db.EmployeeById(1)
	if err != nil {
		log.Fatal(err)
		return
	}

	if usr == nil {
		err = s.CreateDefaultUser()
		if err != nil {
			log.Fatalf("Erro ao criar o user default(admin): %v", err)
			return
		}
	}

	router := mux.NewRouter()
	router.HandleFunc("/", (s.RouteDefault)).Methods("GET")
	router.HandleFunc("/login", s.HandleLogin).Methods("GET")
	router.HandleFunc("/isTokenValid", s.IsTokenValid).Methods("GET")
	router.HandleFunc("/logout", s.HandleLogout).Methods("GET")
	router.HandleFunc("/listEmployees", s.HandleListEmployees).Methods("GET")
	router.HandleFunc("/addEmployee", s.HandleAddEmployee).Methods("POST")

	log.Fatal(http.ListenAndServe(":8080", router)) //prepara o serviço na porta e rota especificadas
}
