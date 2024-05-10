package postgres

import (
	"budget-tracker/api/structs"
	"database/sql"
	"errors"
	"fmt"

	_ "github.com/lib/pq"
)

// ADD SOCIAL NETWORK ACCOUNT TO USER
func (r *Repository) AddSocialNeteworkToUser(sn *structs.SocialNetwork) error {
	prefix := "repository postgres driver\nadd social network to user: "
	query := "INSERT INTO social_network (user_id, name, account_id) VALUES ($1, $2, $3);"
	stmt, err := r.db.Prepare(query)
	if err != nil {
		return fmt.Errorf("%sprepare sql query error: %w", prefix, err)
	}

	_, err = stmt.Exec(sn.UserId, sn.Name, sn.NetworkId)
	if err != nil {
		return fmt.Errorf("%sexecuting statement error: %w", prefix, err)
	}

	return nil
}

func (r *Repository) GetUserSocialNetworks(userId int) ([]structs.SocialNetwork, error) {
	prefix := "repository postgres driver\nget social network of user: "
	query := "SELECT id, name, account_id FROM social_network WHERE user_id=$1;"
	stmt, err := r.db.Prepare(query)
	if err != nil {
		return nil, fmt.Errorf("%sprepare sql query error: %w", prefix, err)
	}

	rows, err := stmt.Query(userId)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("%sget user's social network accounts error: %w", prefix, err)
	}
	defer rows.Close()

	result := make([]structs.SocialNetwork, 0)
	for rows.Next() {
		row := structs.SocialNetwork{UserId: userId}
		err = rows.Scan(&row.ID, &row.Name, &row.NetworkId)
		if err != nil {
			return nil, fmt.Errorf("%sscan row error: %w", prefix, err)
		}

		result = append(result, row)
	}

	return result, nil
}
