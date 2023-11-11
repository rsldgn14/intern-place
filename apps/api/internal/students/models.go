package students

import (
	"intern-api/apps/api/internal/sectors"
	"intern-api/apps/api/internal/users"
	"time"

	"gorm.io/gorm"
)

type Student struct {
	gorm.Model
	UserID     uint
	BirthDate  *time.Time
	Sectors    []*sectors.Sector `gorm:"many2many:StudentSectors;"`
	University string
	Grade      uint
	Experience string
	User       *users.User `gorm:"foreignKey:UserID"`
}
