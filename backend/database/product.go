package database

import (
	"database/sql"
	"errors"
	"log"
	"strconv"
	"time"

	"go/pizzeria-backend/models"
)

func (d *DAO) ListProducts(filters *models.ProductListFilters) ([]*models.Product, error) {
	var products []*models.Product

	q := "select * from products"
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

	if filters.Description != nil && *filters.Description != "" {
		log.Println(*filters.Description)
		addW("description like '%" + *filters.Description + "%'")
	}

	if filters.Category != nil && *filters.Category != "" {
		log.Println(*filters.Category)

		addW("category like '%" + *filters.Category + "%'")
	}

	addW("id_company = " + strconv.FormatInt(int64(filters.IdCompany), 10))

	err := d.db.Select(&products, q)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	return products, nil
}

func (d *DAO) InsertProduct(data models.Product) error {
	var id int64

	qInit := "SELECT setval('products_id_seq', (SELECT MAX(id) FROM products) + 1);"
	err := d.db.Get(&id, qInit)
	if err != nil {
		return err
	}

	q := "insert into products (description, price, category, created_at, id_company) values ($1, $2, $3, $4, $5)"
	_, err = d.db.Exec(q, data.Description, data.Price, data.Category, time.Now(), data.IdCompany)
	if err != nil {
		return err
	}
	return nil
}

func (d *DAO) UpdateProduct(data models.Product) error {
	q := "update products set description = $1, price = $2, category = $3, updated_at = $4 where id = $5"
	_, err := d.db.Exec(q, data.Description, data.Price, data.Category, data.UpdatedAt, data.ID)
	if err != nil {
		return err
	}
	return nil
}

func (d *DAO) DeleteProduct(id int64) error {
	q := "delete from products where id = $1"
	_, err := d.db.Exec(q, id)
	if err != nil {
		return err
	}
	return nil
}

func (d *DAO) ProductById(id int64) (*models.Product, error) {
	var product models.Product
	q := `select
	 		id, id_company, description, price, category, created_at, updated_at from products
		where id = $1`
	err := d.db.Get(&product, q, id)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	return &product, nil
}
