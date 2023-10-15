package sectors

import (
	"gitlab.com/sincap/sincap-common/repositories"
	"gorm.io/gorm"
)

type Repository interface {
	repositories.Repository[Sector]
	DeleteMulti(ids *[]uint) error
}

type repository struct {
	repositories.GormRepository[Sector]
}

func SectorRepository(db *gorm.DB) Repository {
	return &repository{repositories.NewGormRepository[Sector](db)}
}

func (rep *repository) DeleteMulti(ids *[]uint) error {
	if err := rep.DB.Delete(&Sector{}, ids).Error; err != nil {
		return err
	}
	return nil
}
