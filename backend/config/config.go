package config

import (
	"fmt"

	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"
	"github.com/spf13/viper"
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

	viper.SetConfigName("api.env") // Nome do arquivo de configuração (sem extensão)
	viper.SetConfigType("env") // Tipo de arquivo de configuração (JSON neste caso)
	viper.AddConfigPath("./")   // Caminho para o diretório onde o arquivo de configuração está localizado

	err := viper.ReadInConfig() // Lê o arquivo de configuração (por exemplo, config.yml)

	if err != nil {
		panic(fmt.Errorf("erro ao ler o arquivo de configuração: %s", err))
	}

	viper.AutomaticEnv()

	return &Config{
		DBConfig: &DBConfig{
			DbUser: viper.GetString("DB_USER"),
			DbPass: viper.GetString("DB_PASSWORD"),
			DbHost: viper.GetString("DB_HOST"),
			DbPort: viper.GetString("DB_PORT"),
			DbSid:  viper.GetString("DB_NAME"),
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

	return db, nil
}
