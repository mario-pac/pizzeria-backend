package models

import "time"

type OrderItem struct {
	Id            int64      `json:"id" db:"id"`
	OrderID       int64      `json:"order_id" db:"order_id"`
	ProductID     int64      `json:"product_id" db:"product_id"`
	Quantity      int        `json:"quantity" db:"quantity"`
	IdOrderStatus int64      `json:"id_order_status" db:"id_order_status"`
	CreatedAt     time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt     *time.Time `json:"updated_at" db:"updated_at"`
}

type OrderItemResponse struct {
	Self            OrderItem `json:"self"`
	OrderItemStatus *Status   `json:"status" `
}
