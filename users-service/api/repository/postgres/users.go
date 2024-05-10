package postgres

import (
	"budget-tracker/api/structs"
	"database/sql"
	"errors"
	"fmt"

	_ "github.com/lib/pq"
)

// CREATE NEW USER
func (r *Repository) CreateUser(user *structs.User) error {
	prefix := "repository postgres driver\ncreate user error: "
	query := "INSERT INTO users(name, surname) VALUES ($1, $2) RETURNING id;"
	stmt, err := r.db.Prepare(query)
	if err != nil {
		return fmt.Errorf("%sprepare query: %w", prefix, err)
	}

	err = stmt.QueryRow(user.Name, user.Surname).Scan(&user.ID)
	if err != nil {
		return fmt.Errorf("%s executing query: %w", prefix, err)
	}

	for i := 0; i < len(user.SocialNetworks); i++ {
		user.SocialNetworks[i].UserId = user.ID
		err = r.AddSocialNeteworkToUser(&user.SocialNetworks[i])
		if err != nil {
			return fmt.Errorf("%sAddSocialNeteworkToUser: %w", prefix, err)
		}
	}
	return nil
}

func (r *Repository) GetUser(id int) (*structs.User, error) {
	prefix := "repository postgres driver\nget user: "
	query := "SELECT name, surname FROM users WHERE id=$1"
	stmt, err := r.db.Prepare(query)
	if err != nil {
		return nil, fmt.Errorf("%s%w", prefix, err)
	}

	user := structs.User{ID: id}
	err = stmt.QueryRow(id).Scan(&user.Name, &user.Surname)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("%s%w", prefix, err)
	}

	userSocialNetworks, err := r.GetUserSocialNetworks(id)
	if err != nil {
		return nil, fmt.Errorf("%s%w", prefix, err)
	}
	user.SocialNetworks = userSocialNetworks
	return &user, nil
}

// BRRR
func (r *Repository) GetUsers() ([]structs.User, error) {
	prefix := "repository postgres driver\nget users: "
	query := "SELECT id, name, surname FROM users"
	stmt, err := r.db.Prepare(query)
	if err != nil {
		return nil, fmt.Errorf("%s%w", prefix, err)
	}

	rows, err := stmt.Query()
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}

		return nil, fmt.Errorf("%s%w", prefix, err)
	}

	users := make([]structs.User, 0)
	for rows.Next() {
		user := structs.User{}
		err = rows.Scan(&user.ID, &user.Name, &user.Surname)
		if err != nil {
			return nil, fmt.Errorf("%s%w", prefix, err)
		}

		userSocialNetworks, err := r.GetUserSocialNetworks(user.ID)
		if err != nil {
			return nil, fmt.Errorf("%s%w", prefix, err)
		}
		user.SocialNetworks = userSocialNetworks
		users = append(users, user)
	}

	return users, nil
}
