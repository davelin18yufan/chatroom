import devServer from "@/server/dev";
import prodServer from "@/server/prod";
import express from "express";
import { Server } from "socket.io";
import http from "http";

import UserService from "@/service/userService";

const port = 3000;
const app = express();
// 建立伺服器端
const server = http.createServer(app);
const io = new Server(server);
const userService = new UserService()

// 監聽連接
io.on("connection", (socket) => {
  // 接收加入歡迎訊息
  socket.on("join", ({ userName, roomName}: { userName: string, roomName: string}) => {
    //加入後產生使用者物件並加入
    const userData = userService.userDataInfoHandler(
      socket.id, //socket賦予
      userName,
      roomName
    )

    // 在join事件發生後另外加入一個規則空間，並且只把訊息發送給這個空間
    socket.join(userData.roomName)

    userService.addUser(userData)

    socket.broadcast.to(userData.roomName).emit("join", `${userName} has joined ${roomName}`)
  })

  // 連接後監聽chat頻道的訊息
  socket.on("chat", (msg) => {
    io.emit("chat", msg) // 因為前後端接受有時間差，使用一樣的事件觸發沒關係
  })

  // 開聊天室訊息
  socket.on("disconnect", (msg) => {
    // 取得離開使用者的資料
    const userData = userService.getUser(socket.id)
    const userName = userData?.userName
    if(userName){
      socket.broadcast.to(userData.roomName).emit("leave", `${userData.userName} has left ${userData.roomName}`)
    }
    userService.removeUser(socket.id)
  })
})

// 執行npm run dev本地開發 or 執行npm run start部署後啟動線上伺服器
if (process.env.NODE_ENV === "development") {
  devServer(app);
} else {
  prodServer(app);
}

server.listen(port, () => {
  console.log(`The application is running on port ${port}.`);
});
