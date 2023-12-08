package applications

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

func ApplicationAdminController(r fiber.Router, s Service) {
	res := controller{s}
	r.Get("/", middlewares.QApi, res.list)
	r.Get("/:sid", res.read)
}

func ApplicationStudentController(r fiber.Router, s Service) {
	res := controller{s}
	r.Post("/", middlewares.BodyParser[Application]("body") ,res.create)
	r.Get("/mine", res.getStudentApplications)
}

func ApplicationCompanyController(r fiber.Router, s Service) {
	res := controller{s}
	r.Get("/mine", res.getCompanyApplications)
	r.Patch("/:stid/approve", res.approve)
	r.Patch("/:stid/reject", res.reject)
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
	claims := ctx.Locals("claims").(*claims.DecryptedClaims)

	studentID,ok := claims.Extra["StudentID"].(float64)

	
	if !ok {
		return fiber.NewError(http.StatusNotFound, "Student id not found")

	}

	body.StudentID = uint(studentID)


	err := res.service.Create(ctx.UserContext(), body)

	if err != nil {
		return err
	}

	return ctx.SendStatus(http.StatusNoContent)
}


func (res *controller) getStudentApplications(ctx *fiber.Ctx) error {
	
	claims := ctx.Locals("claims").(*claims.DecryptedClaims)

	studentID,ok := claims.Extra["StudentID"].(float64)


	if !ok {
		return fiber.NewError(http.StatusNotFound, "Student id not found")

	}


	applications, err := res.service.GetStudentApplications(uint(studentID))

	if err != nil {
		return err
	}

	return ctx.Format(applications)
}


func (res *controller) getCompanyApplications(ctx *fiber.Ctx) error {
	claims := ctx.Locals("claims").(*claims.DecryptedClaims)
	companyID,ok := claims.Extra["CompanyID"].(float64)

	if !ok {
		return fiber.NewError(http.StatusNotFound, "Student id not found")

	}
	applications, err := res.service.GetCompanyApplications(uint(companyID))

	if err != nil {
		return err
	}

	return ctx.Format(applications)

}

func (res *controller) approve(ctx *fiber.Ctx) error {
	appid, err := ctx.ParamsInt("stid")

	if err != nil {
		return err
	}

	claims := ctx.Locals("claims").(*claims.DecryptedClaims)
	companyID,ok := claims.Extra["CompanyID"].(float64)

	if !ok {
		return fiber.NewError(http.StatusNotFound, "Student id not found")

	}

	if err := res.service.Approve(uint(appid),uint(companyID));err != nil {
		return err
	}

	return ctx.SendStatus(http.StatusNoContent)
}


func (res *controller) reject(ctx *fiber.Ctx) error {
	appid, err := ctx.ParamsInt("stid")

	if err != nil {
		return err
	}

	claims := ctx.Locals("claims").(*claims.DecryptedClaims)
	companyID,ok := claims.Extra["CompanyID"].(float64)

	if !ok {
		return fiber.NewError(http.StatusNotFound, "Student id not found")

	}

	if err := res.service.Reject(uint(appid),uint(companyID));err != nil {
		return err
	}

	return ctx.SendStatus(http.StatusNoContent)

	}