<template>
  <div class="chat-wrapper">
    <div class="header">
      <i class="cubeic-back" @click="onBackPage"></i>
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
      <div class="view-wrapper">
        <recycle-list
          class="list"
          :pullDirection="'pulldown'"
          :infinite="infinite"
          :size="size"
          :on-fetch="onFetch">
          <template slot="tombstone">
            <div class="item tombstone">
              <div class="avatar"></div>
              <div class="bubble">
                <p></p>
                <p></p>
                <p></p>
                <div class="meta">
                  <time class="posted-date"></time>
                </div>
              </div>
            </div>
          </template>
          <template slot="item" slot-scope="{ data }">
            <div :id="data.id" class="item" @click="handleClick(data)">
              <div class="avatar" :style="{backgroundImage: 'url(' + (data.avatar || '') + ')'}"></div>
              <div class="bubble">
                <p>{{ data.msg }}</p>
                <div class="meta">
                  <time class="posted-date">{{ data.time }}</time>
                </div>
              </div>
            </div>
          </template>
          <div slot="spinner">Loading Data</div>
          <div slot="noMore">没有更多数据了</div>
        </recycle-list>
      </div>
    </div>
    <div class="footer">

    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  .view-wrapper
    position: absolute
    top: 0
    left: 0
    bottom: 0
    width: 100%
  .list
    width: 375px
    max-width: 100%
    height: 100%
    margin: 0 auto
    padding: 0
    border: 1px solid #ddd
    list-style-type: none
    text-align: center
    .item
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
</style>

<style lang="scss" scoped>
  .chat-wrapper{
    display: flex;
    flex-direction: column;
    .header{
      display: flex;
      padding: 20px 0;
      box-sizing: border-box;
      background: url(../../assets/images/default_banner_chat.png) no-repeat center center;
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
    .main{
      position: relative;
      flex: 1;
      background: url(../../assets/images/bg_src_woman.jpg) no-repeat center center;
      background-size: 100%;
    }
    .footer{
      width: 100%;
      height: 46px;
      flex: 0 0 46px;
      background: #ccc;
    }
  }
</style>

<script>
import RecycleList from '@/components/recycle-list'

export default {
  name: 'Chat',
  components: {
    RecycleList
  },
  data () {
    return {
      // data
      initTime: new Date().getTime(),
      id: 0,
      size: 10,
      infinite: true
    }
  },
  mounted () {
    this._id = 0
  },
  methods: {
    onBackPage () {
      console.log('onBackPage')
    },
    checkPersonInfo () {
      console.log('checkPersonInfo')
    },
    // list
    getItem (id) {
      return {
        id,
        avatar: 'https://raw.githubusercontent.com/didi/cube-ui/dev/example/pages/recycle-list/avatar0.png',
        msg: this._id++,
        time: new Date(Math.floor(this.initTime + id * this.size * 1000 + Math.random() * this.size * 1000)).toString()
      }
    },
    onFetch () {
      let items = []
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!this.__NUM__) {
            this.__NUM__ = 0
          }
          this.__NUM__++

          if (this.__NUM__ > 3) {
            resolve(null)
            return
          }
          for (let i = 0; i < this.size; i++) {
            items.push(this.getItem(this.id++))
          }
          resolve(items)
        }, 1000)
      })
    },
    handleClick (data) {
      console.log(data)
    }
  }
}
</script>
