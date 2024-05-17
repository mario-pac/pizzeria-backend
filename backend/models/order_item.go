package models

import "time"

type OrderItem struct {
	Id            int64      `json:"id" db:"id"`
	OrderID       int64      `json:"orderId" db:"order_id"`
	ProductID     int64      `json:"productId" db:"product_id"`
	Quantity      int        `json:"quantity" db:"quantity"`
	IdOrderStatus int64      `json:"idOrderStatus" db:"id_order_status"`
	CreatedAt     time.Time  `json:"createdAt" db:"created_at"`
	UpdatedAt     *time.Time `json:"updatedAt" db:"updated_at"`
}

type OrderItemResponse struct {
	Self            OrderItem `json:"self"`
	OrderItemStatus *Status   `json:"status" `
}
