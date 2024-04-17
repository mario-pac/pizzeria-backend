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
	router := mux.NewRouter()
	router.HandleFunc("/", (s.RouteDefault)).Methods("GET")
	router.HandleFunc("/login", s.HandleLogin).Methods("GET")
	// router.HandleFunc("/cnpj/{cnpj}", s.authAPI(s.ConsultaCNPJHandler)).Methods("GET")                              //passa a variável {cnpj}
	// router.HandleFunc("/me", s.authAPI(s.MeHandler)).Methods("GET")                                                 //define a rota '/me'
	// router.HandleFunc("/me/requests/from={startDate}&until={endDate}", s.authAPI(s.RequestsHandler)).Methods("GET") //define a rota para o histórico de requests

	log.Fatal(http.ListenAndServe(":8080", router)) //prepara o serviço na porta e rota especificadas
}
