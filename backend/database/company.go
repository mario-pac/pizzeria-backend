package database

import (
	"database/sql"
	"errors"
	"go/pizzeria-backend/models"
)

func (d *DAO) ListCompanies() ([]*models.Company, error) {
	var companies []*models.Company

	q := "select * from companies"
	err := d.db.Select(&companies, q)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	return companies, nil
}

func (d *DAO) CompanyById(id int64) (*models.Company, error) {
	var company models.Company

	q := "select * from companies where id = $1"
	err := d.db.Get(&company, q, id)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	return &company, nil
}
