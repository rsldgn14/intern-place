package server

import (
	"intern-api/apps/api/internal/applications"
	"intern-api/apps/api/internal/auth"
	"intern-api/apps/api/internal/companies"
	"intern-api/apps/api/internal/images"
	"intern-api/apps/api/internal/notices"
	"intern-api/apps/api/internal/roles"
	"intern-api/apps/api/internal/sectors"
	"intern-api/apps/api/internal/students"
	"intern-api/apps/api/internal/users"
	"intern-api/apps/api/jwt"

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
	studentRoutes(r)
	companyRoutes(r)
	userRoutes(r)

}

func publicRoutes(r fiber.Router) {
	public := r.Group("/public")
	notices.NoticePublicController(public.Group("/notices"), notices.NoticeService(notices.NoticeRepository(db.DB())))
	sectors.SectorPublicControler(public.Group("/sectors"), sectors.SectorService(sectors.SectorRepository(db.DB())))
	auth.AuthController(public.Group("/auth"), auth.AuthService(auth.AuthRepository(db.DB()), users.UserRepository(db.DB()), students.StudentRepository(db.DB()), companies.CompanyRepository(db.DB())))
	students.StudentPublicController(public.Group("/students"), students.StudentService(students.StudentRepository(db.DB())))
	companies.CompanyPublicController(public.Group("/companies"), companies.CompanyService(companies.CompanyRepository((db.DB()))))
	images.ImagePublicController(public.Group("/images"), images.ImageService(images.ImageRepository(db.DB())))
}

func adminRoutes(r fiber.Router) {
	admin := r.Group("/admin")
	sectors.SectorController(admin.Group("/sectors"), sectors.SectorService(sectors.SectorRepository(db.DB())))
	companies.CompanyAdminController(admin.Group("/companies"), companies.CompanyService(companies.CompanyRepository((db.DB()))))
	students.StudentAdminController(admin.Group("/students"), students.StudentService(students.StudentRepository(db.DB())))
	notices.NoticeAdminController(admin.Group("/notices"), notices.NoticeService(notices.NoticeRepository(db.DB())))
	applications.ApplicationAdminController(admin.Group("/applications"), applications.ApplicationService(applications.ApplicationRepository(db.DB())))
}

func studentRoutes(r fiber.Router) {
	student := r.Group("/students").Use(jwt.JWT()...)
	student.Use(auth.Authenticator(auth.AuthRepository(db.DB()), roles.STUDENT))
	students.StudentController(student.Group("/students"), students.StudentService(students.StudentRepository(db.DB())))
	applications.ApplicationStudentController(student.Group("/applications"), applications.ApplicationService(applications.ApplicationRepository(db.DB())))
}

func companyRoutes(r fiber.Router) {
	company := r.Group("/companies").Use(jwt.JWT()...)
	company.Use(auth.Authenticator(auth.AuthRepository(db.DB()), roles.COMPANY))
	applications.ApplicationCompanyController(company.Group("/applications"), applications.ApplicationService(applications.ApplicationRepository(db.DB())))
	companies.CompanyController(company, companies.CompanyService(companies.CompanyRepository((db.DB()))))
	notices.NoticeCompanyController(company.Group("/notices"), notices.NoticeService(notices.NoticeRepository(db.DB())))
}

func userRoutes(r fiber.Router) {
	user := r.Group("/users").Use(jwt.JWT()...)
	user.Use(auth.Authenticator(auth.AuthRepository(db.DB()), roles.STUDENT, roles.COMPANY, roles.ADMIN))
	users.UserController(user, users.UserService(users.UserRepository(db.DB())))
}
