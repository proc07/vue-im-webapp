<template>
  <div class="user-wrapper">
    <div class="user-head">
      <img :src="userInfo.portrait || 'http://iph.href.lu/200x200'" alt="头像" class="avatar">
      <div class="info">
        <div class="name">{{ userInfo.name }}</div>
        <div class="box">
          <div class="account">账号：{{ userInfo.phone }}</div>
          <i class="cubeic-arrow"></i>
        </div>
      </div>
    </div>
    <div class="card-list">
      <div class="card-item">
        <img class="icon" src="@/assets/images/me/setting-icon.png" alt="icon">
        <div class="box">
          <div class="name">设置</div>
          <i class="cubeic-arrow"></i>
        </div>
      </div>
      <div class="card-item">
        <img class="icon" src="@/assets/images/me/setting-icon.png" alt="icon">
        <div class="box">
          <div class="name">关于项目</div>
          <i class="cubeic-arrow"></i>
        </div>
      </div>
      <div class="card-item" @click="onLogOut">
        <img class="icon" src="@/assets/images/me/setting-icon.png" alt="icon">
        <div class="box">
          <div class="name">退出登录</div>
          <i class="cubeic-arrow"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .user-wrapper{
    background: #f7f7f7;
    .user-head{
      background: #fff;
      display: flex;
      align-items: center;
      padding: 30px 20px;
      box-sizing: border-box;
      margin-bottom: 10px;
      .avatar{
        width: 60px;
        height: 60px;
        flex: 0 0 60px;
        border-radius: 5px;
      }
      .info{
        flex: 1;
        padding-left: 20px;
        .name{
          font-size: 18px;
          color: #333;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .box{
          display: flex;
          justify-content: space-between;
          .account{
            font-size: 16px;
            color: #9e9e9e;
          }
          .cubeic-arrow{
            color: #9e9e9e;
          }
        }
      }
    }
    .card-list{
      background: #fff;
      .card-item{
        display: flex;
        align-items: center;
        padding-left: 10px;
        .icon{
          flex: 0 0 20px;
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
        .box{
          flex: 1;
          display: flex;
          height: 50px;
          line-height: 50px;
          justify-content: space-between;
          border-bottom: 1px solid #f7f7f7;
          padding-right: 20px;
          .name{
            flex: 1;
            font-size: 16px;
            color: #333;
          }
          .cubeic-arrow{
            color: #9e9e9e;
          }
        }
      }
    }
  }
</style>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Me',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted () {
    console.log(this.userInfo)
  },
  methods: {
    ...mapActions({
      LogOut: 'LogOut'
    }),
    onLogOut () {
      this.$createDialog({
        type: 'confirm',
        title: '退出不会删除任何历史数据。',
        confirmBtn: {
          text: '退出',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          this.LogOut().then(res => {
            this.$router.replace('/login')
            // this.$nextTick(() => {
            //   window.location.reload()
            // })
          })
        }
      }).show()
    }
  }
}
</script>
