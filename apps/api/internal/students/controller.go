package students

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/sincap/sincap-common/middlewares"
	"gitlab.com/sincap/sincap-common/middlewares/qapi"
	"net/http"
	"strconv"
)

type controller struct {
	service Service
}

func StudentController(r fiber.Router, s Service) {
	res := controller{s}
	r.Get("/", res.list)
	r.Get("/:stid", res.read)
	r.Delete("/:stid", res.delete)
	r.Patch("/:stid", middlewares.BodyParser[Student]("body"), middlewares.Validator("body"), res.update)
}

func (res *controller) list(ctx *fiber.Ctx) error {
	q := ctx.Locals("qapi").(*qapi.Query)

	students, count, err := res.service.List(ctx.UserContext(), q)

	if err != nil {
		return err

	}

	ctx.Set("X-Total-Count", strconv.FormatInt(int64(count), 10))
	return ctx.Format(students)
}

func (res *controller) read(ctx *fiber.Ctx) error {
	stid, err := ctx.ParamsInt("stid")

	if err != nil {
		return fiber.NewError(http.StatusNotFound, "Student id not found")
	}

	student, err := res.service.Read(ctx.UserContext(), uint(stid))

	if err != nil {
		return err
	}

	return ctx.Format(student)
}

func (res *controller) update(ctx *fiber.Ctx) error {
	stid, err := ctx.ParamsInt("stid")

	if err != nil {

		return err
	}

	body := ctx.Locals("body").(*map[string]interface{})

	if err := res.service.Update(ctx.UserContext(), "Student", uint(stid), *body); err != nil {
		return err
	}

	return ctx.SendStatus(fiber.StatusNoContent)
}

func (res *controller) delete(ctx *fiber.Ctx) error {
	stid, err := ctx.ParamsInt("sid")

	if err != nil {
		return fiber.NewError(http.StatusNotFound, "Student id not found")
	}

	_, err = res.service.Delete(ctx.UserContext(), uint(stid))

	if err != nil {
		return err
	}

	return ctx.SendStatus(fiber.StatusNoContent)
}
