package repository

import "budget-tracker/api/structs"

type Repository interface {
	CreateUser(user *structs.User) error
	GetUser(id int) (*structs.User, error)
	GetUsers() ([]structs.User, error)
}
