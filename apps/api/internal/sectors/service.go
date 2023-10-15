package sectors

import "gitlab.com/sincap/sincap-common/services"

type Service interface {
	services.Service[Sector]
	DeleteMulti(ids *[]uint) error
}

type service struct {
	services.CrudService[Sector]
	repository Repository
}

func SectorService(r Repository) Service {
	return &service{
		CrudService: services.CrudService[Sector]{Repository: r},
		repository:  r,
	}

}

func (ser *service) DeleteMulti(ids *[]uint) error {
	if err := ser.repository.DeleteMulti(ids); err != nil {
		return err
	}

	return nil
}
