package auth

import (
	"context"
	"intern-api/apps/api/configs"
	"intern-api/apps/api/internal/companies"
	"intern-api/apps/api/internal/roles"
	"intern-api/apps/api/internal/students"
	"intern-api/apps/api/internal/users"
	"time"

	"github.com/gofiber/fiber/v2"
	"gitlab.com/sincap/sincap-common/auth/claims"
	"gitlab.com/sincap/sincap-common/services"
)

type Service interface {
	Login(ctx context.Context, req *LoginReq, userAgent, ip string) (*users.User, *claims.EncryptedClaims, error)
	Register(ctx context.Context, req *RegisterReq, userAgent, ip string) (*users.User, error)
}
type service struct {
	repository  Repository
	usersRepo   users.Repository
	studentRepo students.Repository
	companyRepo companies.Repository
	
}

func AuthService(r Repository,
	userRepo users.Repository, studentRepo students.Repository, companyRepo companies.Repository) Service {
	return &service{r, userRepo, studentRepo,companyRepo}
}
func (ser *service) Login(ctx context.Context, req *LoginReq, userAgent, ip string) (*users.User, *claims.EncryptedClaims, error) {
	password := req.Password
	u, err := ser.usersRepo.FindByUsername(req.Username)
	if err != nil {
		return nil, nil, services.NewError(401, "Yanlış email veya şifre")
	}

	tx, err := ser.usersRepo.BeginTx(ctx)
	if err != nil {
		return nil, nil, fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	if u.Password != password {
		return nil, nil, services.NewError(401, "Yanlış email veya şifre")

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
		claimsExtras["StudentID"] = student.ID

	}else if u.RoleID == users.Role(roles.COMPANY) {
		company, err := ser.companyRepo.FindByUserID(u.ID)
		if err != nil || company == nil {
			tx.RollbackTx()
			return nil, services.NewError(500, "Company not found")
		}
		claimsExtras["CompanyID"] = company.ID
	
	}
	return claimsExtras, nil
}


func (ser *service) Register(ctx context.Context, req *RegisterReq, userAgent, ip string) (*users.User, error) {
	tx, err := ser.usersRepo.BeginTx(ctx)
	if err != nil {
		return nil, fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	u := users.User{
		UserName:  req.Username,
		FirstName: req.FirstName,
		LastName:  req.LastName,
		RoleID:    users.Role(req.Role),
		Password:  req.Password,
	}


	if _,err := tx.FindByUsername(u.UserName); err == nil {
		tx.RollbackTx()
		return nil, fiber.NewError(400, "Bu email adresi zaten kullanımda")
	}

	err = ser.usersRepo.Create(&u)
	if err != nil {
		tx.RollbackTx()
		return nil, fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	if req.Role == users.STUDENT {
		student := students.Student{
			UserID: u.ID,
		}
		err = ser.studentRepo.Create(&student)
		if err != nil {
			tx.RollbackTx()
			return nil, fiber.NewError(fiber.StatusInternalServerError, err.Error())
		}
	}else if req.Role == users.COMPANY {
		company := companies.Company{
			UserID: u.ID,
		}
		err = ser.companyRepo.Create(&company)
		if err != nil {
			tx.RollbackTx()
			return nil, fiber.NewError(fiber.StatusInternalServerError, err.Error())
		}
	}
	tx.CommitTx()
	return &u, nil
}
