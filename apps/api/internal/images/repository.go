package images

import (
	"gitlab.com/sincap/sincap-common/repositories"
	"gorm.io/gorm"
)

type Repository interface {
	repositories.Repository[Image]
}
type repository struct {
	repositories.GormRepository[Image]
}

func ImageRepository(db *gorm.DB) Repository {

	return &repository{repositories.NewGormRepository[Image](db)}

}
