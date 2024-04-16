package main

import (
	"log"

	_ "github.com/dgrijalva/jwt-go"
	_ "github.com/godror/godror"
	"github.com/mario-pac/apiCNPJa/config"
	"github.com/mario-pac/apiCNPJa/database"
	"github.com/mario-pac/apiCNPJa/services"
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
	log.Println("Web-service Alpha-CNPJ-Treinamento - v1.1")

	service := services.New(cfg, dao)
	service.Listen()
}
