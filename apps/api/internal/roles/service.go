package roles

import "gitlab.com/sincap/sincap-common/services"

type Service interface {
	services.Service[Role]
}

type service struct {
	services.CrudService[Role]
	repository Repository
}

func SectorService(r Repository) Service {
	return &service{
		CrudService: services.CrudService[Role]{Repository: r},
		repository:  r,
	}

}
