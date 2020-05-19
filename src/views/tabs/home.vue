<template>
  <div class="home-wrapper">
    <div class="header">
      <div class="title-status">{{ socketStatusTxt }}</div>
      <div class="right-bar">
        <i @click="searchVisible = true" class="cubeic-search icon"></i>
        <svg-icon @click.native="openAction" icon-class="ic_circle_add" class="icon"></svg-icon>
      </div>
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
            <!-- 好友 -->
            <div class="chat-item" v-if="item.type === 'FRIEND'">
              <div class="face">
                <face :unReadNum="item.unReadNum" :faces="[item.user.portrait]" />
              </div>
              <div class="info border-bottom-1px">
                <div class="top">
                  <div class="name">{{ item.user.alias || item.user.name }}</div>
                  <div class="time">{{ getLastDataByName(item, 'createdAt') | parseCreatedAt }}</div>
                </div>
                <div class="content">{{ getLastDataByName(item, 'content') }}</div>
              </div>
            </div>
            <!-- 群 -->
            <div class="chat-item" v-else-if="item.type === 'GROUP'">
              <div class="group-face">
                <face :unReadNum="item.unReadNum" :faces="item.group.members | getPortrait" />
              </div>
              <div class="info border-bottom-1px">
                <div class="top">
                  <div class="name">{{ item.group.groupData.name }}</div>
                  <div class="time">{{ item.message[item.message.length - 1].createdAt | parseCreatedAt }}</div>
                </div>
                <div class="content">{{ item.message[item.message.length - 1].entity }}</div>
              </div>
            </div>
            <!-- 系统 -->
            <div class="chat-item" v-else-if="item.type === 'SYSTEM'">
              <div class="face">
                <face :unReadNum="item.unReadNum" :faces="[item.user.portrait]" />
              </div>
              <div class="info border-bottom-1px">
                <div class="top">
                  <div class="name">{{ item.user.name }}</div>
                  <div class="time">{{ getLastDataByName(item, 'createdAt') | parseCreatedAt }}</div>
                </div>
                <div class="content">{{ getLastDataByName(item, 'description') }}</div>
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

    <search :visible.sync="searchVisible" />
  </div>
</template>

<style lang="scss" scoped>
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
      .title-status{
        color: #515967;
        font-size: 16px;
        line-height: 50px;
        padding-left: 12px;
      }
      .right-bar{
        position: relative;
        display: flex;
        align-items: center;
        .icon{
          font-size: 24px;
          padding: 10px 12px;
          color: #505967;
        }
      }
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
            height: 50px;
            margin-right: 10px;
          }
          .group-face{
            width: 50px;
            height: 50px;
            margin-right: 10px;
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
import Search from '@/components/Search.vue'
import Face from '@/components/Face.vue'

export default {
  name: 'Home',
  data () {
    return {
      searchVisible: false,
      searchValue: '',
      chatMsgList: []
    }
  },
  filters: {
    parseCreatedAt (date) {
      return date.substr(5, 11)
    },
    getPortrait (members) {
      return members.map(item => item.userData.portrait)
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
    openAction () {
      this.$createActionSheet({
        data: [
          {
            content: '<i class="cubeic-message"><i> 发起群聊',
            handler: '_createGroup'
          },
          {
            content: '<i class="cubeic-person"><i> 添加朋友',
            handler: '_addFriend'
          }
        ],
        onSelect: (item, index) => {
          this[item.handler]()
        }
      }).show()
    },
    // 公共方法，获取 message 最后一条数据中的某个参数
    getLastDataByName ({ message }, name) {
      return message.length ? message[message.length - 1]['entity'][name] : ''
    },
    selectChatItem (item) {
      if (item.type === 'SYSTEM') {
        this.$router.push({ name: 'SystemNotify', params: {} })
      } else if (item.type === 'FRIEND') {
        this.$router.push({ name: 'SingleChat', params: { id: item.roomId } })
      } else if (item.type === 'GROUP') {
        this.$router.push({ name: 'GroupChat', params: { id: item.roomId } })
      } else {
        // no processing
      }
    },
    _createGroup () {
      this.$router.push({ name: 'CreateGroup' })
    },
    _addFriend () {
    }
  },
  components: {
    Search,
    Face
  }
}
</script>
