package notices

import "gitlab.com/sincap/sincap-common/services"

type Service interface {
	services.Service[Notice]
}

type service struct {
	services.CrudService[Notice]
	repository Repository
}

func StudentService(r Repository) Service {
	return &service{
		CrudService: services.CrudService[Notice]{Repository: r},
		repository:  r,
	}

}
