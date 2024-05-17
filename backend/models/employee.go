package models

import (
	"time"
)

type Employee struct {
	Id           int64      `json:"id" db:"id"`
	CompleteName string     `json:"name" db:"name"`
	Username     string     `json:"username" db:"username"`
	Password     string     `json:"password" db:"password"`
	Level_Id     int64      `json:"levelId" db:"level_id"`
	CreatedAt    *time.Time `json:"createdAt" db:"created_at"`
	UpdatedAt    *time.Time `json:"updatedAt" db:"updated_at"`
	IdCompany    int        `json:"idCompany" db:"id_company"`
}

type EmployeeResponse struct {
	Self          Employee       `json:"self"`
	EmployeeLevel *EmployeeLevel `json:"employeeLevel"`
}

type EmployeeListFilters struct {
	Name      *string `json:"name" db:"name"`
	LevelId   *int64  `json:"levelId" db:"level_id"`
	IdCompany int     `json:"idCompany" db:"id_company"`
}
