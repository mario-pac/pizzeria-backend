package database

import (
	"go/pizzeria-backend/config"

	"github.com/jmoiron/sqlx"
)

// DAO - struct que representa a conexão com o banco de dados postgres
type DAO struct {
	db *sqlx.DB
}

// New - retorna o DAO com a conexão com o banco de dados postgres
func New(cfg *config.DBConfig) (*DAO, error) {
	db, err := cfg.ConnectDB()

	if err != nil {
		return nil, err
	}
	dao := &DAO{db: db}
	return dao, nil
}

// Close - finaliza a conexão com o banco de dados
func (d *DAO) Close() error {
	return d.db.Close()
}

// DB - retorna a conexão com o db
func (d *DAO) DB() *sqlx.DB {
	return d.db
}
