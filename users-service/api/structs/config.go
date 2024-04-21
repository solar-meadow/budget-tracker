package structs

type Config struct {
	Port       int    `json:"port"`
	DBHost     string `json:"dbHost"`
	DBPort     int    `json:"dbPort"`
	DBName     string `json:"dbName"`
	DBUsername string `json:"dbUsername"`
	DBPassword string `json:"dbPassword"`
	DBDriver   string `json:"dbDriver"`
}
