package models

type Status struct {
	ID          int64  `json:"id" db:"id"`
	Description string `json:"description" db:"description"`
}
