<template>
  <div class="chat-group-wrapper" @click="closeChatTool">
    <div class="header banner-bg-chat">
      <i class="cubeic-back" @click="onBackPage"></i>
      <div class="left-name" v-if="false">{{ groupName }}</div>
      <div class="avatar-info" v-else>
        <cube-scroll
          ref="scroll"
          v-if="groupData.group"
          :data="groupData.group.members"
          direction="horizontal"
          class="horizontal-scroll">
          <div class="scroll">
            <img
            class="avatar"
            v-for="item in groupData.group.members"
            :key="item.id"
            :src="item.userData.portrait" alt="">
          </div>
        </cube-scroll>
        <div class="name">{{ groupName }}</div>
      </div>
      <i class="cubeic-person" @click="checkPersonInfo"></i>
    </div>
    <div class="chat-main">
      <cube-scroll ref="chatListScroll" class="view-wrapper">
        <div v-show="noMoreData" class="list-noMore">没有更多数据了</div>
        <div v-show="loading" class="list-loading">
          <cube-loading class="icon-loading"></cube-loading>
          <div class="txt">Loading Data</div>
        </div>
        <div class="list">
          <div
            class="item-wrapper"
            v-for="(data, index) in groupData.message"
            :key="index"
            :ref="'chatItem-' + index">
            <div class="notified" v-if="data.entityType === 1002">
              <span class="time">{{ data.createdAt }}</span>
              <span class="txt">{{ data.entity }}</span>
            </div>
            <div
              class="item-left"
              v-else-if="data.entityType === 1"
              :id="data.id"
              @click="handleClick(data)">
              <div class="avatar" :style="{backgroundImage: 'url(' + (data.avatar || '') + ')'}"></div>
              <div class="bubble">
                <p>{{ data.msg }}</p>
                <div class="meta">
                  <time class="posted-date">{{ data.time }}</time>
                </div>
              </div>
            </div>
            <div class="item-right" v-else-if="data.entityType === 1">
              <div class="avatar" :style="{backgroundImage: 'url(' + (data.avatar || '') + ')'}"></div>
              <div class="bubble">
                <p>{{ data.msg }}</p>
                <div class="meta">
                  <time class="posted-date">{{ data.time }}</time>
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
        min-width: 48px
        width: 48px
        height: 48px
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
  .chat-group-wrapper{
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
      .cubeic-back, .cubeic-person{
        color: #fff;
        position: absolute;
        z-index: 2;
        top: 12px;
        padding: 10px;
      }
      .cubeic-back{
        left: 0;
      }
      .cubeic-person{
        right: 0;
      }
      .left-name{
        color: #fff;
        font-size: 14px;
        line-height: 20px;
        flex: 1;
        padding: 0 45px;
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
        .notified{
          padding: 10px;
          .time{
            font-size: 11px;
            color: #a9a9a9;
            display: block;
            margin-bottom: 10px;
          }
          .txt{
            padding: 4px;
            font-size: 11px;
            background: #d5d5d5;
            color: #f5f5f5;
            display: inline-block;
            text-align: left;
            line-height: 17px;
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

export default {
  name: 'ChatGroup',
  data () {
    return {
      loading: true,
      noMoreData: false,
      groupData: {
        roomId: '',
        message: [],
        // group: {}
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'chatList',
      'isNotifyRoom'
    ]),
    groupName () {
      return this.groupData.group && this.groupData.group.groupData.name
    }
  },
  activated () {
    this.roomId = this.$route.params.id
    this._getGroupData()
  },
  deactivated () {
  },
  methods: {
    onBackPage () {
      this.$router.back()
    },
    checkPersonInfo () {
      console.log('checkPersonInfo')
    },
    handleClick (data) {
      console.log(data)
    },
    closeChatTool (event) {
      this.$refs.ChatTextarea.onClose(event)
    },
    onSendMsg (msgValue) {
      console.log(msgValue)
    },
    _getGroupData () {
      const groupData = getChatDataByRoomId(this.chatList, this.roomId)

      if (!this.roomId || !groupData) {
        return this.$router.push({ name: 'Home' })
      }

      this._msgLength = groupData.message.length
      // 没有聊天数据，关闭加载效果
      if (!this._msgLength) {
        this.loading = false
      }

      this.groupData = groupData
    }
  },
  components: {
    ChatTextarea
  }
}
</script>
