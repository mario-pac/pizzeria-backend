package models

type Config struct {
	Id             int64 `json:"id" db:"id"`
	NumberOfTables int   `json:"numberOfTables" db:"number_of_tables"`
	IdCompany      int   `json:"idCompany" db:"id_company"`
}
