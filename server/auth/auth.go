package auth

import (
  "goOne/server/config"
  "fmt"
  _ "github.com/jinzhu/gorm/dialects/postgres"
  "encoding/json"
)

func ReqisterUser(context *echo.Context) {
  ORM, err := configuration.CreateConnection()
  user := new(model.User)
	err := context.Bind(user)
  if err != nil {
        context.JSON(500, err)
  }
  fmt.Println("POSTED USER => ", user)
  ORM.Where("email = ?", user.Email).First(&user)
  if user.ID {
    context.JSON(500, "User already exist!!!")
  }
  user := new(model.User)
  err := context.Bind(user)
  if err != nil {
        context.JSON(500, err)
  }
  createdUser, err := model.CreateUser(user)
  if err != nil {
        context.JSON(500, err)
  }
  context.JSON(200, createdUser)
}
