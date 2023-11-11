package companies

import (
	"net/http"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gitlab.com/sincap/sincap-common/middlewares"
	"gitlab.com/sincap/sincap-common/middlewares/qapi"
)

func CompanyAdminController(r fiber.Router, s Service) {
	res := controller{s}
	r.Get("/", middlewares.QApi, res.list)
	r.Get("/:sid", res.read)
	r.Post("/:sid", middlewares.BodyParserMap("body",
		"ID",
		"CreatedAt",
		"DeletedAt",
	), middlewares.ValidatorMap("body", Company{}), res.update)
}

type controller struct {
	service Service
}

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

	sector, err := res.service.ReadCompanyWithPreloads(uint(sid))

	if err != nil {
		return err
	}

	return ctx.Format(sector)
}

func (res *controller) update(ctx *fiber.Ctx) error {
	sid, err := ctx.ParamsInt("sid")

	if err != nil {

		return err
	}

	body := ctx.Locals("body").(*map[string]interface{})

	if err := res.service.Update(ctx.UserContext(), "Company", uint(sid), *body); err != nil {
		return err
	}

	return ctx.SendStatus(fiber.StatusNoContent)
}
