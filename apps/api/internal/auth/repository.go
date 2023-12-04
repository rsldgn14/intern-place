package auth

import (
	"context"
	"intern-api/apps/api/internal/users"
	"strings"

	"gitlab.com/sincap/sincap-common/logging"
	"gitlab.com/sincap/sincap-common/repositories"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type Repository interface {
	BeginTx(ctx context.Context) (Repository, error)
	RollbackTx() error
	CommitTx() error
	IsActive(id uint) bool
	IsUserExist(email string) bool
}

type repository struct {
	repositories.GormRepository[users.User]
}

func NewRepository(db *gorm.DB) Repository {
	return &repository{repositories.NewGormRepository[users.User](db)}
}

func (rep *repository) BeginTx(ctx context.Context) (Repository, error) {
	var tx = rep.DB.WithContext(ctx).Begin()
	repTx := NewRepository(tx)
	return repTx, tx.Error
}

func (rep *repository) RollbackTx() error {
	return rep.DB.Rollback().Error
}
func (rep *repository) CommitTx() error {
	return rep.DB.Commit().Error
}

func (rep *repository) IsActive(id uint) bool {
	var user int64
	if res := rep.DB.Table("User").Where("ID=? AND IsActive=?", id, true).Count(&user); res.Error != nil {
		logging.Logger.Error("Read error", zap.Any("Model", "User"), zap.Error(res.Error), zap.Uint("id", id), zap.Uint("userID", id))
		return false
	}
	return user == 1
}

func (rep *repository) IsUserExist(email string) bool {
	var userCount int64
	if result := rep.DB.Table("User").Where("LOWER(Username)=?", strings.ToLower(email)).Count(&userCount); result.Error != nil {
		logging.Logger.Info("Username doesn't exist in system.", zap.String("username", email))
	}

	if userCount <= 0 {
		return false
	}

	return true
}
