package roles

type Role struct {
	ID   uint   `gorm:"primary_key"`
	Name string `gorm:"unique"`
}

const (
	ADMIN   uint = 1
	COMPANY uint = 2
	STUDENT uint = 3
)
