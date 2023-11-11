package applications

import (
	"gitlab.com/sincap/sincap-common/repositories"
	"gorm.io/gorm"
)

type Repository interface {
	repositories.Repository[Application]
}
type repository struct {
	repositories.GormRepository[Application]
}

func ApplicationRepository(db *gorm.DB) Repository {

	return &repository{repositories.NewGormRepository[Application](db)}

}
