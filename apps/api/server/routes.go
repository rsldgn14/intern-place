package server

import (
	"github.com/gofiber/fiber/v2"
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
	//admin := r.Group("/admin")

}

func internRoutes(r fiber.Router) {
	//intern := r.Group("/intern")
}

func companyRoutes(r fiber.Router) {
	//company := r.Group("/company")
}
