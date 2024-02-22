package images

import "gitlab.com/sincap/sincap-common/services"

type Service interface {
	services.Service[Image]
}

type service struct {
	services.CrudService[Image]
	repository Repository
}

func ImageService(r Repository) Service {
	return &service{
		CrudService: services.CrudService[Image]{Repository: r},
		repository:  r,
	}

}
