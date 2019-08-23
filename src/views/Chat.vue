<template>
  <div class="chat-wrapper">
    <div class="header show-more">
      <i class="cubeic-back"></i>
      <div class="left-name" v-if="false">时代姐妹花</div>
      <div class="avatar-info" v-else>
        <cube-scroll
          ref="scroll"
          :data="[1, 2, 3, 4]"
          direction="horizontal"
          class="horizontal-scroll">
          <div class="scroll">
            <img
            class="avatar"
            v-for="item in 15"
            :key="item"
            :src="`https://raw.githubusercontent.com/didi/cube-ui/master/example/pages/recycle-list/avatar${ item % 5 }.png`" alt="">
          </div>
        </cube-scroll>
        <div class="name">时代姐妹花</div>
      </div>
      <i class="cubeic-person"></i>
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
      justify-content: space-between;
      align-items: flex-start;
      height: 60px;
      padding: 22px 10px;
      box-sizing: border-box;
      background: url(../assets/images/default_banner_chat.png) no-repeat center center;
      background-size: 100%;
      transition: .5s all;
      .cubeic-back, .cubeic-person{
        color: #fff;
        cursor: pointer;
      }
      &.show-more{
        height: 100px;
      }
      .left-name{
        color: #fff;
        font-size: 14px;
        line-height: 16px;
        flex: 1;
        padding: 0 25px;
      }
      .avatar-info{
        width: calc(100% - 52px);
        .horizontal-scroll{
          width: 100%;
        }
        /deep/ .cube-scroll-content {
          display: inline-block;
        }
        .scroll{
          height: 37px;
          white-space: nowrap;
          overflow: hidden;
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
  }
}
</script>
