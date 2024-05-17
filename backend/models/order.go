package models

import "time"

type Order struct {
	Id            int64      `json:"id" db:"id"`
	EmployeeId    int64      `json:"employeeId" db:"employee_id"`
	TableNumber   int        `json:"tableNumber" db:"table_number"`
	CustomerName  string     `json:"customerName" db:"customer_name"`
	TotalValue    float64    `json:"totalValue" db:"total_value"`
	PaymentMethod string     `json:"paymentMethod" db:"payment_method"`
	IdStatus      int64      `json:"idStatus" db:"id_status"`
	Note          string     `json:"note" db:"note"`
	CreatedAt     *time.Time `json:"createdAt" db:"created_at"`
	UpdatedAt     *time.Time `json:"updatedAt" db:"updated_at"`
	IdCompany     int        `json:"idCompany" db:"id_company"`
}

type OrderResponse struct {
	Self        Order                `json:"self"`
	OrderItems  []*OrderItemResponse `json:"orderItems"`
	OrderStatus Status               `json:"status"`
}

type OrdersListFilters struct {
	EmployeeId     *int64     `json:"employeeId" db:"employee_id"`
	CustomerName   *string    `json:"customerName" db:"customer_name"`
	IdStatus       *int64     `json:"idStatus" db:"id_status"`
	CreatedAtInit  *time.Time `json:"createdAtInit" db:"created_at"`
	CreatedAtFinal *time.Time `json:"createdAtFinal" db:"created_at"`
	IdCompany      int        `json:"idCompany" db:"id_company"`
}
