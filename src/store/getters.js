export default {
  // 全局公用
  currentChatRoom: state => state.app.currentChatRoom,
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
      item.user = {
        alias: item.alias,
        ...contacts[item.roomId]['targetUser']
      }
    })
    return chatList
  }
}
