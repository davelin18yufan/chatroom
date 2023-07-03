import "./index.css";
import { name } from "@/utils";
import { io } from "socket.io-client"

console.log("client side chatroom page", name);

const clientIo = io()

// 建立前端頁面連線
clientIo.on("join", (msg) => {
  console.log("here", msg)
})