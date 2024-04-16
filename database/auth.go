package database

import (
	"database/sql"
	"errors"
	"fmt"
)

func (d *DAO) Login(username string, password string) error {
	var employee interface{}
	q := "select * from employees where username = ? and password = ?"
	err := d.db.Get(&employee, d.db.Rebind(q), username, password)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return err
	}

	if errors.Is(err, sql.ErrNoRows) {
		return fmt.Errorf("usuário ou senha inválidos")
	}

	return nil
}
