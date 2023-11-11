package server

import (
	"intern-api/apps/api/internal/applications"
	"intern-api/apps/api/internal/companies"
	"intern-api/apps/api/internal/notices"
	"intern-api/apps/api/internal/sectors"
	"intern-api/apps/api/internal/students"

	"github.com/gofiber/fiber/v2"
	"gitlab.com/sincap/sincap-common/db"
)

func AddRoutes(app *fiber.App) {
	api := app.Group("/api", DefaultHeaders)

	public := api.Group("")
	authenticatedRoutes(api)
	publicRoutes(public)

}

func authenticatedRoutes(r fiber.Router) {
	adminRoutes(r)
	internRoutes(r)
	companyRoutes(r)

}

func publicRoutes(r fiber.Router) {

}

func adminRoutes(r fiber.Router) {
	admin := r.Group("/admin")
	sectors.SectorController(admin.Group("/sectors"), sectors.SectorService(sectors.SectorRepository(db.DB())))
	companies.CompanyAdminController(admin.Group("/companies"), companies.CompanyService(companies.CompanyRepository((db.DB()))))
	students.StudentAdminController(admin.Group("/students"), students.StudentService(students.StudentRepository(db.DB())))
	notices.NoticeAdminController(admin.Group("/notices"), notices.NoticeService(notices.NoticeRepository(db.DB())))
	applications.ApplicationAdminController(admin.Group("/applications"), applications.ApplicationService(applications.ApplicationRepository(db.DB())))
}

func internRoutes(r fiber.Router) {
	//intern := r.Group("/intern")
}

func companyRoutes(r fiber.Router) {
	//company := r.Group("/company")
}
