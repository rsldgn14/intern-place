package applications

import "gitlab.com/sincap/sincap-common/services"

type Service interface {
	services.Service[Application]
	ReadApplicationWithPreload(id uint) (*Application, error)
	GetStudentApplications(studentID uint) ([]Application, error)
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
