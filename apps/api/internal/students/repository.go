package students

import (
	"gitlab.com/sincap/sincap-common/repositories"
	"gorm.io/gorm"
)

type Repository interface {
	repositories.Repository[Student]
	FindByUserID(id uint) (*Student, error)
}
type repository struct {
	repositories.GormRepository[Student]
}

func StudentRepository(db *gorm.DB) Repository {

	return &repository{repositories.NewGormRepository[Student](db)}

}

func (r *repository) FindByUserID(id uint) (*Student, error) {
	var student Student
	res := r.DB.Where("UserID=?", id).First(&student)
	return &student, res.Error
}
