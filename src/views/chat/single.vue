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
    <div class="chat-footer" id="filter-footer">
      <div class="chat-send">
        <div class="left-btns">
          <svg-icon @click.native="switchFace" icon-class="ic_emoji" class="icon" />
          <svg-icon icon-class="ic_record" class="icon" />
        </div>
        <textarea
          class="send-text"
          rows="1"
          ref="chatContent"
          v-model="chatValue"
          @keyup="onKeyUpTextarea"
          >
        </textarea>
        <div class="more-btn" @click.stop="isShowMore = !isShowMore">
          <svg-icon v-show="chatValue === ''" icon-class="ic_more" class="icon" />
          <svg-icon v-show="chatValue !== ''" @click.native.stop="onSendMsg" icon-class="ic_send" class="icon" />
        </div>
      </div>
      <div class="chat-tool">
        <div class="tool-face" v-show="isShowFace">
          <face-list
            @select="selectFace"
            @delete="deleteFace"
          >
          </face-list>
        </div>
        <div class="tool-more" v-show="isShowMore">
          <ul class="list">
            <li class="item">1</li>
            <li class="item">2</li>
            <li class="item">3</li>
          </ul>
        </div>
      </div>
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
      // background: url(../assets/images/bg_msg.jpg) no-repeat center center;
      background: url(../../assets/images/bg_src_woman.jpg) no-repeat center center;
      background-size: 100%;
      .view-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        .list-noMore {
          font-size: 14px;
          color: #333;
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
            color: #333;
          }
          .txt {
            margin-left: 5px;
            color: #333;
          }
        }
      }
    }
    .chat-footer{
      width: 100%;
      background: #f2f2f2;
      &.show-tool{
      }
      .chat-send{
        display: flex;
        align-items: flex-end;
        min-height: 46px;
        padding-bottom: 9px;
        box-sizing: border-box;
        // background: #fff;
        .left-btns{
          width: 70px;
          flex: 0 0 70px;
          display: flex;
          justify-content: space-between;
          padding: 0 5px;
          box-sizing: border-box;
          font-size: 25px;
          color: #4f5a63;
          margin-bottom: 2px;
        }
        .send-text{
          flex: 1;
          padding: 5px;
          resize: none;
          outline: none;
          font-size: 14px;
          height: 28px;
          line-height: 18px;
          box-sizing: border-box;
          border: none;
        }
        .more-btn{
          width: 50px;
          flex: 0 0 50px;
          text-align: center;
          font-size: 26px;
          color: #4f5a63;
        }
      }
      .chat-tool{
        .tool-face{
          border-top: 1px solid #d8dbdc;
          .face-list{
          }
          .tabs{
            .item{
              &.del-btn{
              }
            }
          }
        }
        .tool-more{
          border-top: 1px solid #d8dbdc;
        }
      }
    }
  }
</style>

<script>
import { mapGetters, mapMutations } from 'vuex'
import FaceList from '@/components/FaceList'
import { getChatDataByRoomId } from '@/assets/js/util'

const TEXTAREA_MAX_SCROLL_HEIGHT = 82 // textarea max scroll height
const LOADING_DOM_HEIGHT = 40 // dom loading element height
const ELEMENT_ID_FOOTER = 'filter-footer' // element id
const NO_MATCH_CHINESE = /[^\u4e00-\u9fa5]/

export default {
  name: 'Chat',
  data () {
    return {
      // 朋友的信息
      friendData: {
        roomId: '',
        message: [],
        user: {}
      },
      // switch
      isShowFace: false,
      isShowMore: false,
      loading: true,
      noMoreData: false,
      // textarea value
      chatValue: ''
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
    selectFace (faceName) {
      this.chatValue += faceName
    },
    deleteFace () {
      const value = this.chatValue
      const lastIndx = value.length - 1
      const lastChar = value[lastIndx]

      if (lastChar === ']') {
        const startIndx = value.lastIndexOf('[')
        const faceStr = value.substring(startIndx + 1, lastIndx)

        if (NO_MATCH_CHINESE.test(faceStr)) {
          // 字符串中存在非中文
          this.chatValue = value.slice(0, lastIndx)
        } else {
          // false 只有中文
          this.chatValue = value.substring(0, startIndx)
        }
      } else {
        this.chatValue = value.slice(0, lastIndx)
      }
    },
    switchFace () {
      this.isShowFace = !this.isShowFace
      this.$refs.chatContent.focus()
    },
    onBackPage () {
      this.$router.back()
    },
    checkUserInfo () {
      this.$router.push({ name: 'UserDetails', params: { id: this.friendData.user.id } })
    },
    checkUserMore () {
      // this.$router.push({ name: 'UserDetails', params: { id: this.friendData.user.id } })
    },
    onKeyUpTextarea () {
      const el = this.$refs['chatContent']
      // 1. 必须要加 height = 'auto'
      // 2. 要放在 height = maxHeight 前面
      // 否则会出现删除文本时，高度会多出一些间距
      el.style.height = 'auto'
      const maxHeight = el.scrollHeight >= TEXTAREA_MAX_SCROLL_HEIGHT ? TEXTAREA_MAX_SCROLL_HEIGHT : el.scrollHeight
      el.style.height = `${maxHeight}px`
    },
    closeChatTool (event) {
      for (const index in event.path) {
        if (ELEMENT_ID_FOOTER === event.path[index].id) {
          return
        }
      }
      this.isShowFace = false
      this.isShowMore = false
    },
    onScroll (pos) {
      // 上拉加载历史数据
      if (
        this._msgLength &&
        pos.y >= -(LOADING_DOM_HEIGHT / 2) &&
        !this._isGetData
      ) {
        this._isGetData = true
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
    // 发送按钮
    onSendMsg () {
      const msgValue = this.chatValue.trim()
      if (msgValue) {
        this.chatValue = ''
        // 使用 socket 发送消息
        this.$chatSocket.sendMsgToFriend({
          msg: msgValue,
          roomId: this.roomId
        }).then(res => {
          // 发送成功
          console.log('onSendMsg', res)
          this.friendData.message.push(res)
          this._refresh()
          this._scrollToLastElement(200)
          // mapMutations
          this.moveTopChat(this.friendData.roomId)
        }).catch(err => {
          // 发送失败
          console.log(err)
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
    // 滚动聊天某一条数据的位置
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

      this._msgLength = this.friendData.message.length
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
    FaceList
  }
}
</script>
