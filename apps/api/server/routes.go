package server

import (
	"github.com/gofiber/fiber/v2"
	"gitlab.com/sincap/sincap-common/db"
	"intern-api/apps/api/internal/sectors"
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

}

func internRoutes(r fiber.Router) {
	//intern := r.Group("/intern")
}

func companyRoutes(r fiber.Router) {
	//company := r.Group("/company")
}
