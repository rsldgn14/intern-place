package companies

import (
	"intern-api/apps/api/internal/sectors"
	"intern-api/apps/api/internal/users"

	"gorm.io/gorm"
)

type Company struct {
	gorm.Model
	UserID      uint
	Name        string `gorm:"size:60" validate:"required"`
	Description string
	Sector      []*sectors.Sector `gorm:"many2many:CompanySectors;"`
	Address     string            `validate:"required"`
	Email       string
	User       *users.User `gorm:"foreignKey:UserID"`
}
