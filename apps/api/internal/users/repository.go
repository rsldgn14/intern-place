package users

import (
	"gitlab.com/sincap/sincap-common/repositories"
	"gorm.io/gorm"
)

type Repository interface {
	repositories.Repository[User]
}
type repository struct {
	repositories.GormRepository[User]
}

func StudentRepository(db *gorm.DB) Repository {

	return &repository{repositories.NewGormRepository[User](db)}

}
