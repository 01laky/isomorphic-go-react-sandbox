package auth

import (
  "goOne/server/config"
  "fmt"
  "gopkg.in/labstack/echo.v1"
  "goOne/server/model"
  _ "github.com/jinzhu/gorm/dialects/postgres"
  // "encoding/json"
)

func ReqisterUser(context *echo.Context) {
  ORM, err := configuration.CreateConnection()
  user := new(model.User)
	context.Bind(user)
  fmt.Println("POSTED USER => ", user)
  ORM.Where("email = ?", user.Email).First(&user)
  if user.ID > 0 {
    context.JSON(500, "User already exist!!!")
  }
  newUser := new(model.User)
  context.Bind(user)
  createdUser, err := model.CreateUser(newUser)
  if err != nil {
        context.JSON(500, err)
  }
  context.JSON(200, createdUser)
}
