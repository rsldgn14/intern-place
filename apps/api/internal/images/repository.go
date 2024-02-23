package images

import (
	"gitlab.com/sincap/sincap-common/repositories"
	"gorm.io/gorm"
)

type Repository interface {
	repositories.Repository[Image]
	ReadContent(entityid ,ownerID uint )  (*Image,error)
	UpdateContent(image Image) error  
}
type repository struct {
	repositories.GormRepository[Image]
}

func ImageRepository(db *gorm.DB) Repository {

	return &repository{repositories.NewGormRepository[Image](db)}

}


func (rep *repository ) ReadContent(entityID ,ownerID uint )  (*Image,error) {
  
	var image *Image

	if err :=  rep.DB.Where("OwnerID = ? AND EntityID = ?",ownerID,entityID).First(&image).Error; err != nil {

		return nil,err
	}


	return image,nil
}


func (rep *repository) UpdateContent(image Image) error {

	if err := rep.DB.Where("OwnerID = ? AND EntityID = ?",image.OwnerID,image.EntityID).UpdateColumns(Image{
		Model:       image.Model,
		Type:        image.Type,
		Content:     image.Content,
		Title:      image.Title,
		Description: image.Description,
	}).Error; err != nil {

		return err
	}

	return nil
}