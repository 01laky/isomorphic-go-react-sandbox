package main

import (
  // "fmt"
	"gopkg.in/labstack/echo.v1"
	"encoding/json"
  "github.com/eaigner/hood"
  "time"
  "goOne/server/controller"
  // "fmt"
)

type User struct {
        Id    hood.Id
        Name  string
        Email string
        CreatedAt time.Time
        UpdatedAt time.Time
}

type Test struct {
        Aaaa string
};

func BindRoutes(group *echo.Group) {
  group.Get("/first-get", First)
  userRoutes(group)
}

func userRoutes(group *echo.Group) {
  group.Post("/user", func(context *echo.Context) error {
    controller.CreateUser(context)
    return nil
  })
  group.Get("/user/:id", func(context *echo.Context) error {
    controller.GetUser(context)
    return nil
  })
}

func First(c *echo.Context) error {
  hd, err := hood.Open("postgres", "user=laky password=passpass dbname=demo sslmode=disable")
  if err != nil {
        panic(err)
  }
  var person *User = &User{
    Name: "pavla",
    Email: "pavla@smidova.com",
    CreatedAt: time.Now(),
    UpdatedAt: time.Now(),
  }
  hd.Save(person)
  b, err := json.Marshal(person)
  if err != nil {
        panic(err)
    }
	c.JSON(200, string(b))
	return nil
}
