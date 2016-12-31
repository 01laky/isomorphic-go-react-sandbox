package model

import (
  "encoding/json"
  "os"
  "fmt"
  "strings"
  "io/ioutil"
)

type Configuration struct {
    databaseType    string `json:"databaseType"`
    userName   string `json:"userName"`
    password   string `json:"password"`
    databaseName   string `json:"databaseName"`
    sslmode   string `json:"sslmode"`
}

func getConfiguration() (Configuration, error)  {
  fmt.Println("OB BEGIN CONF")
  raw, err := ioutil.ReadFile("./model/conf.json")
  var configuration Configuration
  fmt.Println("configuration => 1 ", raw)
  fmt.Println("configuration => 2 ", configuration)
  fmt.Println("configuration => 3 ", err)
  if err != nil {
      return configuration, err
  }
  json.Unmarshal(raw, &configuration)
  fmt.Println("configuration => 4 ", configuration)
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
    "user=", configuration.userName,
    " password=", configuration.password,
    " dbname=", configuration.databaseName,
    " sslmode=", configuration.sslmode,
  }
  fmt.Println("BASE CONFIG CONTAINER => ", configContainer)
  configString := strings.Join(configContainer, "")
  fmt.Println("BUILDED CONFIG STRING => ", configString)
  return "postgres", configString, nil, ""
}
