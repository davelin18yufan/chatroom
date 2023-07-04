export type UserData = {
  id: string,
  userName: string,
  roomName: string
}

// 用來放使用者資料
export default class UserService {
  // 不能被覆寫
  private userMap: Map<string, UserData>

  constructor() {
    this.userMap = new Map()
  }

  addUser(data: UserData) {
    this.userMap.set(data.id, data)
  }

  removeUser(id: string) {
    if(this.userMap.has(id)){
      this.userMap.delete(id)
    }
  }

  getUser(id: string) {
    if(!this.userMap.has(id)) return null

    const user = this.userMap.get(id)
    if(user) {
      return user
    }

    return null //讓回傳值不要是undefined
  }

  // 將使用者資料組合
  userDataInfoHandler(id: string, userName:string, roomName:string):UserData {
    return {
      id,
      userName,
      roomName
    }
  }
}