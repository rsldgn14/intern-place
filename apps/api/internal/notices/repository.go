package notices

import (
	"gitlab.com/sincap/sincap-common/repositories"
	"gorm.io/gorm"
)

type Repository interface {
	repositories.Repository[Notice]
	IncreaseViewCount(noticeID uint) error 
	MyNotices(companyID uint) ([]Notice, error) 
	Approve(noticeID uint) error
	Reject(id uint) error
	Publish(id uint) error
	Unpublish(id uint) error
}
type repository struct {
	repositories.GormRepository[Notice]
}

func NoticeRepository(db *gorm.DB) Repository {

	return &repository{repositories.NewGormRepository[Notice](db)}

}

func(r repository) IncreaseViewCount(noticeID uint) error {
    var notice Notice

	if err := r.Read(&notice, noticeID); err != nil {
		return err
	}


	if err := r.UpdatePartial("Notice",noticeID, map[string]interface{}{"ViewCount":  notice.ViewCount + 1}); err != nil {
		return err
	}

	return nil;
}


func (r repository) MyNotices(companyID uint) ([]Notice, error) {
	var notices []Notice

	if err := r.DB.Model(&Notice{}).Where("CompanyID = ?", companyID).Preload("Sector").Find(&notices).Error; err != nil {
		return nil, err
	}

	return notices, nil
}


func (r repository) Approve(noticeID uint) error {
	return r.UpdatePartial("Notice",noticeID, map[string]interface{}{"Status":  APPROVED});
}


func (r repository) Reject(id uint) error {
	return r.UpdatePartial("Notice",id, map[string]interface{}{"Status":  REJECTED});
}

func (r repository) Publish(id uint) error {
	return r.UpdatePartial("Notice",id, map[string]interface{}{"Published":  true});
}

func (r repository) Unpublish(id uint) error {
	return r.UpdatePartial("Notice",id, map[string]interface{}{"Published":  false});
}