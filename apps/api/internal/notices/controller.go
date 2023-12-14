package notices

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

func NoticeAdminController(r fiber.Router, s Service) {
	res := controller{s}
	r.Get("/", middlewares.QApi, res.list)
	r.Get("/:nid", res.read)
	r.Post("/:nid", middlewares.BodyParserMap("body"), middlewares.ValidatorMap("body", Notice{}), res.update)
	r.Patch("/:nid/approve", res.approve)
	r.Patch("/:nid/reject", res.reject)
}

func NoticeCompanyController(r fiber.Router, s Service) {
	res := controller{s}
	r.Post("/", middlewares.BodyParser[Notice]("body"), middlewares.Validator("body"), res.create)
	r.Get("/mine", middlewares.QApi, res.myNotices)
	r.Patch("/:nid/publish", res.publish)
	r.Patch("/:nid/unpublish", res.unPublish)

}

//TO-DO: Add NoticeStudentController for apply notice
// func NoticeStudentController(r fiber.Router, s Service) {
// 	res := controller{s}
// 	r.Get("/", middlewares.QApi, res.list)
// 	r.Get("/:nid", res.read)
// }

func (res *controller) create(ctx *fiber.Ctx) error {
	body := ctx.Locals("body").(*Notice)

	claims := ctx.Locals("claims").(*claims.DecryptedClaims)
	companyID,ok := claims.Extra["CompanyID"].(float64)

	if !ok {
		return fiber.NewError(http.StatusNotFound, "Student id not found")

	}

	body.CompanyID = uint(companyID)

	if err := res.service.Create(ctx.UserContext(), body); err != nil {
		return err

	}	

	return ctx.SendStatus(fiber.StatusNoContent)
}

func NoticePublicController(r fiber.Router, s Service) {
	res := controller{s}
	r.Get("/", middlewares.QApi, res.list)
	r.Get("/:nid", res.read)
	r.Patch("/:nid/increase-view-count", res.increaseViewCount)
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


func (res *controller) increaseViewCount(ctx *fiber.Ctx) error { 
	stid, err := ctx.ParamsInt("nid")

	if err != nil {

		return err
	}

	if err := res.service.IncreaseViewCount(uint(stid)); err != nil {
		return err
	}

	return ctx.SendStatus(fiber.StatusNoContent)


}

func (res *controller) myNotices(ctx *fiber.Ctx) error {
	claims := ctx.Locals("claims").(*claims.DecryptedClaims)
	companyID,ok := claims.Extra["CompanyID"].(float64)

	if !ok {
		return fiber.NewError(http.StatusNotFound, "Company id not found")
	}

	notices, err := res.service.MyNotices(uint(companyID))

	if err != nil {
		return err
	}

	return ctx.Format(notices)

}

func (res *controller) approve(ctx *fiber.Ctx) error { 

	stid, err := ctx.ParamsInt("nid")

	if err != nil {

		return err
	}

	if err := res.service.Approve(uint(stid)); err != nil {
		return err
	}

	return ctx.SendStatus(fiber.StatusNoContent)

}

func (res *controller) reject(ctx *fiber.Ctx) error { 

	stid, err := ctx.ParamsInt("nid")

	if err != nil {

		return err
	}

	if err := res.service.Reject(uint(stid)); err != nil {
		return err
	}

	return ctx.SendStatus(fiber.StatusNoContent)

}


func (res *controller) publish(ctx *fiber.Ctx) error {
	stid, err := ctx.ParamsInt("nid")

	if err != nil {

		return err
	}

	if err := res.service.Publish(uint(stid)); err != nil {
		return err
	}

	return ctx.SendStatus(fiber.StatusNoContent)

}

func (res *controller) unPublish(ctx *fiber.Ctx) error {
	stid, err := ctx.ParamsInt("nid")

	if err != nil {

		return err
	}

	if err := res.service.Unpublish(uint(stid)); err != nil {
		return err
	}

	return ctx.SendStatus(fiber.StatusNoContent)

}