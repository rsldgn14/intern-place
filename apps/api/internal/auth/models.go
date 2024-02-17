package auth

import (
	"intern-api/apps/api/internal/users"
)

type LoginReq struct {
	Username string `validate:"required,email,min=6,max=50"`
	Password string `validate:"omitempty,len=64"`
	Token    string
}

type RegisterReq struct {
	Username  string `validate:"required,email,min=6,max=50"`
	FirstName string `validate:"required,min=2,max=50"`
	LastName  string `validate:"required,min=2,max=50"`
	Role      users.Role
	Password  string `validate:"required"`
}
