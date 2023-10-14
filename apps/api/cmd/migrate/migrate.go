package migrate

import (
	"gitlab.com/sincap/sincap-common/db"
	"gitlab.com/sincap/sincap-common/db/util"
	"intern-api/apps/api/configs"
	"intern-api/apps/api/internal/users"
)

func AutoMigrate(command string) {
	util.AutoMigrate(command, configs.Instance.DB[0], db.DB(), models...)
}

var models = []interface{}{
	&users.User{},
}
