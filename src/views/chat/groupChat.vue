<template>
  <div class="chat-wrapper">
    <div class="header banner-bg-chat">
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
    <div class="chat-main">
      <cube-scroll ref="chatListScroll" class="view-wrapper">
        <div v-show="noMore" class="list-noMore">没有更多数据了</div>
        <div v-show="loading" class="list-loading">
          <cube-loading class="icon-loading"></cube-loading>
          <div class="txt">Loading Data</div>
        </div>
        <div class="list">
          <div
            class="item-wrapper"
            v-for="(data, index) in chatData"
            :key="index"
            :ref="'chatItem-' + index">
            <div :id="data.id" class="item-left" @click="handleClick(data)">
              <div class="avatar" :style="{backgroundImage: 'url(' + (data.avatar || '') + ')'}"></div>
              <div class="bubble">
                <p>{{ data.msg }}</p>
                <div class="meta">
                  <time class="posted-date">{{ data.time }}</time>
                </div>
              </div>
            </div>
            <div class="item-right">
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
      <div class="chat-send">
        <div class="left-btns">
          <svg-icon @click="isShowFace = !isShowFace" icon-class="ic_emoji" class="icon" />
          <svg-icon icon-class="ic_record" class="icon" />
        </div>
        <textarea
          rows="1"
          ref="chatContent"
          v-model="chatValue"
          @keyup="onKeyUpChatText"
          class="send-text">
        </textarea>
        <div class="more-btn" @click="isShowMore = !isShowMore">
          <svg-icon icon-class="ic_more" class="icon" />
          <svg-icon v-show="false" icon-class="ic_send" class="icon" />
        </div>
      </div>
      <div class="chat-tool">
        <div class="tool-face" v-show="isShowFace">
          <face-list></face-list>
        </div>
        <div class="tool-more" v-show="isShowMore">
        </div>
      </div>
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
      // background: url(../assets/images/bg_msg.jpg) no-repeat center center;
      background: url(../../assets/images/bg_src_woman.jpg) no-repeat center center;
      background-size: 100%;
      .view-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        .list-noMore {
          font-size: 14px;
          color: #333;
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
            color: #333;
          }
          .txt {
            margin-left: 5px;
            color: #333;
          }
        }
      }
    }
    .chat-footer{
      width: 100%;
      background: #f2f2f2;
      &.show-tool{
      }
      .chat-send{
        display: flex;
        align-items: flex-end;
        min-height: 46px;
        padding-bottom: 9px;
        box-sizing: border-box;
        // background: #fff;
        .left-btns{
          width: 70px;
          flex: 0 0 70px;
          display: flex;
          justify-content: space-between;
          padding: 0 5px;
          box-sizing: border-box;
          font-size: 25px;
          color: #4f5a63;
          margin-bottom: 2px;
        }
        .send-text{
          flex: 1;
          padding: 5px;
          resize: none;
          outline: none;
          font-size: 14px;
          height: 28px;
          line-height: 18px;
          box-sizing: border-box;
          border: none;
        }
        .more-btn{
          width: 50px;
          flex: 0 0 50px;
          text-align: center;
          font-size: 26px;
          color: #4f5a63;
        }
      }
      .chat-tool{
        .tool-face{
          border-top: 1px solid #d8dbdc;
          .face-list{
          }
          .tabs{
            .item{
              &.del-btn{
              }
            }
          }
        }
        .tool-more{
          border-top: 1px solid #d8dbdc;
        }
      }
    }
  }
</style>

<script>
import FaceList from '@/components/FaceList'

var Mock = {}
Mock.messages = [
  'when you popState and actually being well, we expect it further',
  "But I'm going to take care of ripping out my code in the fact that just something like that",
  "And what we'll createdCallbacks than that you can still read what each one of this should go out",
  'So just return Promise back and do this, the route equals',
  "ah, let's do a clearRoutes it says I'm not going to do",
  'At least trying new Promise',
  "then, and then it's going to check what that",
  'And we zoom in, then you can kind of set, except for a router',
  'Now strictly today',
  "I'm going to just takes an iterable as well be to add a visible",
  "Anyway, so that we'll do a link",
  "So what I'm going to minify this, so I'll just console",
  'log data for now, just sometimes look at that',
  'not then if we wanted to do position from the registerElements primed and red',
  "That isn't get called",
  'At all',
  'No',
  'Interesting that misc here',
  'So what was a regular expression',
  'Because once you get over doing a fancy techniques',
  "And let's see",
  'OK, we broke thing to do',
  'Right',
  'document',
  '&quot; So',
  'Yeah',
  'which is fine',
  "And that we'll do sc",
  'view',
  'So what you draw the line where is it',
  'Where is being run',
  'I think, a million times look at it and styles an iteration, ES2015 update the content for is this',
  'routes equals Array',
  'from',
  'Hm, that might be a trade',
  "off, because we're just do an animation",
  'in the attached',
  'Look at this push',
  'pull kind of useful to have layout root here is it',
  'That by default, what we going to grab the',
  'Yes',
  "In router, I think, would let's say, for example",
  "So let's make it can be just this the hour mark on the actual contents",
  'We just loads though it was the way, a nice this',
  'Are you would be a little bit more pretty raw, this is a day, dude',
  'Border',
  'radius, that',
  "And I'm going to just do that will take something else",
  'And thank you might now',
  "That is the next time, I'm going to come into misc",
  'And somebody actually not',
  'source equals home',
  'But if I was sending me to resolve where we go',
  'All right',
  'And it makes JavaScript',
  'And I have run again',
  "Normally a massive, as I said, this is always, I'm going to call the different [INAUDIBLE] Hm",
  'Wow',
  "We have happen on screen, and the otherwise, don't want",
  'Yeah, and forth in the new path',
  "So we don't you use that might very wrong",
  'But in a customary bug',
  "Don't forget to hidden or display to none, things like a race when you are actually really long time I want to tell that is where you go",
  'And that work',
  "Yeah, and I'm going to do today",
  'I had misc are all the create one of the performance stuff',
  'But if you had lots of tea',
  'Yeah',
  "Now we're going to come in",
  'But did working as intended it',
  'So we can be able to be watching it straightforward slash',
  "And that, I think that will be all the like since we are valid concept for this, the root of this called HTML5 routing, which I don't know",
  "I just feels OK, but hopefully, and opacity 0, and it's just put a z",
  "index of 1 on that's going to be sort of handling of attachedCallback, and we want to transform scale very well be true for them is amazing, like across from the new one that",
  'You know',
  "Yeah, we could see now, all being we won't do this thing today",
  'And so this is a current view',
  'We have a question ties in',
  'Why not',
  'source equals router, why not',
  "And I think that we'd probably, if we've already to allow it to be the thing",
  'Oh, all right, so we get it, because I have to juggle it all',
  'No',
  'I feel I agree',
  'It would actually get it, because otherwise, we still have this',
  'routes',
  'keys',
  'So this is a layout boundary',
  "It's the cause",
  'Yeah, 3 pixels',
  'OK',
  "So since that's true",
  'And this stuff',
  'And that work',
  'Good point, or strict, and then the URL, changed',
  "But I'm going to, let's see, what we're any",
  'So the new view, think about',
  "And then we've defer, why not",
  "Let's fail",
  'So this newView, newView is never watching is I was that',
  "so that it's a compass",
  'Oh',
  'North, east, south, we called, all be no ES',
  'anything',
  "What I'm curious about your question here",
  "And I'm going to say",
  "so let's see",
  "So let's see",
  "So we'll say from this animations that we want to do this so that this point",
  'So we want us to cover next week',
  'We can actually',
  "But that they've all been set it",
  'Yeah',
  'And at the top and misc here',
  'But it will be run into a bit different sections',
  "And I think you'd want each of there's no DOM tree reason",
  'Well, yeah',
  'OK, so we have a couple of click for clicks',
  'And so if we see about this',
  'So what I think things that I really good start',
  'script tags at home, kids',
  "Don't do this file to actually",
  'Woo',
  'I made, sir',
  'So again, particular line of the',
  "let's call it sc for Supercharged",
  "There's no",
  "It's a compass",
  'Oh',
  'right',
  'newView, newView is the simplicity at this one anything below 2015, right',
  'It broke',
  "OK, let's see",
  "So we're going to removeEventListener",
  'You are the nicest',
  "something that you know, we'll create that doesn't necessarily end up with something new to these pages",
  'In router',
  'And certainly, as I said, you could usually just delete the constructor but createdCallback',
  'Oh, well, let link of the',
  'Yes',
  'If we had to do is I want us to come up writing apps, it can actually, this push',
  'pull kind of data, which version of something',
  'So what they can be about view or something that have a thing to do a trade',
  "off because you've got memory constraints and all these function",
  "So let's see if",
  'oh, do we wanted to do this',
  "If you're attach, what we'd want to know",
  'That is important think in so that goes to control of [',
  'UI ',
  '] transitions, particular expression',
  "Right, so the otherwise, it should also work on the layout, which might because we're actually remind yourselves that I can do it",
  'Yeah',
  'So that, in theory, place all the content as well when that have new ideas',
  "So this should be a class list, we'll create one of these, what we'll do is I want to do",
  'All right, bottom, left',
  'Do you have definitely',
  'So when the mindset off chaining [INAUDIBLE] out of the same index HTML elements',
  'Views'
]
const CTMSH = 82 // chat textarea max scroll height

export default {
  name: 'ChatGroup',
  data () {
    return {
      isShowFace: false,
      isShowMore: false,
      loading: true,
      noMore: true,
      chatValue: '',
      chatData: [],
      id: 1
    }
  },
  props: {
  },
  mounted () {
    console.log(this.$route.params.id)
    this.onPullingDown()

    setTimeout(() => {
      const lastEl = this.$refs[`chatItem-${this.chatData.length - 1}`]
      this.$refs.chatListScroll.scrollToElement(lastEl[0], 200)
    }, 2000)
  },
  methods: {
    onBackPage () {
      this.$router.back()
    },
    checkPersonInfo () {
      console.log('checkPersonInfo')
    },
    onKeyUpChatText () {
      const el = this.$refs['chatContent']
      // 1. 必须要加 height = 'auto'
      // 2. 要放在 height = maxHeight 前面
      // 否则会出现删除文本时，高度会多出一些间距
      el.style.height = 'auto'
      const maxHeight = el.scrollHeight >= CTMSH ? CTMSH : el.scrollHeight
      el.style.height = `${maxHeight}px`
    },
    // list
    onPullingDown () {
      this.onFetch().then(res => {
        if (res.length) {
          res.forEach(item => {
            this.chatData.unshift(item)
          })
        } else {
          this.$refs.scroll.forceUpdate()
        }
      })
    },
    getItem (id) {
      const msg = Mock.messages[Math.floor(Math.random() * Mock.messages.length)]
      return {
        id,
        avatar: 'https://raw.githubusercontent.com/didi/cube-ui/dev/example/pages/recycle-list/avatar0.png',
        msg: msg,
        time: new Date(Math.floor(this.initTime + id * this.size * 1000 + Math.random() * this.size * 1000)).toString()
      }
    },
    onFetch () {
      let items = []
      return new Promise((resolve) => {
        setTimeout(() => {
          for (let i = 0; i < 30; i++) {
            items.push(this.getItem(this.id++))
          }
          resolve(items)
        }, 1000)
      })
    },
    handleClick (data) {
      console.log(data)
    }
  },
  components: {
    FaceList
  }
}
</script>
