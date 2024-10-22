package database

import (
	"database/sql"
	"errors"
	"fmt"
	"strconv"
	"time"

	"go/pizzeria-backend/models"
	"go/pizzeria-backend/utils"
)

func (d *DAO) ListEmployees(filters models.EmployeeListFilters) ([]*models.Employee, error) {
	q := "select * from employees"
	var hasW = false

	addW := func(expr string) {
		if hasW {
			q += "\n and "
		} else {
			q += "\nwhere "
			hasW = true
		}
		q += expr
	}

	if filters.Name != nil && *filters.Name != "" {
		addW("name like '%" + *filters.Name + "%'")
	}

	if filters.LevelId != nil {
		addW("level_id = " + strconv.FormatInt(*filters.LevelId, 10))
	}

	addW("id_company = " + strconv.FormatInt(int64(filters.IdCompany), 10))

	var employees []*models.Employee

	err := d.db.Select(&employees, q)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	return employees, nil
}

func (d *DAO) InsertEmployee(data models.Employee) error {
	hasUsr, err := d.UserByUsername(data.Username)
	if err != nil {
		return fmt.Errorf("erro ao buscar usuário por nome: %w", err)
	}
	if hasUsr {
		return fmt.Errorf("este usuário já está cadastrado no sistema")
	}
	q := "insert into employees (name, username, password, level_id, created_at, updated_at, id_company) values ($1, $2, $3, $4, $5, $6, $7)"
	_, err = d.db.Exec(q, data.CompleteName, data.Username, utils.HashPassword(data.Password), data.Level_Id, time.Now(), time.Now(), data.IdCompany)
	if err != nil {
		return fmt.Errorf("erro ao inserir usuário: %w", err)
	}

	return nil
}

func (d *DAO) UpdateEmployee(data models.Employee) error {
	q := "update employees set name = $1, login = $2, password = $3, level_id = $4, updated_at = $5 where id = $6"
	_, err := d.db.Exec(q, data.CompleteName, data.Username, data.Password, data.Level_Id, time.Now(), data.Id)
	if err != nil {
		return err
	}

	return nil
}

func (d *DAO) DeleteEmployee(id int64) error {
	q := "delete from employees where id = $1"
	_, err := d.db.Exec(q, id)
	if err != nil {
		return err
	}

	return nil
}

func (d *DAO) EmployeeById(id int64) (*models.EmployeeResponse, error) {
	var employee models.Employee
	var employeeLevel models.EmployeeLevel

	var response models.EmployeeResponse

	q := "select * from employees where id = $1"
	err := d.db.Get(&employee, q, id)
	if err != nil {
		return nil, err
	}

	q = "select * from employees_levels where id = $1"
	err = d.db.Get(&employeeLevel, q, employee.Level_Id)
	if err != nil {
		return nil, err
	}

	response.EmployeeLevel = &employeeLevel
	response.Self = employee

	return &response, nil
}
