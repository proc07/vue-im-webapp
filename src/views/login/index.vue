<template>
  <div class="login-wrapper">
    <div class="linear-gradient"></div>
    <div class="login-container">
      <h1 class="title">登录</h1>
      <div class="login-form">
        <div class="form-item account">
          <svg-icon icon-class="ic_phone" class="icon" />
          <input type="text" placeholder="邮箱/手机号" v-model="form.account" class="">
        </div>
        <div class="form-item password">
          <svg-icon icon-class="ic_key" class="icon" />
          <input type="password" placeholder="密码" v-model="form.password" class="">
        </div>
      </div>
      <router-link tag="div" to="/signin" class="tips-signin">还没有账号？去注册 ></router-link>

      <div class="login-btn" @click="onLogin">登录</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .login-wrapper{
    width: 100%;
    height: 100%;
    background: url('../../assets/images/bg_src_tianjin.jpg') no-repeat center center;
    background-size: cover;
    position: relative;
    .linear-gradient{
      width: 100%;
      height: 100%;
      // background: rgba(20, 114, 250, 0.6);
      background-image: linear-gradient(rgba(20, 114, 250, 0.3), rgba(20, 114, 250, 0.6));
    }
    .login-container{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
      .title{
        font-size: 26px;
        color: #fff;
        height: 80px;
        line-height: 80px;
        padding-bottom: 40px;
      }
      .login-form{
        border-radius: 4px;
        overflow: hidden;
        .form-item{
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.8);
          .icon{
            color: #1472fa;
            width: 40px;
            font-size: 20px;
          }
          &.account{
          }
          &.password{
            input{
              border-bottom: none;
            }
          }
          input{
            background: none;
            width: 100%;
            height: 50px;
            line-height: 50px;
            padding: 10px;
            box-sizing: border-box;
            outline: 0;
            font-size: 12px;
            border-bottom: 1px solid #ccc;
          }
        }
      }
      .tips-signin{
        text-align: right;
        color: #fff;
        margin-top: 15px;
        font-size: 12px;
      }
      .login-btn{
        position: absolute;
        left: 50%;
        bottom: 30px;
        margin-left: -80px;
        width: 160px;
        height: 40px;
        line-height: 40px;
        border-radius: 50px;
        background: rgba(0, 0, 0, 0.5);
        color: rgba(255, 255, 255, 0.8);
        text-align: center;
        &:active{
          background: rgba(0, 0, 0, 0.2);
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
</style>

<script>
import { mapActions, mapMutations } from 'vuex'

function exchange (data, key1, key2) {
  const temp = data[key1]
  data[key1] = data[key2]
  data[key2] = temp
}

export default {
  name: 'Login',
  data () {
    return {
      form: {
        account: '',
        password: ''
      }
    }
  },
  created () {
  },
  methods: {
    ...mapActions({
      LogIn: 'LogIn'
    }),
    onLogin () {
      const toast = this.$createToast({
        txt: 'Loading...',
        mask: true
      })
      toast.show()
      this.LogIn(this.form).then(res => {
        toast.hide()
        this.$router.push({ name: 'Home' })
        // 初始化一些全局的数据
        this._initSocket()
        this._getFollowers()
      })
    },
    _initSocket () {
      this.$chatSocket.initSocket()
    },
    _getFollowers () {
      this.$nodeApi.follow.GetFollowers().then(res => {
        const followData = {}
        res.data.map(item => {
          // 交互位置，统一放到 targetUser 参数
          if (item.originUser) {
            exchange(item, 'originUser', 'targetUser')
            exchange(item, 'originId', 'targetId')
            exchange(item, 'originAlias', 'targetAlias')
          }
          followData[item.id] = item
        })
        this.setContacts(followData)
      })
    },
    ...mapMutations({
      setContacts: 'SET_CONTACTS'
    })
  }
}
</script>
