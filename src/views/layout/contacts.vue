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
          v-for="(group, index) in followerList"
          :key="index"
          :group="group">
          <cube-index-list-item
            v-for="(item, index) in group.items"
            :key="index"
            :item="item"
            @select="selectItem">
            <div class="custom-item" v-if="item.targetUser">
              <img class="portrait" :src="item.targetUser.portrait" alt="" >
              <div class="name">{{ item.targetUser.alias || item.targetUser.name }}</div>
            </div>
            <div class="custom-item" v-else>
              {{ item.name }}
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
            width: 35px;
            height: 35px;
            border-radius: 8px;
            margin-right: 10px;
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

// const GROUP_INDEX = 0
// const STAR_INDEX = 1
const FRIEND_INDEX = 2

export default {
  name: 'Contacts',
  data () {
    return {
      followerList: [
        {
          name: '群聊',
          items: [
            {
              name: '天猫小群',
              value: '666'
            }
          ]
        },
        {
          'name': '★ 星标朋友',
          'items': [
            {
              'name': 'BEIJING',
              'value': 1
            }
          ]
        },
        {
          'name': '朋友',
          'items': []
        }
      ]
    }
  },
  created () {
  },
  computed: {
    ...mapGetters([
      'contacts',
      'chatList'
    ])
  },
  watch: {
    contacts: {
      handler: function (newVal) {
        this.followerList[FRIEND_INDEX]['items'] = newVal
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      setChatList: 'SET_CHATLIST'
    }),
    selectItem ({ id }) {
      const friendData = this.contacts[id]
      const roomData = getChatDataByRoomId(this.chatList, id)
      if (!roomData) {
        const newData = {
          message: [],
          roomId: id,
          unReadNum: 0,
          user: friendData.targetUser
        }
        /// this.setChatList([newData, ...this.chatList])
        this.chatList.unshift(newData)
      }
      this.$router.push({ name: 'SingleChat', params: { id } })
    }
  }
}
</script>
