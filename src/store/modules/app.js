const app = {
  state: {
    currentChatRoom: null,
    // 通知到聊天界面，滚动到底部位置
    isNotifyRoom: false
  },
  mutations: {
    SET_CUR_CHAT_ROOM (state, roomId) {
      state.currentChatRoom = roomId
    }
  },
  actions: {
  }
}

export default app
