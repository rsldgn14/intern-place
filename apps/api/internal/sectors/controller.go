package sectors

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/sincap/sincap-common/middlewares"
	"gitlab.com/sincap/sincap-common/middlewares/qapi"
	"net/http"
	"strconv"
)

func SectorController(r fiber.Router, s Service) {
	res := controller{s}
	r.Get("/", middlewares.QApi, res.list)

	r.Post("/", middlewares.BodyParser[Sector]("body"), middlewares.Validator("body"), res.create)
	r.Put("/delMulti", middlewares.BodyParser[[]uint]("body"), res.deleteMulti)
	r.Get("/:sid", res.read)
	r.Delete("/:sid", res.delete)
	r.Patch("/:sid", middlewares.BodyParserMap("body",
		"ID", "CreatedAt",
		"UpdatedAt",
		"DeletedAt",
	), middlewares.ValidatorMap("body", Sector{}), res.update)

}

type controller struct {
	service Service
}


// @Summary List sectors
// @Description get sectors
// @Tags sectors
// @Accept  json
// @Produce  json
func (res *controller) list(ctx *fiber.Ctx) error {
	q := ctx.Locals("qapi").(*qapi.Query)

	sectors, count, err := res.service.List(ctx.UserContext(), q)

	if err != nil {
		return err

	}

	ctx.Set("X-Total-Count", strconv.FormatInt(int64(count), 10))
	return ctx.Format(sectors)
}

func (res *controller) read(ctx *fiber.Ctx) error {
	sid, err := ctx.ParamsInt("sid")

	if err != nil {
		return fiber.NewError(http.StatusNotFound, "Sector id not found")
	}

	sector, err := res.service.Read(ctx.UserContext(), uint(sid))

	if err != nil {
		return err
	}

	return ctx.Format(sector)
}

func (res *controller) create(ctx *fiber.Ctx) error {
	body := ctx.Locals("body").(*Sector)

	if err := res.service.Create(ctx.UserContext(), body); err != nil {
		return err
	}

	return ctx.SendStatus(fiber.StatusNoContent)
}

func (res *controller) update(ctx *fiber.Ctx) error {
	sid, err := ctx.ParamsInt("sid")

	if err != nil {

		return err
	}

	body := ctx.Locals("body").(*map[string]interface{})

	if err := res.service.Update(ctx.UserContext(), "Sector", uint(sid), *body); err != nil {
		return err
	}

	return ctx.SendStatus(fiber.StatusNoContent)
}

func (res *controller) delete(ctx *fiber.Ctx) error {
	sid, err := ctx.ParamsInt("sid")

	if err != nil {
		return fiber.NewError(http.StatusNotFound, "Sector id not found")
	}

	_, err = res.service.Delete(ctx.UserContext(), uint(sid))

	if err != nil {
		return err
	}

	return ctx.SendStatus(fiber.StatusNoContent)
}

func (res *controller) deleteMulti(ctx *fiber.Ctx) error {
	body := ctx.Locals("body").(*[]uint)

	if err := res.service.DeleteMulti(body); err != nil {

		return err
	}
	return ctx.SendStatus(fiber.StatusNoContent)
}
