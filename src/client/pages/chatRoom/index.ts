import "./index.css";
import { io } from "socket.io-client"

const url = new URL(location.href)
// 抓取queryString
const userName = url.searchParams.get("user_name")
const roomName = url.searchParams.get("room_name")

console.log("chat", userName, roomName)

// 沒有接收到值就返回首頁
if (!userName || !roomName) {
  location.href = `/main/main.html`
}

const clientIo = io()

// 建立前端頁面連線
clientIo.on("join", (msg) => {
  console.log("here", msg)
})