<template>
  <div class="contacts-wrapper">
    <div class="header">
      <div class="left"></div>
      <div class="center">Contacts</div>
      <div class="right"></div>
    </div>
    <div class="main">
      <cube-index-list
        class="contact-list"
        :data="followerList">
        <cube-index-list-group
          v-for="(group, type) in followerList"
          :key="type"
          :group="group">
          <cube-index-list-item
            v-for="(item, index) in group.items"
            :key="index"
            :item="item"
            @select="selectItem(type, item)">
            <div class="custom-item" v-if="type === 2">
              <img class="portrait" :src="item.targetUser.portrait" alt="" >
              <div class="name">{{ item.targetUser.name }}</div>
            </div>
            <div class="custom-item"  v-if="type === 0">
              <div class="portrait">
                <face :faces="item.members | getPortrait" />
              </div>
              <div class="name">{{ item.groupData.name }}</div>
            </div>
          </cube-index-list-item>
        </cube-index-list-group>
      </cube-index-list>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .contacts-wrapper{
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
      .contact-list{
        width: 100%;
        .custom-item{
          display: flex;
          padding: 5px 10px 0 10px;
          .portrait{
            width: 36px;
            height: 36px;
            flex: 0 0 36px;
            margin-right: 10px;
            border-radius: 4px;
            overflow: hidden;
          }
          .name{
            font-size: 12px;
            color: #000;
            height: 35px;
            line-height: 35px;
            width: 100%;
            border-bottom: 1px solid #f2f2f2;
            padding-bottom: 5px;
          }
        }
      }
    }
  }
</style>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getChatDataByRoomId } from '@/assets/js/util'
import Face from '@/components/Face.vue'

const GROUP_INDEX = 0
const STAR_INDEX = 1
const FRIEND_INDEX = 2

export default {
  name: 'Contacts',
  data () {
    return {
      followerList: [
        {
          name: '群聊',
          items: []
        },
        {
          name: '★ 星标朋友',
          items: []
        },
        {
          name: '朋友',
          items: []
        }
      ]
    }
  },
  filters: {
    getPortrait (members) {
      return members.map(item => item.userData.portrait)
    }
  },
  computed: {
    ...mapGetters([
      'contacts',
      'chatList',
      'groups'
    ])
  },
  watch: {
    contacts: {
      handler: function (newVal) {
        this.followerList[FRIEND_INDEX]['items'] = newVal
      },
      immediate: true
    },
    groups: {
      handler: function (newVal) {
        this.followerList[GROUP_INDEX]['items'] = newVal
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      setChatList: 'SET_CHATLIST'
    }),
    selectItem (type, item) {
      const handlerMap = {
        [GROUP_INDEX]: '_groupChat',
        [STAR_INDEX]: '_groupChat',
        [FRIEND_INDEX]: '_singleChat'
      }
      this[handlerMap[type]](item)
    },
    _groupChat (item) {
      console.log(item)
    },
    _singleChat (item) {
      const id = item.id
      const friendData = this.contacts[id]
      const roomData = getChatDataByRoomId(this.chatList, id)
      // 新建聊天框 - 拆离成对象创建，以便于管理
      if (!roomData) {
        const newData = {
          type: 'FRIEND',
          message: [],
          roomId: id,
          unReadNum: 0,
          user: {
            alias: friendData.alias,
            ...friendData.targetUser
          }
        }
        // this.chatList.unshift(newData)
        this.setChatList([newData, ...this.chatList])
      }
      this.$router.push({ name: 'SingleChat', params: { id } })
    }
  },
  components: {
    Face
  }
}
</script>
