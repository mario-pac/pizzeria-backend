package database

import (
	"database/sql"
	"errors"
	"strconv"

	"github.com/mario-pac/pizzeria-backend/models"
)

func (d *DAO) ListEmployees(filters *models.EmployeeListFilters) ([]*models.Employee, error) {
	q := "select * from employees"
	var hasW = false

	pars := []interface{}{}

	addW := func(expr string, p ...interface{}) {
		if hasW {
			q += "\n and "
		} else {
			q += "\nwhere "
			hasW = true
		}
		q += expr
		pars = append(pars, p...)
	}

	if filters.Name != nil && *filters.Name != "" {
		addW("name like '%" + *filters.Name + "%'")
	}

	if filters.LevelId != nil {
		addW("level_id = " + strconv.FormatInt(*filters.LevelId, 10))
	}

	var employees []*models.Employee

	err := d.db.Select(&employees, q, pars)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	return employees, nil
}

func (d *DAO) InsertEmployee(data models.Employee) error {
	q := "insert into employees (name, login, password, level_id, created_at) values (?,?,?,?,?)"
	_, err := d.db.Exec(q, data)
	if err != nil {
		return err
	}

	return nil
}

func (d *DAO) UpdateEmployee(data models.Employee) error {
	q := "update employees set name = ?, login = ?, password = ?, level_id = ? where id = ?"
	_, err := d.db.Exec(q, data)
	if err != nil {
		return err
	}

	return nil
}

func (d *DAO) DeleteEmployee(id int64) error {
	q := "delete from employees where id =?"
	_, err := d.db.Exec(q, id)
	if err != nil {
		return err
	}

	return nil
}

func (d *DAO) EmployeeById(id int64) (*models.Employee, error) {
	var employee *models.Employee
	q := "select * from employees where id = ?"
	err := d.db.Get(&employee, d.db.Rebind(q), id)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	return employee, nil
}
