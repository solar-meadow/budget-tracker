package structs

type User struct {
	ID             int             `json:"id,omitempty"`
	Name           string          `json:"name"`
	Surname        string          `json:"surname,omitempty"`
	SocialNetworks []SocialNetwork `json:"social_networks,omitempty"`
}
