package users

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/sincap/sincap-common/auth/claims"
	"gitlab.com/sincap/sincap-common/middlewares"
)

type controller struct {
	service Service
}

func UserController(r fiber.Router, s Service) {
	res := controller{s}
	r.Get("/me", res.me)
	r.Put("/update/:uid",middlewares.BodyParserMap("body","Password"),middlewares.ValidatorMap("body",User{}) ,res.update)

}


// ID        uint `gorm:"primarykey"`
// CreatedAt time.Time
// UpdatedAt time.Time
// DeletedAt DeletedAt `gorm:"index"`

func (res *controller) me(ctx *fiber.Ctx) error {
	claims := ctx.Locals("claims").(*claims.DecryptedClaims)

	userID:= claims.UserID



	user, err := res.service.Read(ctx.UserContext(),uint(userID))

	if err != nil {
		return err
	}

	return ctx.Format(user)
}


func (res *controller) update(ctx *fiber.Ctx) error {
	uid, err := ctx.ParamsInt("uid")

	if err != nil {

		return err
	}

	body := ctx.Locals("body").(*map[string]interface{})
	

	if err := res.service.Update(ctx.UserContext(),"User",uint(uid),*body); err != nil {
		return err
	}


	return ctx.SendStatus(fiber.StatusNoContent)
}