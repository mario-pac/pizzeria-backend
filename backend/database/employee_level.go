package database

import (
	"database/sql"
	"errors"
	"go/pizzeria-backend/models"
)

func (d *DAO) GetEmployeeLevels(idCompany int) ([]*models.EmployeeLevel, error) {
	var levels []*models.EmployeeLevel

	q := "select * from employees_levels where id_company = $1"
	err := d.db.Select(&levels, q, idCompany)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	return levels, nil
}

func (d *DAO) EmployeeLevelById(id int64) (*models.EmployeeLevel, error) {
	var level models.EmployeeLevel

	q := "select * from employees_levels where id = $1"
	err := d.db.Get(&level, q, id)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	return &level, nil
}
