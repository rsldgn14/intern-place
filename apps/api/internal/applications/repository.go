package applications

import (
	"gitlab.com/sincap/sincap-common/repositories"
	"gorm.io/gorm"
)

type Repository interface {
	repositories.Repository[Application]
	GetStudentApplications(studentID uint) ([]Application, error)
	GetCompanyApplications(companyID uint) ([]Application, error) 
	Approve(appID ,companyID uint) error
	Reject(appID ,companyID uint) error
}
type repository struct {
	repositories.GormRepository[Application]
}

func ApplicationRepository(db *gorm.DB) Repository {

	return &repository{repositories.NewGormRepository[Application](db)}

}


func (r repository) GetStudentApplications(studentID uint) ([]Application, error) {
	var applications []Application
	err := r.DB.Model(&Application{}).Where("StudentID = ?",studentID).Preload("Company").Preload("Student").Preload("Notice").Preload("Notice.Sector").Find(&applications).Error
	return applications, err
}

func (r repository) GetCompanyApplications(companyID uint) ([]Application, error) {
	var applications []Application
	err := r.DB.Model(&Application{}).Where("CompanyID = ?",companyID).Preload("Company").Preload("Student").Preload("Notice").Preload("Notice.Sector").Preload("Student.User").Find(&applications).Error
	return applications, err
}

func (r repository) Approve(appID ,companyID uint) error {
	return r.DB.Model(&Application{}).Where("ID = ? AND CompanyID = ?",appID,companyID).Update("Status",APPROVED).Error
}

func (r repository) Reject(appID ,companyID uint) error {
	return r.DB.Model(&Application{}).Where("ID = ? AND CompanyID = ?",appID,companyID).Update("Status",REJECTED).Error
}