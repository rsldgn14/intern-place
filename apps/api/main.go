package main

import (
	sincapConfig "gitlab.com/sincap/sincap-common/config"
	"gitlab.com/sincap/sincap-common/db"
	"gitlab.com/sincap/sincap-common/flags"
	"gitlab.com/sincap/sincap-common/logging"
	"go.uber.org/zap"
	"intern-api/apps/api/cmd/migrate"
	"intern-api/apps/api/configs"
	"intern-api/apps/api/server"
	"os"
)

func Hello(name string) string {
	result := "Hello " + name
	return result
}

func main() {

	fs, _ := flags.Parse(flags.Defaults...)
	err := fs.Parse(os.Args[1:])
	if err != nil {
		return
	}
	if fs.Lookup("config") == nil {
		logging.Logger.Fatal("Config file not declared")
	}

	command := fs.Lookup("command").Value.String()
	if err := sincapConfig.Load(fs.Lookup("config").Value.String(), configs.Instance); err != nil {
		logging.Logger.Fatal("App can not load configuration", zap.Error(err))
	}
	logging.Configure(configs.Instance.Log)
	db.Configure(configs.Instance.DB)
	migrate.AutoMigrate(command)

	server.Run()
}
