package configs

import (
	sincapcfg "gitlab.com/sincap/sincap-common/config"
)

type Config struct {
	sincapcfg.Config
}

var Instance = &Config{}
