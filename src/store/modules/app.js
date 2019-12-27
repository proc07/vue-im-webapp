const app = {
  state: {
    // 记录正在聊天的房间id
    currentChatRoom: null,
    // 通知到聊天界面，滚动到底部位置
    isNotifyRoom: false
  },
  mutations: {
    SET_CUR_CHAT_ROOM (state, roomId) {
      state.currentChatRoom = roomId
    },
    SET_NOTIFY_ROOM (state, isNotify) {
      state.isNotifyRoom = isNotify
    }
  },
  actions: {
  }
}

export default app
