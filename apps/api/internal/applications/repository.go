package applications

import (
	"gitlab.com/sincap/sincap-common/repositories"
	"gorm.io/gorm"
)

type Repository interface {
	repositories.Repository[Application]
	GetStudentApplications(studentID uint) ([]Application, error)
}
type repository struct {
	repositories.GormRepository[Application]
}

func ApplicationRepository(db *gorm.DB) Repository {

	return &repository{repositories.NewGormRepository[Application](db)}

}


func (r repository) GetStudentApplications(studentID uint) ([]Application, error) {
	var applications []Application
	err := r.DB.Model(&Application{}).Where("StudentID = ?",studentID).Preload("Company").Preload("Student").Preload("Notice").Find(&applications).Error
	return applications, err
}
