package main

import (
	"log"

	"go/pizzeria-backend/config"
	"go/pizzeria-backend/database"
	"go/pizzeria-backend/services"

	_ "github.com/dgrijalva/jwt-go"
	_ "github.com/lib/pq"
)

func main() {
	//Recebe as variáveis de inicialização

	cfg, err := config.New()
	if err != nil {
		log.Fatalf("não pode iniciar o servidor: %v", err)
	}

	//Recebe a conexão com o banco, por meio do DAO
	dao, err := database.New(cfg.DBConfig)
	if err != nil {
		log.Fatalf("não pode criar DAO: %v", err)
	}

	defer dao.Close()

	log.Println("Successful connection with database!")
	log.Println("API App Pizzaria v0.1")

	service := services.New(cfg, dao)
	service.Listen()
}
