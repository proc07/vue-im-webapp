<template>
  <div class="home-wrapper">
    <div class="header">
      <div class="left"></div>
      <div class="center">{{ socketStatusTxt }}</div>
      <div class="right"></div>
    </div>
    <div class="main">
      <cube-scroll
        v-if="chatMsgList.length"
        ref="scroll"
        :data="chatMsgList">
        <transition-group name="msg-list" tag="div" class="chat-list">
          <cube-index-list-item
            v-for="item in chatMsgList"
            :key="item.roomId"
            :item="item"
            @select="selectChatItem">
            <div class="chat-item">
              <div class="face" :class="item.unReadNum ? 'hot': ''" :unread-num="item.unReadNum">
                <img :src="item.user.portrait" alt="">
              </div>
              <div class="info border-bottom-1px">
                <div class="top">
                  <div class="name">{{ item.user.alias || item.user.name }}</div>
                  <div class="time">{{ handlerCreatedAt(item) }}</div>
                </div>
                <div class="content">{{ handlerContent(item) }}</div>
              </div>
            </div>
          </cube-index-list-item>
          </transition-group>
      </cube-scroll>
      <div class="status_empty" v-else>
        <svg-icon icon-class="status_empty" class="icon" />
        <div class="txt">Oh~ it empty!</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "@/assets/scss/variable.scss";

  .home-wrapper{
    position: relative;
    .header{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      height: 50px;
      background-color: #edf0f4;
      border-bottom: 1px solid rgba(143, 155, 171, 0.35);
      .left{}
      .center{
        color: #515967;
        font-size: 16px;
        line-height: 50px;
      }
      .right{}
    }
    .main{
      padding-top: 50px;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      .cube-scroll-wrapper{
        width: 100%;
      }
      .status_empty{
        text-align: center;
        .icon{
          font-size: 70px;
          color: #8e9bac;
        }
        .txt{
          font-size: 12px;
          color: #8e9bac;
        }
      }
      .chat-list{
        padding-top: 5px;
        .msg-list-enter-active{
          transition: all .3s;
        }
        // .msg-list-leave-active
        .msg-list-enter{
          opacity: 0;
          transform: translateX(80%);
        }
        // .msg-list-leave-to{
        //   opacity: 0;
        //   transform: translateX(-80%);
        // }
        .chat-item{
          display: flex;
          padding: 6px 12px 0 12px;
          &.item_active {
            background: rgba(0, 0, 0, 0.04);
          }
          .face{
            width: 50px;
            flex: 0 0 50px;
            height: 50px;
            margin-right: 10px;
            position: relative;
            &.hot{
              &::before{
                content: attr(unread-num);
                position: absolute;
                right: -5px;
                top: -5px;
                padding: 0 5px;
                min-width: 6px;
                height: 16px;
                line-height: 16px;
                text-align: center;
                background: $color-background-unread;
                color: $color-txt-unread;
                border-radius: 8px;
                font-size: 11px;
              }
            }
            img{
              width: 100%;
              height: 100%;
              border-radius: 5px;
            }
          }
          .info{
            height: 50px;
            padding-bottom: 12px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .top{
              display: flex;
              justify-content: space-between;
              margin-top: 4px;
              .name{
                font-size: 14px;
                color: #444;
                font-weight: bold;
              }
              .time{
                font-size: 12px;
                color: #a4a4a4;
              }
            }
            .content{
              font-size: 13px;
              height: 13px;
              line-height: 13px;
              color: #a4a4a4;
              margin-bottom: 4px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
  }
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      chatMsgList: []
    }
  },
  computed: {
    ...mapGetters([
      'chatList',
      'socketStatus'
    ]),
    unReadSum () {
      return this.chatList.reduce((pre, cur) => {
        return pre + cur.unReadNum
      }, 0)
    },
    socketStatusTxt () {
      switch (this.socketStatus) {
        case 1:
          return '接收中...'
        case 0:
          return '连接中...'
        case -1:
          return '已断开...'
        case -2:
          return '重新连接...'
        default:
          return this.unReadSum ? `Chat(${this.unReadSum})` : 'Chat'
      }
    }
  },
  watch: {
    chatList: {
      handler: function (newList) {
        console.log('watch chatlist', newList)
        if (newList.length) {
          this.chatMsgList = newList
        }
      },
      immediate: true
    }
  },
  methods: {
    handlerCreatedAt ({ message }) {
      return message.length ? message[message.length - 1]['createdAt'] : ''
    },
    handlerContent ({ message }) {
      return message.length ? message[message.length - 1]['entity']['content'] : ''
    },
    selectChatItem (item) {
      // path: `/layout/single-chat/${item.roomId}`
      this.$router.push({ name: 'SingleChat', params: { id: item.roomId }  })
    }
  }
}
</script>
