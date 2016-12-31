package controller

import (
	"gopkg.in/labstack/echo.v1"
  "encoding/json"
  "goOne/server/logger"
  "goOne/server/model"
  "fmt"
)

func CreateUser(context *echo.Context) {
  user := new(model.User)
  if err := context.Bind(user); err != nil {
        logger.LogError(err, "request-error")
        context.JSON(500, "request-error")
  }
  createdUser, err, errorType := model.CreateUser(user)
  if err != nil {
        logger.LogError(err, errorType)
        context.JSON(500, errorType)
  }
  jsonUser, err := json.Marshal(createdUser)
  if err != nil {
        logger.LogError(err, "parse-error")
        context.JSON(500, "parse-error")
  }
  context.JSON(200, string(jsonUser))
}

func GetUser(context *echo.Context) {
  id := context.Param("id")
  fmt.Println("CONTROLLER ID => ", id)
  model.GetUserById(id)
}
