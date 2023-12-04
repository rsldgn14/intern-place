package auth

import (
	"context"
	"intern-api/apps/api/configs"
	"intern-api/apps/api/internal/roles"
	"intern-api/apps/api/internal/students"
	"intern-api/apps/api/internal/users"
	"time"

	"github.com/gofiber/fiber/v2"
	"gitlab.com/sincap/sincap-common/auth/claims"
	"gitlab.com/sincap/sincap-common/logging"
	"gitlab.com/sincap/sincap-common/services"
	"go.uber.org/zap"
)

type Service interface {
	Login(ctx context.Context, req *LoginReq, userAgent, ip string) (*users.User, *claims.EncryptedClaims, error)
}
type service struct {
	repository  Repository
	usersRepo   users.Repository
	studentRepo students.Repository
}

func NewService(r Repository,
	userRepo users.Repository, studentRepo students.Repository) Service {
	return &service{r, userRepo, studentRepo}
}
func (ser *service) Login(ctx context.Context, req *LoginReq, userAgent, ip string) (*users.User, *claims.EncryptedClaims, error) {
	password := req.Password
	u, err := ser.usersRepo.FindByUsername(req.Username)
	if err != nil {
		return nil, nil, services.NewError(401, "Wrong email or password")
	}

	tx, err := ser.usersRepo.BeginTx(ctx)
	if err != nil {
		return nil, nil, fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	if u.Password != password {
		return nil, nil, services.NewError(401, "Wrong email or password")

	}
	if err := tx.Update(u); err != nil {
		logging.Logger.Warn("Can't update success login user", zap.String("username", u.UserName))
		tx.RollbackTx()
		return nil, nil, services.NewError(500, err)
	}

	// create claims extras
	// check if user has coach role
	// check if user has sporter role
	claimsExtras, err := fillExtras(u, ser, tx)
	if err != nil {
		return u, nil, err
	}

	dclaims := claims.DecryptedClaims{
		UserID:    u.ID,
		Username:  u.UserName,
		RoleID:    uint(u.RoleID),
		ExpiresAt: configs.Instance.Auth.Timeout + time.Now().UTC().Unix(),
		UserAgent: userAgent,
		UserIP:    ip,
		Extra:     claimsExtras,
	}
	eclaims, err := dclaims.Encrypt(configs.Instance.Auth.Secret)
	if err != nil {
		tx.RollbackTx()
		return nil, nil, services.NewError(500, err)
	}
	tx.CommitTx()
	return u, eclaims, nil
}

func fillExtras(u *users.User, ser *service, tx users.Repository) (map[string]interface{}, error) {
	claimsExtras := map[string]interface{}{
		"FullName": u.FirstName + " " + u.LastName,
	}
	//TODO:add necessary extras

	if u.RoleID == users.Role(roles.STUDENT) {
		student, err := ser.studentRepo.FindByUserID(u.ID)
		if err != nil || student == nil {
			tx.RollbackTx()
			return nil, services.NewError(500, "Student not found")
		}
		claimsExtras["Student"] = student

	}
	return claimsExtras, nil
}
