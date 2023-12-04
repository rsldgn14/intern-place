package auth

import (
	"intern-api/apps/api/configs"
	"intern-api/apps/api/jwt"

	"github.com/gofiber/fiber/v2"
	"gitlab.com/sincap/sincap-common/auth"
	"gitlab.com/sincap/sincap-common/middlewares"
	"gitlab.com/sincap/sincap-common/net"
)

// var ticketCtxKey = contexts.NewContextKey()

// Resource is the routing info of the user controller
type controller struct {
	service Service
}

func AuthController(r fiber.Router, s Service) {
	res := controller{s}
	r.Post("/", middlewares.BodyParser[LoginReq]("auth"), res.login)
	r.Get("/logout", res.logout)
}

// login godoc
// @Summary Authenticate
// @Param  user body LoginReq true "User info"
// @Success 200 {array}  LoginReq
// @Router /api/v1/public/panel/auth [post]
// @Tags auth
func (rs *controller) login(ctx *fiber.Ctx) error {
	req := ctx.Locals("auth").(*LoginReq)

	userAgent := ctx.Get("User-Agent")
	ip := net.ReadUserIP(ctx)

	u, claims, err := rs.service.Login(ctx.UserContext(), req, userAgent, ip)
	if err != nil {
		return err
	}

	jwtErr := jwt.JwtSetCookie(ctx, claims)
	if jwtErr != nil {
		return ctx.SendStatus(fiber.StatusInternalServerError)
	}
	return ctx.JSON(u)
}

func (rs *controller) logout(ctx *fiber.Ctx) error {
	auth.InvalidateCookies(ctx, configs.Instance.Auth)

	return ctx.SendStatus(fiber.StatusNoContent)
}
