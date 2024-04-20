package database

import (
	"database/sql"
	"errors"
	"go/pizzeria-backend/models"
)

func (d *DAO) GetConfigs() (*models.Config, error) {
	id := 1

	var configs *models.Config

	q := "select * from settings where id = $1"
	err := d.db.Get(&configs, q, id)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	return configs, nil
}
