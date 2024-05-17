package models

type EmployeeLevel struct {
	Id          int64  `json:"id" db:"id"`
	Description string `json:"description" db:"description"`
	IdCompany   int    `json:"idCompany" db:"id_company"`
}
