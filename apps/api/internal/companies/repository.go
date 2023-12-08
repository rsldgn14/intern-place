package companies

import (
	"gitlab.com/sincap/sincap-common/repositories"
	"gorm.io/gorm"
)

type Repository interface {
	repositories.Repository[Company]
	FindByUserID(id uint) (*Company, error)
}
type repository struct {
	repositories.GormRepository[Company]
}

func CompanyRepository(db *gorm.DB) Repository {

	return &repository{repositories.NewGormRepository[Company](db)}

}


func (r repository) FindByUserID(id uint) (*Company, error) {
	var company Company
	err := r.DB.Model(&Company{}).Where("UserID = ?", id).First(&company).Error
	return &company, err
}