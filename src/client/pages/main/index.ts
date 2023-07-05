import "./index.css";

// 抓取表格元素
const nameInput = document.getElementById("nameInput") as HTMLInputElement
const roomSelect = document.getElementById("roomSelect") as HTMLSelectElement
const startBtn = document.getElementById("startBtn") as HTMLButtonElement

startBtn.addEventListener("click", () => {
  const userName = nameInput.value;
  const roomName = roomSelect.value;
  if(userName.length === 0) {
    alert("Your name required")
    return;
  }
  location.href = `/chatRoom/chatRoom.html?user_name=${userName}&room_name=${roomName}`
})
