package database

import (
	"database/sql"
	"errors"
	"fmt"
	"go/pizzeria-backend/models"
	"go/pizzeria-backend/utils"
)

func (d *DAO) Login(username string, password string) error {
	var employee models.Employee
	q := "select * from employees where username = $1 and password = $2"
	err := d.db.Get(&employee, q, username, utils.HashPassword(password))
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return err
	}

	if errors.Is(err, sql.ErrNoRows) {
		return fmt.Errorf("usuário ou senha inválidos")
	}

	return nil
}
