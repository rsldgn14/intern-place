package images

import "gorm.io/gorm"

type Image struct {
	gorm.Model
	Type        string
	OwnerID     uint
	EntityID    uint
	Content     []byte // Base64 kodlanmış içeriği tutmak için byte dizisi
	Title       string
	Description string
}
