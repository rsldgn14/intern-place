package companies

import "gitlab.com/sincap/sincap-common/services"

type Service interface {
	services.Service[Company]
}

type service struct {
	services.CrudService[Company]
	repository Repository
}

func StudentService(r Repository) Service {
	return &service{
		CrudService: services.CrudService[Company]{Repository: r},
		repository:  r,
	}

}
