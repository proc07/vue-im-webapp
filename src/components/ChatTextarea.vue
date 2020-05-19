<template>
  <div class="chat-textarea" id="filter-chat">
    <div class="chat-send">
      <div class="left-btns">
        <svg-icon @click.native="switchFace" icon-class="ic_emoji" class="icon" />
        <svg-icon icon-class="ic_record" class="icon" />
      </div>
      <textarea
        class="send-text"
        rows="1"
        ref="chatContent"
        v-model="chatValue"
        @keyup="keyUpTextarea"
        >
      </textarea>
      <div class="more-btn" @click.stop="isShowMore = !isShowMore">
        <svg-icon v-show="chatValue === ''" icon-class="ic_more" class="icon" />
        <svg-icon v-show="chatValue !== ''" @click.native.stop="sendMsg" icon-class="ic_send" class="icon" />
      </div>
    </div>
    <div class="chat-tool">
      <div class="tool-face" v-show="isShowFace">
        <face-list
          @select="selectFace"
          @delete="deleteFace"
        >
        </face-list>
      </div>
      <div class="tool-more" v-show="isShowMore">
        <ul class="list">
          <li class="item">1</li>
          <li class="item">2</li>
          <li class="item">3</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import FaceList from '@/components/FaceList'

const TEXTAREA_MAX_SCROLL_HEIGHT = 82 // textarea max scroll height
const ELEMENT_ID_FOOTER = 'filter-chat' // element id
const NO_MATCH_CHINESE = /[^\u4e00-\u9fa5]/

export default {
  name: 'ChatTextarea',
  data () {
    return {
      // switch
      isShowFace: false,
      isShowMore: false,
      // textarea value
      chatValue: ''
    }
  },
  methods: {
    switchFace () {
      this.isShowFace = !this.isShowFace
      this.$refs.chatContent.focus()
    },
    keyUpTextarea () {
      // 1. 必须要加 height = 'auto'
      // 2. 要放在 height = maxHeight 前面
      // 否则会出现删除文本时，高度会多出一些间距
      const el = this.$refs['chatContent']
      el.style.height = 'auto'
      const maxHeight = el.scrollHeight >= TEXTAREA_MAX_SCROLL_HEIGHT ? TEXTAREA_MAX_SCROLL_HEIGHT : el.scrollHeight
      el.style.height = `${maxHeight}px`
    },
    // 发送按钮
    sendMsg () {
      const msgValue = this.chatValue.trim()
      if (msgValue) {
        this.chatValue = ''
        this.$emit('sendMsg', msgValue)
      }
    },
    selectFace (faceName) {
      this.chatValue += faceName
    },
    deleteFace () {
      const value = this.chatValue
      const lastIndx = value.length - 1
      const lastChar = value[lastIndx]

      if (lastChar === ']') {
        const startIndx = value.lastIndexOf('[')
        const faceStr = value.substring(startIndx + 1, lastIndx)

        if (NO_MATCH_CHINESE.test(faceStr)) {
          // 字符串中存在非中文
          this.chatValue = value.slice(0, lastIndx)
        } else {
          // false 只有中文
          this.chatValue = value.substring(0, startIndx)
        }
      } else {
        this.chatValue = value.slice(0, lastIndx)
      }
    },
    onClose (event) {
      for (const el of event.path) {
        if (ELEMENT_ID_FOOTER === el.id) {
          return
        }
      }
      this.isShowFace = false
      this.isShowMore = false
    }
  },
  components: {
    FaceList
  }
}
</script>

<style lang="scss" scoped>
  .chat-textarea{
    width: 100%;
    background: #f6f6f6;
    border-top: 1px solid #e2e2e2;
    &.show-tool{
    }
    .chat-send{
      display: flex;
      align-items: flex-end;
      min-height: 46px;
      padding: 9px 0;
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
</style>
