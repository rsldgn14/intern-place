package applications

import "gitlab.com/sincap/sincap-common/services"

type Service interface {
	services.Service[Application]
}

type service struct {
	services.CrudService[Application]
	repository Repository
}

func StudentService(r Repository) Service {
	return &service{
		CrudService: services.CrudService[Application]{Repository: r},
		repository:  r,
	}

}
