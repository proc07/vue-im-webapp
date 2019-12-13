import io from 'socket.io-client'
import store from '@/store'
import { getToken } from './token'
import { getChatDataByRoomId } from './util'

const STATUS_ONLINE = 1
const STATUS_CONNECT = 0
const STATUS_LEAVE = -1
const STATUS_RECONNECT = -2

function generateUUID () {
  var d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    // use high-precision timer if available
    d += performance.now()
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

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
      // 朋友回复的消息
      if (res.message.entityType === 1) {
        const chatList = store.getters.chatList
        const chatData = getChatDataByRoomId(chatList, res.roomId)
        // 处理数据
        res.message.entity = JSON.parse(res.message.entity)
        chatData.message.push(res.message)
        // 检测加入未读数量，如果在聊天界面中则不需要
        const curChatRoom = store.getters.currentChatRoom
        if (curChatRoom && curChatRoom === res.roomId) {
          // 设置已读
          this.socket.emit('setReadMsg', res.message.id, (arrivalAt) => {})
          // 需要通知到当前界面，滚动到底部位置
        } else {
          chatData.unReadNum += 1
        }
      } else {
        // 群消息
      }
    })
  }

  getChatList (date) {
    this.status = STATUS_ONLINE
    store.commit('SET_STATUS', STATUS_ONLINE)

    this.socket.emit('getChatList', date, (msgData) => {
      // 获取完后，清空状态
      this.status = null
      store.commit('SET_STATUS', null)

      console.log('getChatList: ', msgData)
      store.commit('SET_CHATLIST', msgData)
    })
  }
}

export default ChatSocket
