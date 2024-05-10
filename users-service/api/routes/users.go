package routes

import (
	"budget-tracker/api/structs"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func (router *Router) createUser(w http.ResponseWriter, r *http.Request) {
	var u structs.User

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&u)
	if err != nil {
		log.Printf("createUser decode body error: %v\n", err)
		// пока возращаем саму ошибку в качестве текста
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = router.repository.CreateUser(&u)
	if err != nil {
		log.Printf("createUser error: %v\n", err)
		// пока возращаем саму ошибку в качестве текста
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	b, err := json.Marshal(u)
	if err != nil {
		log.Printf("createUser error: %v\n", err)
		// пока возращаем саму ошибку в качестве текста
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write(b)
}

func (router *Router) getUsers(w http.ResponseWriter, r *http.Request) {
	users, err := router.repository.GetUsers()
	if err != nil {
		log.Printf("getUsers error: %v\n", err)
		// пока возращаем саму ошибку в качестве текста
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if users == nil {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("{ \"code\": 200;\n\"message\": \"no users\"}"))
		return
	}

	b, err := json.Marshal(users)
	if err != nil {
		log.Printf("getUsers error: %v\n", err)
		// пока возращаем саму ошибку в качестве текста
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write(b)
}
func (router *Router) getUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		log.Printf("getUser error: %v\n", err)
		// пока возращаем саму ошибку в качестве текста
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := router.repository.GetUser(id)
	if err != nil {
		log.Printf("getUser error: %v\n", err)
		// пока возращаем саму ошибку в качестве текста
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if user == nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("{ \"code\": 400;\n\"message\": \"no user with such id, suction\"}"))
		return
	}

	b, err := json.Marshal(user)
	if err != nil {
		log.Printf("getUsers error: %v\n", err)
		// пока возращаем саму ошибку в качестве текста
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write(b)
}
