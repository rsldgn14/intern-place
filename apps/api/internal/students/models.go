package students

import (
	"gorm.io/gorm"
	"intern-api/apps/api/internal/sectors"
	"time"
)

type Student struct {
	gorm.Model
	UserID     uint
	BirthDate  *time.Time
	Sectors    []*sectors.Sector `gorm:"many2many:StudentSectors;"`
	University string
	Grade      uint
	Experience string
}
