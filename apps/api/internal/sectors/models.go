package sectors

import "gorm.io/gorm"

type Sector struct {
	gorm.Model
	Name string `validate:"required"`
}
