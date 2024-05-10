package main

import (
	"budget-tracker/api/env"
	"budget-tracker/api/repository/postgres"
	"budget-tracker/api/routes"
)

func main() {
	config, db := env.InitEnv()
	repository := postgres.NewRepository(db)
	router := routes.NewRouter(config, repository)
	router.StartServer()
}
