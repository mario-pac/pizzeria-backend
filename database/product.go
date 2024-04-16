package database

import (
	"database/sql"
	"errors"

	"github.com/mario-pac/apiCNPJa/models"
)

func (d *DAO) ListProducts(filters models.ProductListFilters) ([]*models.Product, error) {
	var products []*models.Product

	q := "select * from products"
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

	if filters.Description != nil && *filters.Description != "" {
		addW("description like '%" + *filters.Description + "%'")
	}

	if filters.Category != nil && *filters.Category != "" {
		addW("category like '%" + *filters.Category + "%'")
	}

	err := d.db.Select(&products, q, pars)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	return products, nil
}

func (d *DAO) InsertProduct(data models.Product) error {
	q := "insert into products (description, price, category, created_at) values (?, ?, ?, ?)"
	_, err := d.db.Exec(q, data)
	if err != nil {
		return err
	}
	return nil
}

func (d *DAO) UpdateProduct(data models.Product) error {
	q := "update products set description = ?, price = ?, category = ? where id = ?"
	_, err := d.db.Exec(q, data)
	if err != nil {
		return err
	}
	return nil
}

func (d *DAO) DeleteProduct(id int64) error {
	q := "delete from products where id =?"
	_, err := d.db.Exec(q, id)
	if err != nil {
		return err
	}
	return nil
}

func (d *DAO) ProductById(id int64) (*models.Product, error) {
	var product *models.Product
	q := "select * from products where id = ?"
	err := d.db.Get(&product, d.db.Rebind(q), id)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	return product, nil
}
