package users

import (
	"context"

	"gitlab.com/sincap/sincap-common/repositories"
	"gorm.io/gorm"
)

type Repository interface {
	repositories.Repository[User]
	FindByUsername(username string) (*User, error)
	BeginTx(ctx context.Context) (Repository, error)
	RollbackTx() error
	CommitTx() error
}
type repository struct {
	repositories.GormRepository[User]
}

func StudentRepository(db *gorm.DB) Repository {

	return &repository{repositories.NewGormRepository[User](db)}

}

func (rep *repository) FindByUsername(username string) (*User, error) {
	user := User{}
	if res := rep.DB.Model(User{}).Where("LOWER(Username)=?", username).First(&user); res.Error != nil {
		return nil, res.Error
	}
	return &user, nil
}
func (rep *repository) AutoTx(cb func() error) error {
	if err := cb(); err != nil {
		rep.DB.Rollback()
		return err
	}
	return rep.DB.Commit().Error
}

func (rep *repository) BeginTx(ctx context.Context) (Repository, error) {
	var tx = rep.DB.WithContext(ctx).Begin()
	repTx := StudentRepository(tx)
	return repTx, tx.Error
}

func (rep *repository) RollbackTx() error {
	return rep.DB.Rollback().Error
}
func (rep *repository) CommitTx() error {
	return rep.DB.Commit().Error
}
