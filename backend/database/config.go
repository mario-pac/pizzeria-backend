package database

import (
	"database/sql"
	"errors"
	"fmt"
	"go/pizzeria-backend/models"
)

func (d *DAO) ConfigByIdCompany(idCompany int64) (*models.Config, error) {
	var configs models.Config

	q := "select * from settings where id = $1"
	err := d.db.Get(&configs, q, idCompany)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	return &configs, nil
}

func (d *DAO) ListUsedTables(idCompany int64) ([]int64, error) {
	var tables []int64

	q := "select table_number from orders where id_company = $1 and id_status = 4"

	err := d.db.Get(&tables, q, idCompany)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, fmt.Errorf("erro ao buscar mesas usadas: %w", err)
	}

	return tables, nil
}
