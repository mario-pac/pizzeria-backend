package database

import (
	"database/sql"
	"errors"
	"go/pizzeria-backend/models"
)

func (d *DAO) ConfigById(id int64) (*models.Config, error) {
	var configs *models.Config

	q := "select * from settings where id = $1"
	err := d.db.Get(&configs, q, id)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	return configs, nil
}
