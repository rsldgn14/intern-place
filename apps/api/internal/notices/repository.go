package notices

import (
	"gitlab.com/sincap/sincap-common/repositories"
	"gorm.io/gorm"
)

type Repository interface {
	repositories.Repository[Notice]
	IncreaseViewCount(noticeID uint) error 
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
