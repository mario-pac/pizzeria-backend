package models

type Config struct {
	ID             int64  `json:"id" db:"id"`
	NumberOfTables int    `json:"numberOfTables" db:"number_of_tables"`
	CompanyName    string `json:"companyName" db:"company_name"`
}
