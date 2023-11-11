package notices

import (
	"intern-api/apps/api/internal/companies"
	"intern-api/apps/api/internal/sectors"
	"time"

	"gorm.io/gorm"
)

// İlan
type Notice struct {
	gorm.Model
	CompanyID   uint
	Title       string `gorm:"size:120" validate:"required"`
	Description string `gorm:"size:3000" validate:"required"`
	SectorID    uint
	Company     *companies.Company `gorm:"foreignKey:CompanyID"`
	Sector      *sectors.Sector    `gorm:"foreignKey:SectorID"`
	StartTime   *time.Time
	EndTime     *time.Time
	InternCount int  `validate:"required"`
	Active      bool `gorm:"default:false"`
}
