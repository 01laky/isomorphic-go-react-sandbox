package configuration

import (
  "encoding/json"
  "os"
  "fmt"
  "io/ioutil"
  "github.com/jinzhu/gorm"
  _ "github.com/jinzhu/gorm/dialects/postgres"
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

var (DB *gorm.DB)

func getGlobalConfiguration() (*GlobalConfig, error)  {
  dir, _ := os.Getwd()
  raw, err := ioutil.ReadFile(dir + "/server/config/connectionConfig.json")
  globalConfiguration := new(GlobalConfig)
  if err != nil {
      return globalConfiguration, err
  }
  json.Unmarshal(raw, &globalConfiguration)
  return globalConfiguration, nil
}

func CreateConnection() (*gorm.DB, error) {
  globalConfiguration, err := getGlobalConfiguration()
  config := globalConfiguration.DbConnect
  conectionInfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=%s",
    config.UserName, config.Password, config.DatabaseName, config.Sslmode)
  DB, err = gorm.Open(config.DatabaseType, conectionInfo)
  if err != nil {
    return nil, err
  }
  return DB, nil
}
