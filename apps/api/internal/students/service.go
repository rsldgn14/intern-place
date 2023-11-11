package students

import "gitlab.com/sincap/sincap-common/services"

type Service interface {
	services.Service[Student]
	ReadStudentWithPreloads(id uint) (*Student, error)
}

type service struct {
	services.CrudService[Student]
	repository Repository
}

func StudentService(r Repository) Service {
	return &service{
		CrudService: services.CrudService[Student]{Repository: r},
		repository:  r,
	}

}

func (s service) ReadStudentWithPreloads(id uint) (*Student, error) {
	var student Student

	if err := s.repository.Read(&student, id, "Sectors", "User"); err != nil {
		return nil, err
	}

	return &student, nil

}
