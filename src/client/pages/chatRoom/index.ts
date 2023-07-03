import "./index.css";
import { io } from "socket.io-client"

const url = new URL(location.href)
// 抓取queryString
const userName = url.searchParams.get("user_name")
const roomName = url.searchParams.get("room_name")

// 沒有接收到值就返回首頁
if (!userName || !roomName) {
  location.href = `/main/main.html`
}

const clientIo = io()

//取得聊天室輸入匡
const textInput = document.getElementById("textInput") as HTMLInputElement
const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement
const chatBoard = document.getElementById("chatBoard") as HTMLDivElement
const headerRoomName = document.getElementById("headerRoomName") as HTMLParagraphElement
const backBtn = document.getElementById("backBtn") as HTMLButtonElement

headerRoomName.innerText = roomName || " - "

//處理送出訊息
function msgHandler(msg: string){
  const divBox = document.createElement("div")
  divBox.classList.add("flex", "justify-end", "mb-4", "items-end")
  divBox.innerHTML = `
    <p class="text-xs text-gray-700 mr-4">00:00</p>
    <div>
      <p class="text-xs text-white mb-1 text-right">Dave</p>
      <p
        class="mx-w-[50%] break-all bg-white px-4 py-2 rounded-bl-full rounded-br-full rounded-tl-full"
      >
        ${msg}
      </p>
    </div>
  `

  chatBoard.appendChild(divBox)
  //清空輸入匡
  textInput.value = ""
  //把畫面往下推
  chatBoard.scrollTop = chatBoard.scrollHeight
}

submitBtn.addEventListener("click", () => {
  const textValue = textInput.value
  
  // 拿到職後發送到伺服器端
  clientIo.emit("chat", textValue) //chat event
})

backBtn.addEventListener("click", () => {
  location.href = `/main/main.html`
})

// 建立前端頁面連線
clientIo.on("join", (msg) => {
})

clientIo.on("chat", (msg) => {
  console.log("client", msg)
  // 究收後端回傳的訊息丟到聊天室
  msgHandler(msg)
})