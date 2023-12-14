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
	SectorID    uint   `validate:"required"`
	Company     *companies.Company `gorm:"foreignKey:CompanyID"`
	Sector      *sectors.Sector    `gorm:"foreignKey:SectorID"`
	StartTime   *time.Time `validate:"required"`
	EndTime     *time.Time `validate:"required"`
	InternCount int  `validate:"required"`
	Status      uint `gorm:"default:0"`
	Published   bool `gorm:"default:false"`
	ViewCount   uint  `gorm:"default:0"`
}



const (
	DRAFT uint = iota
	APPROVED
	REJECTED
)