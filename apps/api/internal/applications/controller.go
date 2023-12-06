package applications

import (
	"net/http"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gitlab.com/sincap/sincap-common/middlewares"
	"gitlab.com/sincap/sincap-common/middlewares/qapi"
)

type controller struct {
	service Service
}

func ApplicationAdminController(r fiber.Router, s Service) {
	res := controller{s}
	r.Get("/", middlewares.QApi, res.list)
	r.Get("/:sid", res.read)
}

func ApplicationStudentController(r fiber.Router, s Service) {
	res := controller{s}
	r.Post("/", middlewares.BodyParser[Application]("body") ,res.create)
}

func (res *controller) list(ctx *fiber.Ctx) error {
	q := ctx.Locals("qapi").(*qapi.Query)

	sectors, count, err := res.service.List(ctx.UserContext(), q, "Company", "Student", "Student.User")

	if err != nil {
		return err

	}

	ctx.Set("X-Total-Count", strconv.FormatInt(int64(count), 10))
	return ctx.Format(sectors)
}

func (res *controller) read(ctx *fiber.Ctx) error {
	stid, err := ctx.ParamsInt("stid")

	if err != nil {
		return fiber.NewError(http.StatusNotFound, "Student id not found")
	}

	student, err := res.service.ReadApplicationWithPreload(uint(stid))

	if err != nil {
		return err
	}

	return ctx.Format(student)
}

func (res *controller) create(ctx *fiber.Ctx) error {
	
	body := ctx.Locals("body").(*Application)


	err := res.service.Create(ctx.UserContext(), body)

	if err != nil {
		return err
	}

	return ctx.SendStatus(http.StatusCreated)
}
