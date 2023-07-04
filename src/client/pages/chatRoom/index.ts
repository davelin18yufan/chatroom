import "./index.css";
import { io } from "socket.io-client"
import { UserData } from "@/service/userService"

type UserMsg = { userData: UserData, msg: string, time: number }

const url = new URL(location.href)
// 抓取queryString
const userName = url.searchParams.get("user_name")
const roomName = url.searchParams.get("room_name")

// 沒有接收到值就返回首頁
if (!userName || !roomName) {
  location.href = `/main/main.html`
}

const clientIo = io()
// 成功加入聊天室之後傳送歡迎訊息
clientIo.emit("join", { userName, roomName})

//取得聊天室輸入匡
const textInput = document.getElementById("textInput") as HTMLInputElement
const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement
const chatBoard = document.getElementById("chatBoard") as HTMLDivElement
const headerRoomName = document.getElementById("headerRoomName") as HTMLParagraphElement
const backBtn = document.getElementById("backBtn") as HTMLButtonElement

headerRoomName.innerText = roomName || " - "
let userId = ""

//處理送出訊息
function msgHandler(data: UserMsg){
  const date = new Date(data.time)
  const time = `${date.getHours()}:${date.getMinutes()}`

  const divBox = document.createElement("div")
  divBox.classList.add("flex", "mb-4", "items-end")
  // 判斷是不是本人傳的
  if(userId === data.userData.id){
    divBox.classList.add("justify-end")
    divBox.innerHTML = `
      <p class="text-xs text-gray-700 mr-4">${time}</p>
      <div>
        <p class="text-xs text-white mb-1 text-right">${data.userData.userName}</p>
        <p
        class="mx-w-[50%] break-all bg-white px-4 py-2 rounded-bl-full rounded-br-full rounded-tl-full"
        >
          ${data.msg}
        </p>
      </div>
    `
  }else{
    divBox.classList.add("justify-start")
    divBox.innerHTML = `
      <div>
        <p class="text-xs text-gray-700 mb-1">${data.userData.userName}</p>
        <p
          class="mx-w-[50%] break-all bg-gray-800 px-4 py-2 rounded-tr-full rounded-br-full rounded-tl-full text-white"
        >
          ${data.msg}
        </p>
      </div>

      <p class="text-xs text-gray-700 ml-4">${time}</p>
    `
  }

  chatBoard.appendChild(divBox)
  //清空輸入匡
  textInput.value = ""
  //把畫面往下推
  chatBoard.scrollTop = chatBoard.scrollHeight
}

function roomMsgHandler(msg: string) {
  const divBox = document.createElement("div")
  divBox.classList.add("flex", "justify-center", "mb-4", "items-center")
  divBox.innerHTML = `
    <p class="text-gray-700 text-sm">${msg}</p>
  `

  chatBoard.appendChild(divBox)
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
// 加入歡迎訊息
clientIo.on("join", (msg) => {
  roomMsgHandler(msg)
})

clientIo.on("chat", (data) => {
  //收後端回傳的訊息丟到聊天室
  msgHandler(data)
})

// 離開通知訊息
clientIo.on("leave", (msg) => {
  roomMsgHandler(msg)
})

// 接收加入的使用者ＩＤ
clientIo.on("userId", (id) => {
  userId = id
})