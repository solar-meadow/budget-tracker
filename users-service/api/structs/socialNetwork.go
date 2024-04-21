package structs

type SocialNetwork struct {
	ID        int    `json:"id"`
	UserId    int    `json:"omitempty"`
	Name      string `json:"name"`
	NetworkId int    `json:"network_id"`
}
