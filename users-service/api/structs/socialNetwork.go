package structs

type SocialNetwork struct {
	ID        int    `json:"id,omitempty"`
	UserId    int    `json:"omitempty"`
	Name      string `json:"name"`
	NetworkId string `json:"network_id"`
}
