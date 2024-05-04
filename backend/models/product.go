package models

import "time"

type Product struct {
	ID          int64     `json:"id" db:"id"`
	Description string    `json:"description" db:"description"`
	Price       float64   `json:"price" db:"price"`
	Category    string    `json:"category" db:"category"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
	UpdatedAt   time.Time `json:"updated_at" db:"updated_at"`
	IdCompany   int       `json:"id_company" db:"id_company"`
}

type ProductListFilters struct {
	Description *string `json:"description" db:"description"`
	Category    *string `json:"category" db:"category"`
	IdCompany   int     `json:"id_company" db:"id_company"`
}
