package models

import (
	"time"
)

type Employee struct {
	Id           int64      `json:"id" db:"id"`
	CompleteName string     `json:"name" db:"name"`
	Username     string     `json:"username" db:"username"`
	Password     string     `json:"password" db:"password"`
	Level_Id     int64      `json:"level_id" db:"level_id"`
	CreatedAt    *time.Time `json:"created_at" db:"created_at"`
	UpdatedAt    *time.Time `json:"updated_at" db:"updated_at"`
	IdCompany    int        `json:"id_company" db:"id_company"`
}

type EmployeeResponse struct {
	Self          Employee       `json:"self"`
	EmployeeLevel *EmployeeLevel `json:"employee_level"`
}

type EmployeeListFilters struct {
	Name      *string `json:"name" db:"name"`
	LevelId   *int64  `json:"level_id" db:"level_id"`
	IdCompany int     `json:"id_company" db:"id_company"`
}
