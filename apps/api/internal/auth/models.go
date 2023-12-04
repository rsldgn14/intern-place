package auth

type LoginReq struct {
	Username string `validate:"required,email,min=6,max=50"`
	Password string `validate:"omitempty,len=64"`
	Token    string
}
