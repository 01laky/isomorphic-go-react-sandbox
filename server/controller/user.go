package controller

import (
	"gopkg.in/labstack/echo.v1"
  "encoding/json"
  "goOne/server/logger"
  "goOne/server/model"
  "io"
  "net"
  // "bufio"
  "os"
)

func CreateUser(context *echo.Context) {
  user := new(model.User)
  if err := context.Bind(user); err != nil {
        logger.LogError(err, "request-error")
        context.JSON(500, "request-error")
  }
  createdUser, err, errorType := model.CreateUser(user)
  if err != nil {
        logger.LogError(err, errorType)
        context.JSON(500, errorType)
  }
  jsonUser, err := json.Marshal(createdUser)
  if err != nil {
        logger.LogError(err, "parse-error")
        context.JSON(500, "parse-error")
  }
  context.JSON(200, string(jsonUser))
}

func GetUser(context *echo.Context) {
  id := context.Param("id")
	// conn, err := net.Dial("tcp", "localhost:6666")
	// connect to this socket
	println("PARAM ID: =>", id)
  con, err := net.Dial("tcp", ":6666")
	con.Write([]byte("Halo Svet :D"))
  if err != nil {
      println("err", err)
  }
  _, err = io.Copy(con, os.Stdin)
  if err != nil {
      println("err", err)
  }
  if tcpcon, ok := con.(*net.TCPConn); ok {
      tcpcon.CloseWrite()
  }
  _, err = io.Copy(os.Stdout, con)
  if err != nil {
      println("err", err)
  }
  err = con.Close()
  if err != nil {
      println("err", err)
  }
	context.JSON(200, "AFTER CONTACT")
	// strEcho := "Halo"
  // servAddr := "localhost:6666"
  // tcpAddr, err := net.ResolveTCPAddr("tcp", servAddr)
  // if err != nil {
  //     println("ResolveTCPAddr failed:", err.Error())
  //     os.Exit(1)
  // }
	//
  // conn, err := net.DialTCP("tcp", nil, tcpAddr)
  // if err != nil {
  //     println("Dial failed:", err.Error())
  //     os.Exit(1)
  // }
	//
  // _, err = conn.Write([]byte(strEcho))
  // if err != nil {
  //     println("Write to server failed:", err.Error())
  //     os.Exit(1)
  // }
	//
  // println("write to server = ", strEcho)
	//
  // reply := make([]byte, 1024)
	//
  // _, err = conn.Read(reply)
  // if err != nil {
  //     println("Write to server failed:", err.Error())
  //     os.Exit(1)
  // }
	//
  // println("reply from server=", string(reply))
	// context.JSON(200, string(reply))
	// conn.Close()
  // conn, _ := net.DialTCP("tcp", nil, "localhost:6666")
  // for {
  //   // read in input from stdin
  //   reader := bufio.NewReader(os.Stdin)
  //   fmt.Print("Text to send: ")
  //   text, _ := reader.ReadString('\n')
  //   // send to socket
  //   fmt.Fprintf(conn, text + "\n")
  //   // listen for reply
  //   message, _ := bufio.NewReader(conn).ReadString('\n')
  //   fmt.Print("Message from ON server: "+message)
	// 	context.JSON(200, string(message))
	// 	conn.Close()
  // }
}
