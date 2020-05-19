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
  groups: state => state.data.groups,
  chatList: (state) => {
    const { contacts, chatList, groups } = state.data
    // 将（好友、群组）数据导入到聊天列表数据中
    chatList.forEach(item => {
      switch (item.type) {
        case 'FRIEND':
          item.user = {
            alias: contacts[item.roomId]['targetAlias'],
            ...contacts[item.roomId]['targetUser']
          }
          break
        case 'GROUP':
          item.group = item.group ? item.group : groups[item.roomId]
          break
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
