package models

import "time"

type Product struct {
	ID          int64     `json:"id" db:"id"`
	Description string    `json:"description" db:"description"`
	Price       float64   `json:"price" db:"price"`
	Category    string    `json:"category" db:"category"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
}

type ProductListFilters struct {
	Description *string `db:"description"`
	Category    *string `db:"category"`
}
