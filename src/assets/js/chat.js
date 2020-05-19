export default class Chat {
  constructor ({ roomId, type, unReadNum, message, system, group, user }) {
    this.roomId = roomId
    this.type = type
    this.unReadNum = unReadNum
    this.message = message
    // ?
    this.system = system
    this.group = group
    this.user = user
  }
}

export const TYPE_SYSTEM = 1
export const TYPE_GROUP = 2
export const TYPE_FRIEND = 3

export function createSystemChat ({ unReadNum, message }) {
  const SYSTEM_DATA = {
    name: '消息通知',
    portrait: 'https://res.cloudinary.com/zhangli-blog/image/upload/v1577949261/%E9%80%9A%E7%9F%A5.png'
  }
  return new Chat({
    roomId: 'simulate_system_id',
    type: TYPE_SYSTEM,
    unReadNum,
    message,
    system: SYSTEM_DATA
  })
}

export function createGroupChat ({ roomId, unReadNum, message, group }) {
  return new Chat({
    roomId,
    type: TYPE_GROUP,
    unReadNum,
    message,
    group: {
      selfData: {},
      groupData: {},
      members: []
    }
  })
}

export function createFriendChat ({ roomId, unReadNum, message, user }) {
  return new Chat({
    roomId,
    type: TYPE_FRIEND,
    unReadNum,
    message,
    user: {
      alias: null,
      description: null,
      gender: null,
      id: '',
      lastReceivedAt: '',
      name: '',
      phone: '',
      portrait: '',
      pushId: null
    }
  })
}
