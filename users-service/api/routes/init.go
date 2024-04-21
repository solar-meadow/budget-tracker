package routes

import (
	"budget-tracker/api/structs"
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type Router struct {
	config *structs.Config
	db     *sql.DB
}

func NewRouter(config *structs.Config, db *sql.DB) *Router {
	return &Router{config: config, db: db}
}

func (r *Router) InitRoutes() {
	router := mux.NewRouter()
	router.HandleFunc("/health", r.healthHandler).Methods(http.MethodGet)

	api := router.PathPrefix("/api").Subrouter()

	api.HandleFunc("/users", r.getUsers).Methods(http.MethodGet)
	api.HandleFunc("/users/{id:[0-9]+}", r.getUser).Methods(http.MethodGet)

	api.HandleFunc("/users/create", r.createUser).Methods(http.MethodPost)

	fmt.Printf("listening on %s", ":8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
