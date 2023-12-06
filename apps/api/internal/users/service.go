package users

import "gitlab.com/sincap/sincap-common/services"

type Service interface {
	services.Service[User]
}

type service struct {
	services.CrudService[User]
	repository Repository
}

func UserService(r Repository) Service {
	return &service{
		CrudService: services.CrudService[User]{Repository: r},
		repository:  r,
	}

}



