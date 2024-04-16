package models

import "time"

type Order struct {
	ID            int64     `json:"id" db:"id"`
	EmployeeId    int64     `json:"employee_id" db:"employee_id"`
	TableNumber   int       `json:"table_number" db:"table_number"`
	CustomerName  string    `json:"customer_name" db:"customer_name"`
	TotalValue    float64   `json:"total_value" db:"total_value"`
	PaymentMethod string    `json:"payment_method" db:"payment_method"`
	IdStatus      string    `json:"id_status" db:"id_status"`
	Note          string    `json:"note" db:"note"`
	CreatedAt     time.Time `json:"created_at" db:"created_at"`
}
