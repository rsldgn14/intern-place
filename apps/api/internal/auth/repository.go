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
	IsUserExist(email string) bool
}

type repository struct {
	repositories.GormRepository[users.User]
}

func AuthRepository(db *gorm.DB) Repository {
	return &repository{repositories.NewGormRepository[users.User](db)}
}

func (rep *repository) BeginTx(ctx context.Context) (Repository, error) {
	var tx = rep.DB.WithContext(ctx).Begin()
	repTx := AuthRepository(tx)
	return repTx, tx.Error
}

func (rep *repository) RollbackTx() error {
	return rep.DB.Rollback().Error
}
func (rep *repository) CommitTx() error {
	return rep.DB.Commit().Error
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
