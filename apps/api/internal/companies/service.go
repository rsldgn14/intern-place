package companies

import "gitlab.com/sincap/sincap-common/services"

type Service interface {
	services.Service[Company]
	ReadCompanyWithPreloads(id uint) (*Company, error)
}

type service struct {
	services.CrudService[Company]
	repository Repository
}

func CompanyService(r Repository) Service {
	return &service{
		CrudService: services.CrudService[Company]{Repository: r},
		repository:  r,
	}

}

func (s service) ReadCompanyWithPreloads(id uint) (*Company, error) {
	var company Company

	if err := s.repository.Read(&company, id, "Sector"); err != nil {
		return nil, err
	}

	return &company, nil

}
