package students

import (
	"gitlab.com/sincap/sincap-common/repositories"
	"gorm.io/gorm"
)

type Repository interface {
	repositories.Repository[Student]
}
type repository struct {
	repositories.GormRepository[Student]
}

func StudentRepository(db *gorm.DB) Repository {

	return &repository{repositories.NewGormRepository[Student](db)}

}
