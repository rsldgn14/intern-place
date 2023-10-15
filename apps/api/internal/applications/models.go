package applications

import (
	"gorm.io/gorm"
	"intern-api/apps/api/internal/companies"
	"intern-api/apps/api/internal/notices"
	"intern-api/apps/api/internal/students"
)

// Başvuru
type Application struct {
	gorm.Model
	NoticeID  uint
	StudentID uint
	CompanyID uint
	Notice    *notices.Notice    `gorm:"foreignKey:NoticeID"`
	Student   *students.Student  `gorm:"foreignKey:StudentID"`
	Company   *companies.Company `gorm:"foreignKey:CompanyID"`
	Status    Status
}

type Status uint

const (
	WAITING = iota + 1
	REJECTED
	APPROVED
)
