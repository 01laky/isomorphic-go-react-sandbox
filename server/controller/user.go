package controller

import (
	"gopkg.in/labstack/echo.v1"
  "goOne/server/model"
)

func CreateUser(context *echo.Context) {
  user := new(model.User)
	err := context.Bind(user)
  if err != nil {
        context.JSON(500, "request-error")
  }
  createdUser, err := model.CreateUser(user)
  if err != nil {
        context.JSON(500, "create-user-parse-error")
  }
  context.JSON(200, createdUser)
}

func GetUser(context *echo.Context) {
  id := context.Param("id")
	requestedUser, err := model.GetUserById(id)
  if err != nil {
        context.JSON(500, "create-user-parse-error")
  }
  context.JSON(200, requestedUser)
}

func GetAllUsers(context *echo.Context) {
	requestedUsers, err := model.GetAllUsers()
  if err != nil {
        context.JSON(500, "create-user-parse-error")
  }
  context.JSON(200, requestedUsers)
}

func UpdateUser(context *echo.Context) {
	id := context.Param("id")
	user := new(model.User)
	err := context.Bind(user)
	if err != nil {
				context.JSON(500, "request-error")
	}
	updatedUser, err := model.UpdateUser(user, id)
	if err != nil {
        context.JSON(500, "create-user-parse-error")
  }
  context.JSON(200, updatedUser)
}
