package images

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/sincap/sincap-common/middlewares"
	"gitlab.com/sincap/sincap-common/services"
)

type controller struct {
	service Service
}

// func ImageAdmin(r fiber.Router, s Service) {
// 	res := controller{s}
// 	r.Get("/", middlewares.QApi, res.list)
// 	r.Get("/:stid", res.read)
// 	r.Post("/:stid", middlewares.BodyParserMap("body"), middlewares.ValidatorMap("body", Student{}), res.update)
// }

func ImagePublicController(r fiber.Router, s Service) {
	res := controller{s}

	r.Post("/", middlewares.BodyParser[Image]("body"), middlewares.Validator("body"), res.create)
	r.Get("/content/:id", res.readContent)
}

func (res *controller) create(ctx *fiber.Ctx) error {

	body, _ := ctx.Locals("body").(*Image)

	if err := res.service.Create(ctx.UserContext(), body); err != nil {

		return err
	}

	return ctx.SendStatus(fiber.StatusNoContent)
}

func (res *controller) readContent(ctx *fiber.Ctx) error {
	id, err := ctx.ParamsInt("id")

	if err != nil {
		return services.NewError(fiber.StatusNotFound, "Image id not found")
	}

	image, err := res.service.Read(ctx.UserContext(), uint(id))

	if err != nil {
		return err
	}

	ctx.Set("Content-Type", "image/jpeg")

	return ctx.Send(image.Content)
}
