package jwt

import (
	"intern-api/apps/api/configs"

	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v2"
	"github.com/golang-jwt/jwt/v4"
	"gitlab.com/sincap/sincap-common/auth/claims"
	"gitlab.com/sincap/sincap-common/random"
)

func JWT() []interface{} {
	secret := configs.Instance.Auth.Secret
	if secret == "*" {
		secret = random.GetString()
		configs.Instance.Auth.Secret = secret
	}
	signKey := configs.Instance.Auth.SignKey
	if signKey == "*" {
		signKey = random.GetString()
		configs.Instance.Auth.SignKey = signKey
	}
	return []interface{}{
		jwtware.New(jwtware.Config{
			SigningKey:   []byte(secret),
			ErrorHandler: jwtErrorHandlerHeader,
			ContextKey:   "jwt",
			TokenLookup:  "header:Authorization",
		}),
		jwtware.New(jwtware.Config{
			SigningKey:   []byte(secret),
			ErrorHandler: jwtErrorHandler,
			ContextKey:   "jwt",
			TokenLookup:  "cookie:jwt",
		})}
}

func jwtErrorHandler(ctx *fiber.Ctx, err error) error {
	if ctx.Locals("jwt") != nil {
		return ctx.Next()
	}
	return ctx.Status(fiber.StatusUnauthorized).SendString("Invalid jwt")
}

func jwtErrorHandlerHeader(ctx *fiber.Ctx, err error) error {
	jwtcookie := ctx.Cookies("jwt", "")

	if len(jwtcookie) >= 0 {
		return ctx.Next()

	}
	if err.Error() == "Missing or malformed JWT" {
		return ctx.Status(fiber.StatusUnauthorized).SendString("Invalid jwt")
	}
	return ctx.Next()
}

func JwtSetCookie(ctx *fiber.Ctx, claims *claims.EncryptedClaims) error {

	token := jwt.New(jwt.SigningMethodHS256)
	token.Claims = claims

	tokenString, err := token.SignedString([]byte(configs.Instance.Auth.Secret))

	if err != nil {
		return err
	}

	ctx.Cookie(&fiber.Cookie{
		Name:     "jwt",
		Value:    tokenString,
		Path:     "/",
		Domain:   configs.Instance.Auth.Domain,
		MaxAge:   int(configs.Instance.Auth.Timeout),
		Secure:   configs.Instance.Auth.Secure,
		HTTPOnly: configs.Instance.Auth.HTTPOnly,
		SameSite: fiber.CookieSameSiteLaxMode,
	})
	ctx.Cookie(&fiber.Cookie{
		Name:     "loggedin",
		Value:    "true",
		Path:     "/",
		Domain:   configs.Instance.Auth.Domain,
		MaxAge:   int(configs.Instance.Auth.Timeout),
		SameSite: fiber.CookieSameSiteLaxMode,
	})

	return nil

}
