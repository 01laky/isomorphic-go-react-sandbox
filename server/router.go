package main

import (
  "fmt"
	"gopkg.in/labstack/echo.v1"
	// "encoding/json"
  // "time"
  "goOne/server/auth"
  "goOne/server/controller"
  // "fmt"
)

func BindRoutes(group *echo.Group) {
  userRoutes(group)
}

func userRoutes(group *echo.Group) {
  fmt.Println("ROUTER HANDLE ???")
  group.Post("/user", func(context *echo.Context) error {
    controller.CreateUser(context)
    return nil
  })
  group.Post("/register", func(context *echo.Context) error {
    auth.ReqisterUser(context)
    return nil
  })
  group.Get("/user", func(context *echo.Context) error {
    controller.GetAllUsers(context)
    return nil
  })
  group.Get("/user/:id", func(context *echo.Context) error {
    controller.GetUser(context)
    return nil
  })
  group.Patch("/user/:id", func(context *echo.Context) error {
    controller.UpdateUser(context)
    return nil
  })
}
