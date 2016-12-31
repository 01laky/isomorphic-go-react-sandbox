package main

import (
  // "fmt"
	"gopkg.in/labstack/echo.v1"
	// "encoding/json"
)

// Initial api
type API struct{}

// Bind attaches api routes
func (api *API) Bind(group *echo.Group) {
	group.Get("/v1/conf", api.ConfigHandler)
  BindRoutes(group)
}

// Frontend config handler
func (api *API) ConfigHandler(c *echo.Context) error {
	app := c.Get("app").(*App)
	c.JSON(200, app.Conf.Root)
	return nil
}
