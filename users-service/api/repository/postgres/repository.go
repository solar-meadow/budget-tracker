package postgres

import (
	"budget-tracker/api/repository"
	"database/sql"

	_ "github.com/lib/pq"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) repository.Repository {
	return &Repository{
		db: db,
	}
}
