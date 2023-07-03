import devServer from "./server/dev";
import prodServer from "./server/prod";
import express from "express";
import { Server } from "socket.io";
import http from "http";

import { name } from "@/utils";

const port = 3000;
const app = express();
// 建立伺服器端
const server = http.createServer(app);
const io = new Server(server);

// 監聽連接
io.on("connection", (socket) => {
  socket.emit("join", "welcome") // 在連線join頻道後發送訊息給客戶端

  // 連接後監聽chat頻道的訊息
  socket.on("chat", (msg) => {
    io.emit("chat", msg) // 因為前後端接受有時間差，使用一樣的事件觸發沒關係
  })
})

// 執行npm run dev本地開發 or 執行npm run start部署後啟動線上伺服器
if (process.env.NODE_ENV === "development") {
  devServer(app);
} else {
  prodServer(app);
}

console.log("server side", name);

server.listen(port, () => {
  console.log(`The application is running on port ${port}.`);
});
