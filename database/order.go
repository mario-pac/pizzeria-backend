package database

import (
	"database/sql"
	"errors"
	"strconv"
	"time"

	"go/pizzeria-backend/models"
)

func (d *DAO) ListOrders(filters *models.OrdersListFilters) ([]*models.Employee, error) {
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

	if filters.CustomerName != nil && *filters.CustomerName != "" {
		addW("customer_name like '%" + *filters.CustomerName + "%'")
	}

	if filters.EmployeeId != nil {
		addW("employee_id = " + strconv.FormatInt(*filters.EmployeeId, 10))
	}

	if filters.IdStatus != nil {
		addW("id_status = " + strconv.FormatInt(*filters.EmployeeId, 10))
	}

	if filters.CreatedAtInit != nil {
		addW("created_at >= " + filters.CreatedAtInit.String())
	}

	if filters.CreatedAtFinal != nil {
		addW("created_at <= " + filters.CreatedAtFinal.String())
	}

	var employees []*models.Employee

	err := d.db.Select(&employees, q)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	return employees, nil
}

func (d *DAO) InsertOrder(data models.Order) error {
	q := "insert into orders (employee_id, table_number, customer_name, total_value, payment_method, status, note, created_at) values ($1, $2, $3, $4, $5, $6, $7, $8)"
	_, err := d.db.Exec(q, data.EmployeeId, data.TableNumber, data.CustomerName, data.TotalValue, data.PaymentMethod, data.IdStatus, data.Note, time.Now())
	if err != nil {
		return err
	}

	return nil
}

func (d *DAO) UpdateOrder(data models.Order) error {
	q := "update employees set employee_id = $1, table_number = $2, customer_name = $3, total_value = $4, payment_method = $5, status = $6, note = $7, updated_at = $8 where id = $9"
	_, err := d.db.Exec(q, data.EmployeeId, data.TableNumber, data.CustomerName, data.TotalValue, data.PaymentMethod, data.IdStatus, data.Note, time.Now(), data.ID)
	if err != nil {
		return err
	}

	return nil
}

func (d *DAO) DeleteOrder(id int64) error {
	q := "delete from orders where id = $1"
	_, err := d.db.Exec(q, id)
	if err != nil {
		return err
	}

	return nil
}

func (d *DAO) OrderById(id int64) (*models.OrderResponse, error) {
	var order models.Order
	var orderItems []*models.OrderItemResponse
	var status models.Status

	var response models.OrderResponse

	q := "select * from orders where id = $1"
	err := d.db.Get(&order, q, id)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	orderItems, err = d.OrderItemsByIdOrder(order.ID)
	if err != nil {
		return nil, err
	}

	q = "select * from status where id = $1"
	err = d.db.Get(&status, q, order.ID)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	response.OrderStatus = status
	response.OrderItems = orderItems
	response.Self = order

	return &response, nil
}
