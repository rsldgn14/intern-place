package notices

import "gitlab.com/sincap/sincap-common/services"

type Service interface {
	services.Service[Notice]
	ReadNoticeWithPreloads(id uint) (*Notice, error)
	IncreaseViewCount(noticeID uint) error
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