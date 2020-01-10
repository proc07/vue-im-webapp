export default {
  // 全局公用
  currentChatRoom: state => state.app.currentChatRoom,
  isNotifyRoom: state => state.app.isNotifyRoom,
  // 用户信息
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  // 聊天数据
  socketStatus: state => state.data.socketStatus,
  contacts: state => state.data.contacts,
  chatList: (state) => {
    const { contacts, chatList } = state.data
    // 把别名参数放入到对方数据中
    chatList.forEach(item => {
      if (item.type === 'FRIEND') {
        item.user = {
          alias: item.alias,
          ...contacts[item.roomId]['targetUser']
        }
      }
    })
    return chatList
  },
  systemMsg: (state) => {
    const { chatList } = state.data

    for (const item of chatList) {
      if (item.type === 'SYSTEM') {
        return item
      }
    }
    return {}
  }
}
