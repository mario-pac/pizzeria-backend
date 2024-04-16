package models

import "time"

type Employee struct {
	ID        int64     `json:"id" db:"id"`
	Name      string    `json:"name" db:"name"`
	Login     string    `json:"login" db:"login"`
	Password  string    `json:"password" db:"password"`
	Level_Id  int64     `json:"level_id" db:"level_id"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

type EmployeeListFilters struct {
	Name    *string `db:"name"`
	LevelId *int64  `db:"level_id"`
}
