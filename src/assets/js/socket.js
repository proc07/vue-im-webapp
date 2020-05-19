import io from 'socket.io-client'
import store from '@/store'
import { getToken } from './token'
import { getChatDataByRoomId, generateUUID } from './util'

const STATUS_ONLINE = 1 // 在线
const STATUS_CONNECT = 0 // 连接中
const STATUS_LEAVE = -1 // 离开
const STATUS_RECONNECT = -2 // 重新连接

class ChatSocket {
  constructor () {
    this.socket = null
    this.status = null
  }

  initSocket () {
    const token = getToken()

    if (!token) {
      return console.error('token 不存在，请先登录！')
    }
    if (!this.socket) {
      console.log('init socket...')
      this.socket = io('/chat-im', {
        query: {
          token: token.replace('Bearer ', '')
        },
        transports: ['websocket']
      })

      this.connect(() => {
        this.disconnect()
        this.reconnecting()
        this.getChatList()
        this.getUnReadMsg()
      })
    }
  }

  clearSocket () {
    this.socket = null
    this.status = null
  }

  // 连接服务器
  connect (cb) {
    this.status = STATUS_CONNECT
    store.commit('SET_STATUS', STATUS_CONNECT)

    this.socket.on('connect', cb)
  }

  // 断开
  disconnect () {
    this.socket.on('disconnect', () => {
      this.status = STATUS_LEAVE
      store.commit('SET_STATUS', STATUS_LEAVE)
    })
  }

  // 重新连接
  reconnecting () {
    this.socket.on('reconnecting', (attemptNumber) => {
      this.status = STATUS_RECONNECT
      store.commit('SET_STATUS', STATUS_RECONNECT)
      // console.log('重新连接:' + attemptNumber)
    })
  }

  // 单聊 发送消息
  sendMsgToFriend ({ msg, roomId }) {
    return new Promise((resolve, reject) => {
      this.socket.emit('sendMsg', {
        uuid: generateUUID(),
        msg: msg,
        roomid: roomId
      }, function (err, msgRes) {
        if (err) {
          reject(err)
        } else {
          // entity 数据转成对象
          msgRes.entity = JSON.parse(msgRes.entity)
          resolve(msgRes)
        }
      })
    })
  }

  // 获取未读消息
  getUnReadMsg () {
    this.socket.on('getUnReadMsg', (res) => {
      console.log('getUnReadMsg', res)
      const { chatList, contacts, currentChatRoom } = store.getters
      let chatData = getChatDataByRoomId(chatList, res.roomId)

      if (!chatData) {
        // 房间不存在
        if (res.type === 'SYSTEM') {
          chatData = {
            message: [],
            roomId: res.roomId,
            unReadNum: 0,
            user: {
              portrait: 'https://res.cloudinary.com/zhangli-blog/image/upload/v1577949261/%E9%80%9A%E7%9F%A5.png',
              name: '消息通知'
            }
          }
        } else if (res.type === 'GROUP') {
          chatData = res
        } else {
          chatData = {
            message: [],
            roomId: res.roomId,
            unReadNum: 0,
            user: contacts[res.roomId].targetUser
          }
        }
        store.commit('SET_CHATLIST', [chatData, ...chatList])
      } else {
        // 将最新的消息，移至顶部
        store.commit('MOVE_TOP_CHAT', res.roomId)
      }

      // 朋友回复的消息
      if (res.message.entityType === 1 || res.message.entityType === 1001) {
        // 处理数据
        res.message.entity = JSON.parse(res.message.entity)
        chatData.message.push(res.message)

        // 检测加入未读数量，如果在聊天界面中则不需要
        if (currentChatRoom === res.roomId) {
          // 设置已读
          this.setReadMsg(res.message.id)
          // 通知到聊天界面，滚动到底部位置
          store.commit('SET_NOTIFY_ROOM', true)
        } else {
          chatData.unReadNum += 1
        }
      } else {

      }
    })
  }

  // 消息设置为已读
  setReadMsg (msgId, cb) {
    this.socket.emit('setReadMsg', msgId, cb)
  }

  // 获取全部(好友、群)聊天记录数据列表
  getChatList (date) {
    this.status = STATUS_ONLINE
    store.commit('SET_STATUS', STATUS_ONLINE)

    this.socket.emit('getChatList', date, (msgData) => {
      // 获取完后，清空状态
      this.status = null
      store.commit('SET_STATUS', null)

      console.log('getChatList: ', msgData)
      // 聊天时间排序 - 降序
      if (msgData.length) {
        msgData.sort((a, b) => {
          const desc = a.message[a.message.length - 1].createdAt < b.message[b.message.length - 1].createdAt
          return desc ? 1 : -1
        })
      }
      store.commit('SET_CHATLIST', msgData)
    })
  }

  getHistoryMsg ({ lastDate, friendId }) {
    return new Promise((resolve, reject) => {
      this.socket.emit('getHistoryMsg', { lastDate, friendId }, (resData) => {
        resolve(resData)
      })
    })
  }
}

export default ChatSocket
