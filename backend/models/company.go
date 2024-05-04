package models

type Company struct {
	Id          int    `json:"id" db:"id"`
	CompanyName string `json:"company_name" db:"company_name"`
	Cnpj        string `json:"cpnj" db:"cpnj"`
}
