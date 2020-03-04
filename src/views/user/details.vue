<template>
  <div class="user-details">
    <div class="header" :style="{  }">
      <div class="bar">
        <svg-icon icon-class="ic_back" @click.native="$router.back()" class="icon-back" />
        <svg-icon :icon-class="isFavorite ? 'ic_favorite' : 'ic_favorite_border'" @click.native="toggleFavorite" class="icon-favorite" />
      </div>
      <div class="name">{{ userInfo.alias || userInfo.name }}</div>
      <img :src="userInfo.portrait" alt="" class="portrait">
    </div>
    <div class="userinfo">
      <div class="follow-wrapper">
        <!-- 喜欢我的朋友 -->
        <div class="follows">
          FOLLOWS<br/>0
        </div>
        <!-- 我喜欢的朋友 -->
        <div class="following">
          FOLLOWING<br/>0
        </div>
      </div>
      <div class="description">{{ userInfo.description || '暂无介绍' }}</div>
    </div>
    <div class="add-friend" v-show="!isFriend" @click="addFriend">加好友</div>
  </div>
</template>

<style lang="scss" scoped>
  .user-details{
    .header{
      position: relative;
      width: 100%;
      height: 200px;
      background: url(../../assets/images/default_portrait.jpg) no-repeat center center;
      background-size: 100%;
      .bar{
        width: 100%;
        height: 56px;
        .icon-back, .icon-favorite{
          font-size: 20px;
          color: #fff;
          padding: 8px;
          position: absolute;
          z-index: 2;
          top: 12px;
        }
        .icon-back{
          left: 7px;
        }
        .icon-favorite{
          right: 7px;
        }
      }
      .name{
        font-size: 30px;
        font-weight: 300;
        color: #fff;
        text-align: left;
        margin-top: 35px;
        margin-left: 20px;
      }
      .portrait{
        display: block;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: #fff;
        border: 2px solid #fff;
        position: absolute;
        left: 20px;
        bottom: -40px;
      }
    }
    .userinfo{
      display: flex;
      flex-direction: column;
      padding: 20px;
      .follow-wrapper{
        display: flex;
        justify-content: flex-end;
        text-align: center;
        margin-bottom: 20px;
        color: #87878f;
        font-size: 13px;
        .follows{
          margin-right: 10px;
        }
        .following{
        }
      }
      .description{
        color: #87878f;
      }
    }
    .add-friend{
      position: fixed;
      left: 50%;
      bottom: 30px;
      margin-left: -65px;
      background: #589993;
      color: rgba(255, 255, 255, 0.8);
      width: 130px;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      text-align: center;
      cursor: pointer;
    }
  }
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserDetails',
  data () {
    return {
      userInfo: {},
      isFriend: true,
      isFavorite: false
    }
  },
  activated () {
    const id = this.$route.params.id
    this._getUserInfo(id)
  },
  computed: {
    ...mapGetters({
      ownUserInfo: 'userInfo',
      contactList: 'contacts'
    })
  },
  methods: {
    toggleFavorite () {
      this.isFavorite = !this.isFavorite
    },
    addFriend () {
      const { name } = this.ownUserInfo

      this.$createDialog({
        type: 'prompt',
        title: '好友请求',
        prompt: {
          value: `我是${name}`,
          placeholder: '发送验证申请，等对方通过'
        },
        onConfirm: (e, value) => {
          this.$nodeApi.apply.ApplyFriend({
            description: value,
            targetId: this.userInfo.id
          }).then(res => {
            this.$createToast({
              txt: '发送成功',
              type: 'correct'
            }).show()
          })
        }
      }).show()
    },
    _getUserInfo (id) {
      const contacts = this.contactList
      this.$nodeApi.user.GetUserInfoById({ id }).then(res => {
        this.userInfo = res.data.user
        this.isFriend = res.data.isFriend

        for (const key in contacts) {
          const value = contacts[key]
          if (value.targetId === id) {
            this.userInfo.alias = value.targetAlias
            return
          }
        }
      })
    }
  }
}
</script>
