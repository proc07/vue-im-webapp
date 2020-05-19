<template>
  <div class="chat-wrapper" @click="closeChatTool">
    <div class="header banner-bg-chat">
      <svg-icon icon-class="ic_back" @click.native="onBackPage" class="icon-back" />
      <div class="left-name" v-if="true">{{ friendData.user.alias || friendData.user.name }}</div>
      <div class="avatar-info" v-else>
        <div class="scroll">
          <img
          class="avatar"
          :src="friendData.user.portrait" alt="头像">
        </div>
        <div class="name">{{ friendData.user.alias || friendData.user.name }}</div>
      </div>
      <svg-icon icon-class="ic_more" @click.native="checkUserMore" class="icon-person" />
    </div>
    <div class="chat-main">
      <cube-scroll
        class="view-wrapper"
        ref="chatListScroll"
        :options="{
          bounce: false
        }"
        :scroll-events="['scroll']"
        @scroll="onScroll"
      >
        <div v-show="noMoreData" class="list-noMore">No More Data</div>
        <div v-show="loading" class="list-loading">
          <cube-loading class="icon-loading"></cube-loading>
          <div class="txt">Loading Data</div>
        </div>
        <div class="list">
          <div
            class="item-wrapper"
            v-for="(data, index) in friendData.message"
            :key="index"
            :ref="'chatItem-' + index">
            <!-- 对方 -->
            <div
              :id="data.id"
              class="item-left"
              v-if="data.senderId === friendData.user.id">
              <div class="avatar" @click="checkUserInfo" :style="{backgroundImage: 'url(' + (friendData.user.portrait || '') + ')'}"></div>
              <div class="bubble">
                <p>{{ data.entity.content }}</p>
                <div class="meta">
                  <time class="posted-date">{{ data.createdAt }}</time>
                </div>
              </div>
            </div>
            <!--- 自己的数据 --->
            <div class="item-right" v-else>
              <div class="avatar" :style="{backgroundImage: 'url(' + (userInfo.portrait || '') + ')'}"></div>
              <div class="bubble">
                <p>{{ data.entity.content }}</p>
                <div class="meta">
                  <time class="posted-date">{{ data.createdAt }}</time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
    <div class="chat-footer">
      <chat-textarea ref="ChatTextarea" @sendMsg="onSendMsg" />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
  .list
    width: 100%
    margin: 0 auto
    padding: 0
    list-style-type: none
    text-align: center
    .item-left, .item-right
      display: flex
      padding: 10px 0
      width: 100%
      text-align: left
      .avatar
        border-radius: 50%
        margin-left: 15px
        margin-right: 6px
        min-width: 38px
        width: 38px
        height: 38px
        background-image: url('https://raw.githubusercontent.com/didi/cube-ui/master/example/pages/recycle-list/unknown.jpg')
        background-size: cover
        outline: none
      p
        margin: 0
        word-wrap: break-word
        font-size: 14px
      &.tombstone
        p
          width: 100%
          height: 0.5em
          background-color: #ccc
          margin: 0.5em 0
      .bubble
        padding: 7px 10px
        color: #333
        background: #fff
        box-shadow: 0 3px 2px rgba(0, 0, 0, 0.1)
        position: relative
        max-width: 420px
        min-width: 80px
        margin: 0 20px 0 5px
        &:before
          content: ''
          border-style: solid
          border-width: 0 10px 10px 0
          border-color: transparent #fff transparent transparent
          position: absolute
          top: 0
          left: -10px
      .meta
        font-size: 0.8rem
        color: #999
        margin-top: 3px
    .item-right
      flex-direction: row-reverse
      .avatar
        margin-right: 15px
        margin-left: 6px
      .bubble
        margin: 0 5px 0 20px
        &:before
          border-width: 10px 10px 0 0
          border-color: #ffffff transparent transparent #ffffff
          right: -10px
          left: inherit
</style>

<style lang="scss" scoped>
  .chat-wrapper{
    display: flex;
    flex-direction: column;
    .header{
      display: flex;
      padding: 20px 0;
      box-sizing: border-box;
      transition: .5s all;
      position: relative;
      &.banner-bg-chat{
        background: url(../../assets/images/default_banner_chat.png) no-repeat center center;
        background-size: 100%;
      }
      &.banner-bg-group{
        background: url(../../assets/images/default_banner_group.png) no-repeat center center;
        background-size: 100%;
      }
      &.banner-bg-personal{
        background: url(../../assets/images/default_banner_personal.png) no-repeat center center;
        background-size: 100%;
      }
      .icon-back, .icon-person{
        color: #fff;
        position: absolute;
        z-index: 2;
        top: 12px;
        padding: 8px;
        font-size: 20px;
      }
      .icon-back{
        left: 7px;
      }
      .icon-person{
        right: 7px;
      }
      .left-name{
        color: #fff;
        font-size: 14px;
        line-height: 20px;
        flex: 1;
        padding: 0 65px;
      }
      .avatar-info{
        width: 100%;
        .horizontal-scroll{
          width: 100%;
          height: 37px;
          text-align: center;
        }
        /deep/ .cube-scroll-content {
          display: inline-block;
        }
        .scroll{
          white-space: nowrap;
          overflow: hidden;
          padding: 0 40px;
          text-align: center;
          .avatar{
            display: inline-block;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            border: 1px solid #fff;
            margin: 0 5px;
          }
        }
        .name{
          margin-top: 15px;
          color: #fff;
          font-size: 14px;
          text-align: center;
        }
      }
    }
    .chat-main{
      position: relative;
      flex: 1;
      background: #ededed;
      // background: url(../assets/images/bg_msg.jpg) no-repeat center center;
      // background: url(../../assets/images/bg_src_woman.jpg) no-repeat center center;
      background-size: 100%;
      .view-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        .list-noMore {
          font-size: 14px;
          color: #a9a9a9;
          text-align: center;
          height: 40px;
          line-height: 40px;
        }
        .list-loading {
          font-size: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          .icon-loading {
            margin-right: 5px;
            color: #a9a9a9;
          }
          .txt {
            margin-left: 5px;
            color: #a9a9a9;
          }
        }
      }
    }
    .chat-footer{
      min-height: 46px;
    }
  }
</style>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getChatDataByRoomId } from '@/assets/js/util'
import ChatTextarea from '@/components/ChatTextarea'

const LOADING_DOM_HEIGHT = 40 // dom loading element height

export default {
  name: 'SingleChat',
  data () {
    return {
      // 朋友的信息
      friendData: {
        roomId: '',
        message: [],
        user: {}
      },
      loading: true,
      noMoreData: false,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'chatList',
      'isNotifyRoom'
    ])
  },
  watch: {
    isNotifyRoom (newVal) {
      if (newVal) {
        // 有新消息，滚动到底部
        this._scrollToLastElement(200)
        this.setNotifyRoom(false)
      }
    }
  },
  activated () {
    this.roomId = this.$route.params.id
    this._getFriendData()
  },
  deactivated () {
  },
  methods: {
    onBackPage () {
      this.$router.back()
    },
    checkUserInfo () {
      this.$router.push({ name: 'UserDetails', params: { id: this.friendData.user.id } })
    },
    checkUserMore () {
      // this.$router.push({ name: 'UserDetails', params: { id: this.friendData.user.id } })
    },
    closeChatTool (event) {
      this.$refs.ChatTextarea.onClose(event)
    },
    onSendMsg (msgValue) {
      // 使用 socket 发送消息
      this.$chatSocket.sendMsgToFriend({
        msg: msgValue,
        roomId: this.roomId
      }).then(res => {
        // 发送成功
        console.log('sendMsg', res)
        this.friendData.message.push(res)
        this._refresh()
        this._scrollToLastElement(200)
        // mapMutations
        this.moveTopChat(this.friendData.roomId)
      }).catch(err => {
        // 发送失败
        console.log(err)
      })
    },
    onScroll (pos) {
      // 上拉加载历史数据
      if (
        this._msgLength &&
        pos.y >= -(LOADING_DOM_HEIGHT / 2) &&
        !this._isGetData
      ) {
        this._isGetData = true // 获取数据状态
        const lastDate = this.friendData.message[0].createdAt
        this.$chatSocket.getHistoryMsg({
          lastDate,
          friendId: this.friendData.user.id
        }).then(res => {
          if (res.length === 0) {
            // 没有数据了
            this.loading = false
            this.noMoreData = true
          } else {
            // 将获取到的消息设置为已读
            this._setReadMsg(res)

            // 延迟1秒，有个缓冲效果，也减少服务器压力
            setTimeout(() => {
              this._isGetData = false
              const oldData = this.friendData.message
              this.friendData.message = [...res, ...oldData]
              this._refresh()
              // ! 当前用户还在滚动中时，不执行 scrollToElement
              this.$nextTick(() => {
                const firstEl = this.$refs[`chatItem-${res.length}`][0]
                this.$refs.chatListScroll.scrollToElement(firstEl, 0, 0, -LOADING_DOM_HEIGHT)
              })
            }, 500)
          }
        })
      }
    },
    _setReadMsg (data) {
      let count = 0
      data.forEach(msgItem => {
        if (!msgItem.arrivalAt && msgItem.senderId === this.friendData.user.id) {
          count++
          this.$chatSocket.setReadMsg(msgItem.id, (arrivalAt) => {
            msgItem.arrivalAt = arrivalAt
          })
        }
      })
      if (count > 0) {
        this.friendData.unReadNum -= count
      }
    },
    _refresh () {
      this.$nextTick(() => {
        this.$refs['chatListScroll'].refresh()
      })
    },
    // 滚动聊天最新条数据的位置
    _scrollToLastElement (time = 0) {
      setTimeout(() => {
        const lastEl = this.$refs[`chatItem-${this.friendData.message.length - 1}`]
        lastEl && this.$refs.chatListScroll.scrollToElement(lastEl[0], time)
      })
    },
    // 从 vuex 中获取到朋友的数据
    _getFriendData () {
      const friendData = getChatDataByRoomId(this.chatList, this.roomId)

      if (!this.roomId || !friendData) {
        return this.$router.push({ name: 'Home' })
      }

      this._msgLength = friendData.message.length
      // 没有聊天数据，关闭加载效果
      if (!this._msgLength) {
        this.loading = false
      }

      this.friendData = friendData
      // 第一次进入时，设置消息为已读
      this._setReadMsg(this.friendData.message)
      this._refresh()
      this._scrollToLastElement()
    },
    ...mapMutations({
      setNotifyRoom: 'SET_NOTIFY_ROOM',
      moveTopChat: 'MOVE_TOP_CHAT'
    })
  },
  components: {
    ChatTextarea
  }
}
</script>
