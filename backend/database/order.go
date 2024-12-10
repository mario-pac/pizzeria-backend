package database

import (
	"database/sql"
	"errors"
	"fmt"
	"strconv"
	"time"

	"go/pizzeria-backend/models"

	"github.com/jmoiron/sqlx"
)

func (d *DAO) ListOrders(filters models.OrdersListFilters) ([]*models.OrderResponse, error) {
	q := "select * from orders"
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
		addW("id_status = " + strconv.FormatInt(*filters.IdStatus, 10))
	} else {
		addW("id_status <> 6")
	}

	if filters.CreatedAtInit != nil {
		addW("created_at >= " + filters.CreatedAtInit.String())
	}

	if filters.CreatedAtFinal != nil {
		addW("created_at <= " + filters.CreatedAtFinal.String())
	}

	addW("id_company = " + strconv.FormatInt(int64(filters.IdCompany), 10))

	q += "\norder by id desc"

	var orders []*models.Order

	err := d.db.Select(&orders, q)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	var ordersResponse []*models.OrderResponse

	for _, or := range orders {
		resp := &models.OrderResponse{}

		emp, err := d.EmployeeById(or.EmployeeId)
		if err != nil {
			return nil, err
		}

		resp.EmployeeName = emp.Self.CompleteName
		resp.OrderItems, err = d.OrderItemsByIdOrder(or.Id)
		if err != nil {
			return nil, err
		}

		resp.OrderStatus, err = d.StatusById(or.IdStatus)
		if err != nil {
			return nil, err
		}

		resp.Self = *or
		ordersResponse = append(ordersResponse, resp)
	}

	return ordersResponse, nil
}

func (d *DAO) InsertOrder(tx *sqlx.Tx, data models.Order) (int64, error) {
	q := "insert into orders (employee_id, table_number, customer_name, total_value, payment_method, id_status, note, created_at, id_company) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id"

	r := tx.QueryRow(q, data.EmployeeId, data.TableNumber, data.CustomerName, data.TotalValue, data.PaymentMethod, data.IdStatus, data.Note, time.Now(), data.IdCompany).Scan(&data.Id)

	if r != nil && !errors.Is(r, sql.ErrNoRows) {
		return 0, fmt.Errorf("erro ao inserir order: %v", r.Error())
	}

	return data.Id, nil
}

func (d *DAO) UpdateOrder(tx *sqlx.Tx, data models.Order) error {
	q := "update orders set employee_id = $1, table_number = $2, customer_name = $3, total_value = $4, payment_method = $5, id_status = $6, note = $7, updated_at = $8 where id = $9"
	_, err := tx.Exec(q, data.EmployeeId, data.TableNumber, data.CustomerName, data.TotalValue, data.PaymentMethod, data.IdStatus, data.Note, time.Now(), data.Id)
	if err != nil {
		return err
	}

	return nil
}

func (d *DAO) DeleteOrder(tx *sqlx.Tx, id int64) error {
	q := "delete from orders where id = $1"
	_, err := tx.Exec(q, id)
	if err != nil {
		return err
	}

	return nil
}

func (d *DAO) OrderById(id int64) (*models.OrderResponse, error) {
	var order models.Order
	var orderItems []*models.OrderItemResponse

	var response models.OrderResponse

	q := "select * from orders where id = $1"
	err := d.db.Get(&order, q, id)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	if err != nil && errors.Is(err, sql.ErrNoRows) {
		return nil, fmt.Errorf("pedido não encontrado")
	}

	orderItems, err = d.OrderItemsByIdOrder(order.Id)
	if err != nil {
		return nil, err
	}

	status, err := d.StatusById(order.IdStatus)
	if err != nil {
		return nil, err
	}

	employee, err := d.EmployeeById(order.EmployeeId)
	if err != nil {
		return nil, err
	}

	response.OrderStatus = status
	response.OrderItems = orderItems
	response.Self = order
	response.EmployeeName = employee.Self.CompleteName

	return &response, nil
}

func (d *DAO) GetUsedDesks(idCompany int) ([]*models.Desk, error) {
	var usedDesks []*models.Desk

	q := "select table_number from orders where id_status <> 6 and id_company == $1"

	err := d.db.Select(&usedDesks, q, idCompany)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return nil, err
	}

	return usedDesks, nil
}
