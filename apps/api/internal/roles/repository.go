package roles

import (
	"gitlab.com/sincap/sincap-common/repositories"
	"gorm.io/gorm"
)

type Repository interface {
	repositories.Repository[Role]
}

type repository struct {
	repositories.GormRepository[Role]
}

func SectorRepository(db *gorm.DB) Repository {
	return &repository{repositories.NewGormRepository[Role](db)}
}
