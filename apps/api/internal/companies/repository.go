package companies

import (
	"gitlab.com/sincap/sincap-common/repositories"
	"gorm.io/gorm"
)

type Repository interface {
	repositories.Repository[Company]
}
type repository struct {
	repositories.GormRepository[Company]
}

func StudentRepository(db *gorm.DB) Repository {

	return &repository{repositories.NewGormRepository[Company](db)}

}
