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
    SET_CHAT_MSG (state, { roomId, message }) {
      for (const dataItem of state.chatList) {
        if (dataItem.roomId === roomId) {
          message.entity = JSON.parse(message.entity)
          dataItem.message.push(message.entity)
        }
      }
    }
  },
  actions: {
  }
}

export default data
