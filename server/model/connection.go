package model

import (
  "encoding/json"
  "os"
  "fmt"
  "strings"
  "io/ioutil"
)

type Configuration struct {
    DatabaseType    string `json:"databaseType"`
    UserName   string `json:"userName"`
    Password   string `json:"password"`
    DatabaseName   string `json:"databaseName"`
    Sslmode   string `json:"sslmode"`
}

func getConfiguration() (*Configuration, error)  {
  dir, _ := os.Getwd()
  fmt.Println(dir)
  raw, err := ioutil.ReadFile(dir + "/server/model/conf.json")
  configuration := new(Configuration)
  if err != nil {
      return configuration, err
  }
  json.Unmarshal(raw, &configuration)
  return configuration, nil
}



func BuildConnectionConfig() (string, string, error, string) {
  configuration, err := getConfiguration()
  if err != nil {
    os.Exit(1)
    return "", "", err, "connection-config-decode-error"
  }
  fmt.Println("configuration => ", configuration)
  configContainer := []string{
    "user=", configuration.UserName,
    " password=", configuration.Password,
    " dbname=", configuration.DatabaseName,
    " sslmode=", configuration.Sslmode,
  }
  configString := strings.Join(configContainer, "")
  return "postgres", configString, nil, ""
}
