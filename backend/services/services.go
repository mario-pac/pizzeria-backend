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
	usr, _ := s.db.EmployeeById(1)

	if usr == nil {
		err := s.CreateDefaultUser()
		if err != nil {
			log.Fatalf("Erro ao criar o user default(admin): %v", err)
			return
		}
	}

	router := mux.NewRouter()
	//root
	router.HandleFunc("/", (s.RouteDefault)).Methods("GET") //ok
	//companies
	router.HandleFunc("/listCompanies", s.HandleListCompanies).Methods("GET") //ok
	//login & logout
	router.HandleFunc("/login", s.HandleLogin).Methods("POST")     //ok
	router.HandleFunc("/logout", s.HandleLogout).Methods("DELETE") //ok
	//authenticator
	router.HandleFunc("/isTokenValid", s.IsTokenValid).Methods("GET") //ok
	//employees
	router.HandleFunc("/listEmployees", s.HandleListEmployees).Methods("GET") //ok
	router.HandleFunc("/addEmployee", s.HandleAddEmployee).Methods("POST")
	router.HandleFunc("/updateEmployee", s.HandleUpdateEmployee).Methods("PUT")
	router.HandleFunc("/removeEmployee", s.HandleRemoveEmployee).Methods("DELETE")
	router.HandleFunc("/employeeById", s.HandleEmployeeByID).Methods("GET") //ok
	//products
	router.HandleFunc("/listProducts", s.HandleListProducts).Methods("GET") //ok
	router.HandleFunc("/addProduct", s.HandleAddProduct).Methods("POST")
	router.HandleFunc("/updateProduct", s.HandleUpdateProduct).Methods("PUT")
	router.HandleFunc("/removeProduct", s.HandleRemoveProduct).Methods("DELETE")
	router.HandleFunc("/productById", s.HandleProductByID).Methods("GET") //ok
	//orders
	router.HandleFunc("/listOrders", s.HandleListOrders).Methods("GET") //ok
	router.HandleFunc("/addOrder", s.HandleAddOrder).Methods("POST")
	router.HandleFunc("/updateOrder", s.HandleUpdateOrder).Methods("PUT")
	router.HandleFunc("/removeOrder", s.HandleRemoveOrder).Methods("DELETE")
	router.HandleFunc("/orderById", s.HandleOrderByID).Methods("GET") //ok
	//order items
	router.HandleFunc("/addOrderItem", s.HandleAddOrderItem).Methods("POST")
	router.HandleFunc("/updateOrderItem", s.HandleUpdateOrderItem).Methods("PUT")
	router.HandleFunc("/removeOrderItem", s.HandleRemoveOrderItem).Methods("DELETE")
	router.HandleFunc("/orderItemById", s.HandleOrderItemByID).Methods("GET")
	//employee levels
	router.HandleFunc("/listEmployeeLevels", s.HandleListEmployeeLevels).Methods("GET") //ok
	//configs
	router.HandleFunc("/configById", s.HandleConfigByID).Methods("GET") //ok

	log.Fatal(http.ListenAndServe(":8080", router)) //prepara o serviço na porta e rota especificadas
}