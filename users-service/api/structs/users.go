package structs

import "time"

type User struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Surname     string    `json:"surname,omitempty"`
	DateOfBirth time.Time `json:"date_of_birth,omitempty"`
}
