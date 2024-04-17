package database

import (
	"database/sql"
	"errors"
	"fmt"
	"go/pizzeria-backend/models"
)

func (d *DAO) Login(username string, password string) error {
	var employee models.Employee
	q := "select id, name, username, password, level_id, created_at, updated_at from employees where username = $1 and password = $2"
	err := d.db.Get(&employee, d.db.Rebind(q), username, password)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {

		return err
	}

	if errors.Is(err, sql.ErrNoRows) {
		return fmt.Errorf("usuário ou senha inválidos")
	}

	return nil
}
