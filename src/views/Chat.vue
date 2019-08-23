<template>
  <div class="chat-wrapper">
    <div class="header">
      <i class="cubeic-back" @click="onBackPage"></i>
      <div class="left-name" v-if="true">时代姐妹花</div>
      <div class="avatar-info" v-else>
        <cube-scroll
          ref="scroll"
          :data="[1, 2, 3, 4]"
          direction="horizontal"
          class="horizontal-scroll">
          <div class="scroll">
            <img
            class="avatar"
            v-for="item in 5"
            :key="item"
            :src="`https://raw.githubusercontent.com/didi/cube-ui/master/example/pages/recycle-list/avatar${ item % 5 }.png`" alt="">
          </div>
        </cube-scroll>
        <div class="name">时代姐妹花</div>
      </div>
      <i class="cubeic-person" @click="checkPersonInfo"></i>
    </div>
    <div class="main">

    </div>
    <div class="footer">

    </div>
  </div>
</template>

<style lang="scss" scoped>
  .chat-wrapper{
    .header{
      display: flex;
      padding: 20px 0;
      box-sizing: border-box;
      background: url(../assets/images/default_banner_chat.png) no-repeat center center;
      background-size: 100%;
      transition: .5s all;
      position: relative;
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
        line-height: 16px;
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
    .main{

    }
    .footer{

    }
  }
</style>

<script>
export default {
  name: 'Chat',
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
    onBackPage () {
      console.log('onBackPage')
    },
    checkPersonInfo () {
      console.log('checkPersonInfo')
    }
  }
}
</script>
