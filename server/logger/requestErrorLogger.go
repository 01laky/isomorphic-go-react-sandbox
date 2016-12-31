package logger

import "fmt"

func LogError(err error, errorType string) {
  fmt.Println("/** ERROR BEGIN **/")
  fmt.Println(" -- ERROR TYPE ", errorType, " -- ")
  fmt.Println(err)
  fmt.Println("/** REQUEST ERROR END **/")
}
