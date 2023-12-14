package notices

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/sincap/sincap-common/services"
)

type Service interface {
	services.Service[Notice]
	ReadNoticeWithPreloads(id uint) (*Notice, error)
	IncreaseViewCount(noticeID uint) error
	MyNotices(companyID uint) ([]Notice, error)
	Approve(noticeID uint) error
	Reject(noticeID uint) error
	Publish(noticeID uint) error
	Unpublish(noticeID uint) error
}

type service struct {
	services.CrudService[Notice]
	repository Repository
}

func NoticeService(r Repository) Service {
	return &service{
		CrudService: services.CrudService[Notice]{Repository: r},
		repository:  r,
	}

}

func (s service) ReadNoticeWithPreloads(id uint) (*Notice, error) {
	var student Notice

	if err := s.repository.Read(&student, id, "Sector", "Company.Sector", "Company"); err != nil {
		return nil, err
	}

	return &student, nil

}


func (s service) IncreaseViewCount(noticeID uint) error {
	if err :=  s.repository.IncreaseViewCount(noticeID); err != nil {
		return err
	}

	return nil
}


func (s service) MyNotices(companyID uint) ([]Notice, error) {
	return s.repository.MyNotices(companyID)
}

func (s service) Approve(noticeID uint) error {
	var notice Notice


	if err := s.repository.Read(&notice, noticeID); err != nil {
		return err
	}

	if notice.Status != DRAFT {
		return services.NewError(fiber.StatusBadRequest,"Notice is not draft")
	}


	return s.repository.Approve(noticeID)
}


func (s service) Reject(noticeID uint) error {
	var notice Notice
	
	if err := s.repository.Read(&notice, noticeID); err != nil {
		return err
	}

	if notice.Status != APPROVED {
		return services.NewError(fiber.StatusBadRequest,"Notice is not approved")
	}

	return s.repository.Reject(noticeID)

}


func (s service) Publish(noticeID uint) error {
	var notice Notice
	
	if err := s.repository.Read(&notice, noticeID); err != nil {
		return err
	}

	if  notice.Status != APPROVED || notice.Published  {
		return services.NewError(fiber.StatusBadRequest,"Notice is not approved or already published or not unpublished")
	
	}
	return s.repository.Publish(noticeID)

}

func (s service) Unpublish(noticeID uint) error {
	var notice Notice
	
	if err := s.repository.Read(&notice, noticeID); err != nil {
		return err
	}

	if notice.Status != APPROVED || !notice.Published  {
		return services.NewError(fiber.StatusBadRequest,"Notice is not published")
	}

	return s.repository.Unpublish(noticeID)

}