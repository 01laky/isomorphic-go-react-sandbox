package model

import (
  "github.com/eaigner/hood"
  "time"
  "fmt"
  "goOne/server/config"
)

type User struct {
        Id    hood.Id
        Name  string
        Email string
        CreatedAt time.Time
        UpdatedAt time.Time
}

func connectDatabase() {

}

func CreateUser(user *User) (*User, error, string) {
  dbName, connectionConfig, err, errorType := configuration.BuildDbConnection()
  if err != nil {
        return nil, err, errorType
  }
  hd, err := hood.Open(dbName, connectionConfig)
  if err != nil {
        return nil, err, "database-connection-error"
  }
  id, err := hd.Save(user)
  if err != nil {
        return nil, err, "save-user-error"
  }
  var nextUser *User = &User{
    Id: id,
    Name: user.Name,
    Email: user.Email,
    CreatedAt: user.CreatedAt,
    UpdatedAt: user.UpdatedAt,
  }
  return nextUser, nil, ""
}
// (*User, error, string)
func GetUserById(id string) {
  dbName, connectionConfig, err, errorType := configuration.BuildDbConnection()
  if err != nil {
      fmt.Println("err???? => ", err)
      fmt.Println("errorType???? => ", errorType)
        // return nil, err, errorType
  }
  hd, err := hood.Open(dbName, connectionConfig)
  if err != nil {
      fmt.Println("err one???? => ", err)
        // return nil, err, "database-connection-error"
  }
  user := hd.Select("user")
  fmt.Println("SELECTED USER???? => ", user)
}
