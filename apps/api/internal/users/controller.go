package users

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/sincap/sincap-common/auth/claims"
)

type controller struct {
	service Service
}

func UserController(r fiber.Router, s Service) {
	res := controller{s}
	r.Get("/me", res.me)

}


func (res *controller) me(ctx *fiber.Ctx) error {
	claims := ctx.Locals("claims").(*claims.DecryptedClaims)

	userID:= claims.UserID



	user, err := res.service.Read(ctx.UserContext(),uint(userID))

	if err != nil {
		return err
	}

	return ctx.Format(user)
}