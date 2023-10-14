package main

import (
	"fmt"
	"gitlab.com/sincap/sincap-common/flags"
	"gitlab.com/sincap/sincap-common/logging"
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
	fmt.Println(Hello("api"))
}
