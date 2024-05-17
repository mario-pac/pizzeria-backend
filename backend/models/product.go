package models

import "time"

type Product struct {
	ID          int64     `json:"id" db:"id"`
	Description string    `json:"description" db:"description"`
	Price       float64   `json:"price" db:"price"`
	Category    string    `json:"category" db:"category"`
	CreatedAt   time.Time `json:"createdAt" db:"created_at"`
	UpdatedAt   time.Time `json:"updatedAt" db:"updated_at"`
	IdCompany   int       `json:"idCompany" db:"id_company"`
}

type ProductListFilters struct {
	Description *string `json:"description" db:"description"`
	Category    *string `json:"category" db:"category"`
	IdCompany   int     `json:"idCompany" db:"id_company"`
}
