package companies

import (
	"gorm.io/gorm"
	"intern-api/apps/api/internal/sectors"
)

type Company struct {
	gorm.Model
	UserID      uint
	Name        string `gorm:"size:60" validate:"required"`
	Description string
	Sector      []*sectors.Sector `gorm:"many2many:CompanySectors;"`
	Address     string            `validate:"required"`
	Email       string
}
