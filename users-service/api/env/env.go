package env

import (
	"budget-tracker/api/structs"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

func InitEnv() (*structs.Config, *sql.DB) {
	config := initConfig()
	db := initDB(config)
	return config, db
}

func initConfig() *structs.Config {
	var config structs.Config
	file, err := os.Open("config.json")
	if err != nil {
		log.Fatal(err)
	}
	decoder := json.NewDecoder(file)
	err = decoder.Decode(&config)
	if err != nil {
		log.Fatal(err)
	}
	return &config
}

func initDB(config *structs.Config) *sql.DB {
	connStr := fmt.Sprintf("host=%s port=%d dbname=%s user=%s password=%s sslmode=disable",
		config.DBHost, config.DBPort, config.DBName, config.DBUsername, config.DBPassword)

	db, err := sql.Open(config.DBDriver, connStr)
	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	db.SetMaxIdleConns(100)
	return db
}
