package users

import "gorm.io/gorm"

type User struct {
	gorm.Model
	FirstName   string `gorm:"size:64" validate:"required"`
	LastName    string `gorm:"size:64" validate:"required"`
	UserName    string `gorm:"index;size:64;not null" validate:"required"`
	Password    string `json:"-" validate:"required"`
	Description string `gorm:"size:300"`
	Address     string `gorm:"size:250"`
	RoleID      Role
}

type Role int

const (
	ADMIN = iota + 1
	STUDENT
	COMPANY
)
