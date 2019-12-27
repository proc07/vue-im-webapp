const data = {
  state: {
    socketStatus: null, // 无状态
    systemNotify: {}, // 系统通知
    chatList: [], // 聊天列表
    contacts: {} // 聊天人
  },
  mutations: {
    SET_STATUS (state, status) {
      state.socketStatus = status
    },
    SET_CONTACTS (state, data) {
      state.contacts = data
    },
    SET_CHATLIST (state, list) {
      state.chatList = list
    },
    // 添加一条消息
    SET_CHAT_MSG (state, { roomId, message }) {
      for (const dataItem of state.chatList) {
        if (dataItem.roomId === roomId) {
          message.entity = JSON.parse(message.entity)
          dataItem.message.push(message.entity)
        }
      }
    },
    // 将消息置顶
    MOVE_TOP_CHAT ({ chatList }, roomId) {
      const chatIndex = chatList.findIndex(item => item.roomId === roomId)
      if (chatIndex !== 0) {
        const [chatData] = chatList.splice(chatIndex, 1)
        setTimeout(() => {
          chatList.unshift(chatData)
        })
      }
    }
  },
  actions: {
  }
}

export default data
