package models

type ModelByID struct {
	Id int64 `json:"id" db:"id"`
}

type Login struct {
	Username string `json:"username" db:"username"`
	Password string `json:"password" db:"password"`
}

type LoginResponse struct {
	Id       int64  `json:"id"`
	Name     string `json:"name" `
	Level_Id int64  `json:"levelId"`
	Token    string `json:"token"`
}
