package configuration

import (
  "encoding/json"
  "os"
  // "fmt"
  "strings"
  "io/ioutil"
)

type GlobalConfig struct {
  DbConnect struct {
      DatabaseType    string `json:"databaseType"`
      UserName   string `json:"userName"`
      Password   string `json:"password"`
      DatabaseName   string `json:"databaseName"`
      Sslmode   string `json:"sslmode"`
  }
}

func getGlobalConfiguration() (*GlobalConfig, error)  {
  dir, _ := os.Getwd()
  raw, err := ioutil.ReadFile(dir + "/server/config/conf.json")
  globalConfiguration := new(GlobalConfig)
  if err != nil {
      return globalConfiguration, err
  }
  json.Unmarshal(raw, &globalConfiguration)
  return globalConfiguration, nil
}

func BuildDbConnection() (string, string, error, string) {
  globalConfiguration, err := getGlobalConfiguration()
  if err != nil {
    os.Exit(1)
    return "", "", err, "connection-config-decode-error"
  }
  dbConfiguration := globalConfiguration.DbConnect
  configContainer := []string{
    "user=", dbConfiguration.UserName,
    " password=", dbConfiguration.Password,
    " dbname=", dbConfiguration.DatabaseName,
    " sslmode=", dbConfiguration.Sslmode,
  }
  configString := strings.Join(configContainer, "")
  return "postgres", configString, nil, ""
}
