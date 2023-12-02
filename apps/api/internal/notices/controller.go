package notices

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

func NoticeAdminController(r fiber.Router, s Service) {
	res := controller{s}
	r.Get("/", middlewares.QApi, res.list)
	r.Get("/:nid", res.read)
	r.Post("/:nid", middlewares.BodyParserMap("body"), middlewares.ValidatorMap("body", Notice{}), res.update)
}

//TO-DO: Add NoticeStudentController for apply notice
// func NoticeStudentController(r fiber.Router, s Service) {
// 	res := controller{s}
// 	r.Get("/", middlewares.QApi, res.list)
// 	r.Get("/:nid", res.read)
// }

func NoticePublicController(r fiber.Router, s Service) {
	res := controller{s}
	r.Get("/", middlewares.QApi, res.list)
	r.Get("/:nid", res.read)
}

func (res *controller) list(ctx *fiber.Ctx) error {
	q := ctx.Locals("qapi").(*qapi.Query)

	students, count, err := res.service.List(ctx.UserContext(), q, "Sector", "Company")

	if err != nil {
		return err

	}

	ctx.Set("X-Total-Count", strconv.FormatInt(int64(count), 10))
	return ctx.Format(students)
}

func (res *controller) read(ctx *fiber.Ctx) error {
	stid, err := ctx.ParamsInt("nid")

	if err != nil {
		return fiber.NewError(http.StatusNotFound, "Notice id not found")
	}

	student, err := res.service.ReadNoticeWithPreloads(uint(stid))

	if err != nil {
		return err
	}

	return ctx.Format(student)
}

func (res *controller) update(ctx *fiber.Ctx) error {
	stid, err := ctx.ParamsInt("nid")

	if err != nil {

		return err
	}

	body := ctx.Locals("body").(*map[string]interface{})

	if err := res.service.Update(ctx.UserContext(), "Notice", uint(stid), *body); err != nil {
		return err
	}

	return ctx.SendStatus(fiber.StatusNoContent)
}
