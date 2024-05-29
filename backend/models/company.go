package models

type Company struct {
	Id          int    `json:"id" db:"id"`
	CompanyName string `json:"companyName" db:"company_name"`
	Cnpj        string `json:"cnpj" db:"cnpj"`
}
