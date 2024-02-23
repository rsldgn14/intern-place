package images

import "gorm.io/gorm"

type Image struct {
	gorm.Model
	Type        string
	OwnerID     uint `gorm:"index:idx_owner,unique"`
	EntityID    uint `gorm:"index:idx_owner,unique"`
	Content     []byte 
	Title       string
	Description string
}
