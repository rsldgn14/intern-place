package notices

import (
	"gitlab.com/sincap/sincap-common/repositories"
	"gorm.io/gorm"
)

type Repository interface {
	repositories.Repository[Notice]
}
type repository struct {
	repositories.GormRepository[Notice]
}

func StudentRepository(db *gorm.DB) Repository {

	return &repository{repositories.NewGormRepository[Notice](db)}

}
