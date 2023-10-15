package notices

import (
	"gorm.io/gorm"
	"intern-api/apps/api/internal/sectors"
	"time"
)

// İlan
type Notice struct {
	gorm.Model
	CompanyID   uint
	Title       string `gorm:"size:120" validate:"required"`
	Description string `gorm:"size:3000" validate:"required"`
	SectorID    uint
	Sector      *sectors.Sector `gorm:"foreignKey:SectorID"`
	StartTime   *time.Time
	EndTime     *time.Time
	InternCount int  `validate:"required"`
	Active      bool `gorm:"default:false"`
}
