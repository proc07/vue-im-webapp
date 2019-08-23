<template>
  <div class="home-wrapper">
    <div class="header">
      <div class="left"></div>
      <div class="center">Active</div>
      <div class="right"></div>
    </div>
    <div class="main">
      <cube-scroll
        v-if="chatData.length"
        ref="scroll"
        :data="chatData">
        <div class="chat-list">
          <div class="chat-item" v-for="item in chatData" :key="item">
            <div class="face">
              <img src="https://s3.amazonaws.com/uifaces/faces/twitter/danpliego/128.jpg" alt="" >
            </div>
            <div class="info border-bottom-1px">
              <div class="top">
                <div class="name">张力</div>
                <div class="time">17-04-22 10:20</div>
              </div>
              <div class="content">我发给你的额信息实在嗯嘛杨的呢，有没有超出往东南地区全委会</div>
            </div>
          </div>
        </div>
      </cube-scroll>
      <div class="status_empty" v-else>
        <svg-icon icon-class="status_empty" class="icon" />
        <div class="txt">Oh~ it empty!</div>
      </div>
    </div>
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
      background: #515967;
      // background: url(../assets/images/bg_src_morning.jpg) no-repeat center center;
      background-size: 100%;
      .left{}
      .center{
        color: #fff;
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
        padding: 15px 12px 0 12px;
        .chat-item{
          display: flex;
          padding: 6px 0;
          &:last-child{
            padding-bottom: 0;
            .info{
              &::after{
                border-bottom: 0;
              }
            }
          }
          .face{
            width: 50px;
            flex: 0 0 50px;
            height: 50px;
            margin-right: 10px;
            position: relative;
            &::before{
              content: '210';
              position: absolute;
              right: -5px;
              top: -5px;
              padding: 0 5px;
              min-width: 6px;
              height: 16px;
              line-height: 16px;
              text-align: center;
              background: red;
              color: #fff;
              border-radius: 8px;
              font-size: 11px;
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
export default {
  name: 'Home',
  data () {
    return {
      chatData: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  created () {
  }
}
</script>
