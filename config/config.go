package config

import (
	"fmt"
	"os"
	"strings"

	"github.com/jmoiron/sqlx"
	"github.com/jmoiron/sqlx/reflectx"
	"github.com/joho/godotenv"
	"github.com/pkg/errors"
)

// DBConfig - contém os parâmetros para conexão do banco de dados
type DBConfig struct {
	DbUser string
	DbPass string
	DbHost string
	DbPort string
	DbSid  string
}

// Config - struct para guardar configurações do aplicativo
type Config struct {
	DBConfig *DBConfig
}

func New() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		return nil, errors.Wrap(err, "não pode carregar as variáveis de conexão")
	}

	return &Config{
		DBConfig: &DBConfig{
			DbUser: os.Getenv("DB_USER"),
			DbPass: os.Getenv("DB_PASS"),
			DbHost: os.Getenv("DB_HOST"),
			DbPort: os.Getenv("DB_PORT"),
			DbSid:  os.Getenv("DB_SID"),
		},
	}, nil
}

func (d *DBConfig) ConnectDB() (*sqlx.DB, error) {
	db, err := sqlx.Open("postgres", fmt.Sprintf("user=%s password=%s host=%s port=%s dbname=%s sslmode=disable", d.DbUser, d.DbPass, d.DbHost, d.DbPort, d.DbSid))
	if err != nil {
		return nil, errors.Wrap(err, "erro ao abrir conexão")
	}

	err = db.Ping()
	if err != nil {
		return nil, errors.Wrap(err, "erro ao pingar no banco")

	}

	db.Mapper = reflectx.NewMapperTagFunc("db",
		nil,
		func(s string) string {
			return strings.ToUpper(s)
		})

	sqlx.BindDriver("postgres", sqlx.NAMED)

	return db, nil
}
