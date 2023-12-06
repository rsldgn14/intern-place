package students

import (
	"net/http"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gitlab.com/sincap/sincap-common/auth/claims"
	"gitlab.com/sincap/sincap-common/middlewares"
	"gitlab.com/sincap/sincap-common/middlewares/qapi"
)

type controller struct {
	service Service
}

func StudentAdminController(r fiber.Router, s Service) {
	res := controller{s}
	r.Get("/", middlewares.QApi, res.list)
	r.Get("/:stid", res.read)
	r.Post("/:stid", middlewares.BodyParserMap("body"), middlewares.ValidatorMap("body", Student{}), res.update)
}

func StudentController(r fiber.Router, s Service) {
	res := controller{s}
	r.Get("/useMe", res.useMe)
}

func (res *controller) list(ctx *fiber.Ctx) error {
	q := ctx.Locals("qapi").(*qapi.Query)

	students, count, err := res.service.List(ctx.UserContext(), q, "User")

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

	student, err := res.service.ReadStudentWithPreloads(uint(stid))

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


func (res *controller) useMe(ctx *fiber.Ctx) error {
	claims := ctx.Locals("claims").(*claims.DecryptedClaims)

	student := claims.Extra["Student"].(*Student)

	result,err := res.service.Read(ctx.UserContext(),student.ID);

	if err != nil {
		return err
	}

	return ctx.Format(result)
}