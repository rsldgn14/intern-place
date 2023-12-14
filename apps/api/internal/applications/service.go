package applications

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/sincap/sincap-common/services"
)

type Service interface {
	services.Service[Application]
	ReadApplicationWithPreload(id uint) (*Application, error)
	GetStudentApplications(studentID uint) ([]Application, error)
	GetCompanyApplications(companyID uint) ([]Application, error)
	Approve(appID ,companyID uint) error 
	Reject(appID ,companyID uint) error 
}

type service struct {
	services.CrudService[Application]
	repository Repository
}

func ApplicationService(r Repository) Service {
	return &service{
		CrudService: services.CrudService[Application]{Repository: r},
		repository:  r,
	}

}

func (s service) ReadApplicationWithPreload(id uint) (*Application, error) {
	var student Application

	if err := s.repository.Read(&student, id, "Student", "Company"); err != nil {
		return nil, err
	}

	return &student, nil

}


func (s service) GetStudentApplications(studentID uint) ([]Application, error) {
	return s.repository.GetStudentApplications(studentID)
}


func (s service) GetCompanyApplications(companyID uint) ([]Application, error) {
	return s.repository.GetCompanyApplications(companyID)
}


func (s service) Approve(appID ,companyID uint) error {
	var app Application


	if err := s.repository.Read(&app,appID);err != nil {
		return err
	}

	if app.Status != WAITING {
		return services.NewError(fiber.StatusBadRequest,"Başvuru zaten onaylanmış veya reddedilmiş")
	}
	

	return s.repository.Approve(appID,companyID)
}

func (s service) Reject(appID ,companyID uint) error {
	return s.repository.Reject(appID,companyID)
}