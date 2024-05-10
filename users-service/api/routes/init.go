package routes

import (
	"budget-tracker/api/repository"
	"budget-tracker/api/structs"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type Router struct {
	config     *structs.Config
	repository repository.Repository
}

func NewRouter(config *structs.Config, repository repository.Repository) *Router {
	return &Router{config: config, repository: repository}
}

func (r *Router) StartServer() {
	router := mux.NewRouter()
	router.HandleFunc("/health", r.healthHandler).Methods(http.MethodGet)

	api := router.PathPrefix("/api").Subrouter()

	api.HandleFunc("/users", r.getUsers).Methods(http.MethodGet)
	api.HandleFunc("/users/{id:[0-9]+}", r.getUser).Methods(http.MethodGet)

	api.HandleFunc("/users/create", r.createUser).Methods(http.MethodPost)

	fmt.Printf("listening on %s\n", ":8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
