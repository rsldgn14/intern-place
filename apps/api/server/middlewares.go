package server

import (
	fiber "github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	"gitlab.com/sincap/sincap-common/logging"
	"gitlab.com/sincap/sincap-common/resources/middlewares"
	"gitlab.com/sincap/sincap-common/server"
	"gitlab.com/sincap/sincap-common/services"
	"go.uber.org/zap"
)

func AddDefaultMiddlewares(r fiber.Router, config server.Config) {
	r.Use(requestid.New())
	r.Use(logger.New())
	r.Use(recover.New())

	logger := logging.Logger.Named("Server")

	if config.Cors == nil {
		config.Cors = &cors.ConfigDefault
		config.Cors.AllowCredentials = true
		config.Cors.AllowHeaders = "Content-Type, X-Total-Count, X-Username"
		config.Cors.ExposeHeaders = "X-Total-Count"
		config.Cors.AllowOrigins = "*"
	}
	if config.Cors.AllowOrigins == "*" {
		config.Cors.AllowOriginsFunc = func(origin string) bool {
			return true
		}
	}
	logger.Info("Adding CORS", zap.Any("config", config.Cors.AllowOrigins))
	cors := cors.New(*config.Cors)
	r.Use(cors)

	if config.SecurityHeaders {
		logging.Logger.Named("Server").Info("Adding SecurityHeaders")
		r.Use(middlewares.SecurityHeaders)
	}
}

func ErrorHandler(ctx *fiber.Ctx, err error) error {
	// Statuscode defaults to 500
	code := fiber.StatusInternalServerError

	if e, ok := err.(*services.Error); ok && e != nil {
		return ctx.Status(e.Code).Format(e)
	}

	// Retrieve the custom statuscode if it's an fiber.*Error
	if e, ok := err.(*fiber.Error); ok {
		code = e.Code
	}

	// Send custom error page
	err = ctx.Status(code).Format(err)
	if err != nil {
		ctx.Status(500).SendString("Internal Server Error")
	}
	return nil
}

func DefaultHeaders(ctx *fiber.Ctx) error {
	acc := ctx.Get("Accept", "*/*")
	if acc == "*/*" {
		ctx.Request().Header.Set("Accept", "application/json")
	}
	return ctx.Next()
}
