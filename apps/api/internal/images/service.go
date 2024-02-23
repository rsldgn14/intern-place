package images

import (
	"github.com/go-sql-driver/mysql"
	"gitlab.com/sincap/sincap-common/services"
)

type Service interface {
	services.Service[Image]
	ReadContent(entityID,ownerID uint) (*Image,error)
	CreateImage(body *Image)  error 
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


func (svc *service) CreateImage(body *Image)  error {

	if err := svc.repository.Create(body); err != nil {
        // Eğer duplicate key hatası alınırsa, mevcut satırı güncelle
        if err != nil && err.(*mysql.MySQLError).Number == 1062 {
           if err :=  svc.repository.UpdateContent(*body); err != nil {
				return err
		   }
		   return nil
        } 
    }

	return nil
}

func (svc *service) ReadContent(entityID,ownerID uint) (*Image,error) {
	record,err := svc.repository.ReadContent(entityID,ownerID);

	if err != nil {
		return nil,err
	}
	
	return record,nil
}
