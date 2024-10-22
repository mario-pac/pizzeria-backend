package database

import (
	"database/sql"
	"errors"
	"fmt"
	"go/pizzeria-backend/models"
	"go/pizzeria-backend/utils"
)

func (d *DAO) Login(username string, password string) (*models.Employee, error) {
	var employee models.Employee
	q := "select * from employees where username = $1 and password = $2"
	err := d.db.Get(&employee, q, username, utils.HashPassword(password))
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	if errors.Is(err, sql.ErrNoRows) {
		return nil, fmt.Errorf("usuário ou senha inválidos")
	}

	return &employee, nil
}

func (d *DAO) UserByUsername(username string) (bool, error){
	var usr string

	q := "select username from employees where username = $1"
	r := d.db.QueryRowx(q, username)

	err := r.Scan(&usr)

	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return false, err
	}

	if len(usr) > 0 {
		return true, nil
	}

	return false, nil
}