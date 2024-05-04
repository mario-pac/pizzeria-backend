package database

import (
	"database/sql"
	"errors"
	"time"

	"go/pizzeria-backend/models"
)

func (d *DAO) OrderItemsByIdOrder(id int64) ([]*models.OrderItemResponse, error) {
	q := "select * from order_items where order_id = $1"

	var orderItems []*models.OrderItem

	var response []*models.OrderItemResponse

	err := d.db.Select(&orderItems, q, id)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	for _, ordIt := range orderItems {
		var status models.Status

		q = "select * from status where id = $1"
		err = d.db.Get(&status, q, ordIt.IdOrderStatus)
		if err != nil && !errors.Is(err, sql.ErrNoRows) {
			return nil, err
		}

		i := models.OrderItemResponse{
			Self:            *ordIt,
			OrderItemStatus: &status,
		}

		response = append(response, &i)
	}

	return response, nil
}

func (d *DAO) InsertOrderItem(data models.OrderItem) error {
	q := "insert into order_items (order_id, product_id, quantity, id_order_status, created_at) values ($1, $2, $3, $4, $5)"
	_, err := d.db.Exec(q, data.OrderID, data.ProductID, data.Quantity, data.IdOrderStatus, time.Now())
	if err != nil {
		return err
	}

	return nil
}

func (d *DAO) UpdateOrderItem(data models.OrderItem) error {
	q := "update employees set order_id = $1, product_id = $2, quantity = $3, id_order_status = $4, updated_at = $5 where id = $6"
	_, err := d.db.Exec(q, data.OrderID, data.ProductID, data.Quantity, data.IdOrderStatus, time.Now(), data.Id)
	if err != nil {
		return err
	}

	return nil
}

func (d *DAO) DeleteOrderItem(id int64) error {
	q := "delete from orders where id = $1"
	_, err := d.db.Exec(q, id)
	if err != nil {
		return err
	}

	return nil
}

func (d *DAO) OrderItemById(id int64) (*models.OrderItemResponse, error) {
	var status models.Status

	var response models.OrderItemResponse

	q := "select * from order_items where id = $1"
	err := d.db.Get(&response, q, id)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	q = "select * from status where id = $1"
	err = d.db.Get(&status, q, response.Self.IdOrderStatus)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	response.OrderItemStatus = &status

	return &response, nil
}
