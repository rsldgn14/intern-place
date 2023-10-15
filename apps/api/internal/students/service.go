package students

import "gitlab.com/sincap/sincap-common/services"

type Service interface {
	services.Service[Student]
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
