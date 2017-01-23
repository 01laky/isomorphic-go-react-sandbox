package model

import (
  "goOne/server/config"
  "github.com/jinzhu/gorm"
  _ "github.com/jinzhu/gorm/dialects/postgres"
  "encoding/json"
)

type User struct {
        gorm.Model
        Name  string
        Email string
}

func CreateUser(user *User) (string, error) {
  db, err := configuration.CreateConnection()
  if err != nil {
    return "", err
  }
  db.Create(&user)
  jsonUser, err := json.Marshal(user)
  if err != nil {
    return "", err
  }
  return string(jsonUser), nil
}

func GetUserById(id string) (string, error) {
  db, err := configuration.CreateConnection()
  if err != nil {
    return "", err
  }
  var user User
  db.First(&user, id)
  jsonUser, err := json.Marshal(user)
  if err != nil {
    return "", err
  }
  return string(jsonUser), nil
}

func UpdateUser(user *User, id string) (string, error) {
  db, err := configuration.CreateConnection()
  if err != nil {
    return "", err
  }
  var updatedUser User
  db.First(&updatedUser, id)
  updatedUser.Name = user.Name
  updatedUser.Email = user.Email
  db.Save(&updatedUser)
  jsonUser, err := json.Marshal(updatedUser)
  if err != nil {
    return "", err
  }
  return string(jsonUser), nil
}
