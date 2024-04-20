package database

import (
	"database/sql"
	"errors"
	"go/pizzeria-backend/models"
)

func (d *DAO) StatusById(id int64) (*models.Status, error) {
	var status *models.Status

	q := "select * from status where id = $1"

	err := d.db.Get(status, q, id)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	return status, nil
}
