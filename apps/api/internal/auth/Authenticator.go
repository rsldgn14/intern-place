package auth

import (
	"intern-api/apps/api/configs"
	"intern-api/apps/api/internal/roles"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"gitlab.com/sincap/sincap-common/auth"
	"gitlab.com/sincap/sincap-common/auth/claims"
	"gitlab.com/sincap/sincap-common/logging"
	"go.uber.org/zap"
)

// Authenticator is a default authentication middleware to enforce access from the
// Verifier middleware request context values. The Authenticator sends a 401 Unauthorized
// response for any unverified tokens and passes the good ones through.
func Authenticator(rep Repository, allowedRoles ...uint) func(ctx *fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {

		// bypass auth for method types HEAD, OPTIONS and TRACE
		if ctx.Method() == "HEAD" || ctx.Method() == "OPTIONS" || ctx.Method() == "TRACE" {
			return ctx.Next()
		}
		dclaims, err := claims.FromToken(ctx.Locals("jwt").(*jwt.Token), configs.Instance.Auth.Secret)
		if err != nil {
			auth.InvalidateCookies(ctx, configs.Instance.Auth)
			return ctx.Status(401).SendString("invalid jwt token")
		}
		allowed := false

		if !rep.IsActive(dclaims.UserID) {
			auth.InvalidateCookies(ctx, configs.Instance.Auth)
			return ctx.Status(401).SendString("user is inactive")
		}

		if err := auth.CheckTokenOwnership(ctx, configs.Instance.Auth, dclaims); err != nil {
			logging.Logger.Warn("Token ownership error", zap.String("error", err.Error()), zap.String("headers", ctx.Request().Header.String()))
			auth.InvalidateCookies(ctx, configs.Instance.Auth)
			return ctx.Status(401).SendString("faulty token ownership")
		}
		if dclaims.RoleID != roles.ADMIN { //roles.AdminID
			for _, v := range allowedRoles {
				if v == dclaims.RoleID {
					allowed = true
					break
				}
			}
			if !allowed {
				return ctx.Status(http.StatusForbidden).SendString("user is not allowed")
			}
		}
		ctx.Locals("claims", dclaims)

		// if close to expiration give new token
		err = auth.RenewTokenIfNeeded(dclaims, ctx, configs.Instance.Auth)
		if err != nil {
			return err
		}
		return ctx.Next()
	}
}