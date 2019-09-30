<template>
  <div class="face-wrapper">
    <div class="face-tabs">
      <div class="qq_face" :style="{width: setFaceWidth}" v-show="currentTab === 'qq'">
        <div
          class="item-box"
          v-for="(txt, index) in qqFace"
          :key="index"
          @click="onClickFace">
          <a :title="txt" type="qq" :class="`qq-face-${index}`" class="face"></a>
        </div>
      </div>
      <div class="wx_face" :style="{width: setFaceWidth}" v-show="currentTab === 'wx'">
        <div class="item-box" v-for="(txt, index) in wxFace" :key="index">
          <a :title="txt" type="wx" :class="`wx-face-${index}`" class="face"></a>
        </div>
      </div>
      <div class="emoji_face" :style="{width: setFaceWidth}" v-show="currentTab === 'emoji'">
        <div class="item-box" v-for="(item, key) in emojiFace" :key="key">
          <a :title="key" type="emoji" :class="`emoji-face`" class="face">{{ item.char }}</a>
        </div>
      </div>
    </div>
    <div class="bottom-tabs">
      <div class="item" :class="currentTab === 'qq' ? 'active' : ''" @click="currentTab = 'qq'">QQ表情</div>
      <div class="item" :class="currentTab === 'wx' ? 'active' : ''" @click="currentTab = 'wx'">微信表情</div>
      <div class="item" :class="currentTab === 'emoji' ? 'active' : ''" @click="currentTab = 'emoji'">emoji</div>
      <div class="item del-btn" @click="onDelFace">
        <svg-icon icon-class="ic_backspace" class="icon" />
      </div>
    </div>
  </div>
</template>

<script>
import emojiData from '@/utils/emojis.json'

export default {
  name: 'FaceList',
  data () {
    return {
      qqFace: ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '愉快', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '悠闲', '奋斗', '咒骂', '疑问', '嘘', '晕', '疯了', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '嘴唇', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '投降', '激动', '乱舞', '献吻', '左太极', '右太极'],
      wxFace: ['笑脸', '生病', '破涕为笑', '吐舌', '脸红', '恐惧', '失望', '无语', '嘿哈', '捂脸', '奸笑', '机智', '皱眉', '耶', '鬼魂', '合十', '强壮', '庆祝', '礼物', '红包', '鸡', '开心', '大笑', '热情', '眨眼', '色', '接吻', '亲吻', '露齿笑', '满意', '戏弄', '得意', '汗', '低落', '呸', '焦虑', '担心', '震惊', '悔恨', '眼泪', '哭', '晕', '心烦', '生气', '睡觉', '恶魔', '外星人', '心', '心碎', '丘比特', '闪烁', '星星', '叹号', '问号', '睡着', '水滴', '音乐', '火', '便便', '强', '弱', '拳头', '胜利', '上', '下', '右', '左', '第一', '吻', '热恋', '男孩', '女孩', '女士', '男士', '天使', '骷髅', '红唇', '太阳', '下雨', '多云', '雪人', '月亮', '闪电', '海浪', '猫', '小狗', '老鼠', '仓鼠', '兔子', '狗', '青蛙', '老虎', '考拉', '熊', '猪', '牛', '野猪', '猴子', '马', '蛇', '鸽子', '鸡', '企鹅', '毛虫', '章鱼', '鱼', '鲸鱼', '海豚', '玫瑰', '花', '棕榈树', '仙人掌', '礼盒', '南瓜灯', '圣诞老人', '圣诞树', '铃', '气球', 'CD', '相机', '录像机', '电脑', '电视', '电话', '解锁', '锁', '钥匙', '成交', '灯泡', '邮箱', '浴缸', '钱', '炸弹', '手枪', '药丸', '橄榄球', '篮球', '足球', '棒球', '高尔夫', '奖杯', '入侵者', '唱歌', '吉他', '比基尼', '皇冠', '雨伞', '手提包', '口红', '戒指', '钻石', '咖啡', '啤酒', '干杯', '鸡尾酒', '汉堡', '薯条', '意面', '寿司', '面条', '煎蛋', '冰激凌', '蛋糕', '苹果', '飞机', '火箭', '自行车', '高铁', '警告', '旗', '男人', '女人', 'O', 'X', '版权', '注册商标', '商标'],
      emojiFace: emojiData,
      currentTab: 'qq'
    }
  },
  computed: {
    setFaceWidth () {
      const FACE_WIDTH = 37
      const PADDING = 12
      const rowCount = parseInt((window.innerWidth - PADDING) / FACE_WIDTH)
      return `${rowCount * FACE_WIDTH}px`
    }
  },
  created () {
    const hasFont = this.hasAppleColorEmoji()
    if (!hasFont) {
      this.prepareTwemoji()
    }
  },
  methods: {
    prepareTwemoji () {
      var twemojiScript = document.createElement('script')
      twemojiScript.src = '//twemoji.maxcdn.com/2/twemoji.min.js?2.2.3'
      twemojiScript.onload = function () {
        /* eslint-disable */
        twemoji.parse(document.body)
        document.body.classList.add('twemojified')
      }
      document.head.append(twemojiScript)
    },
    hasAppleColorEmoji () {
      const dimensions = []
      // const tags = [document.createElement('span'), document.createElement('span')]

      function dimensionsFor (font) {
        const span = document.createElement('span')
        span.innerText = '☺'
        span.style.fontFamily = font
        document.body.appendChild(span)
        const dimensions = {
          w: span.offsetWidth,
          h: span.offsetHeight
        }
        document.body.removeChild(span)

        return dimensions
      }

      const notAFont = dimensionsFor('thisisnotafont')
      const appleColorEmoji = dimensionsFor('AppleColorEmoji')

      return notAFont.w !== appleColorEmoji.w || notAFont.h !== appleColorEmoji.h
    },
    onClickFace () {
    },
    onDelFace () {
      this.$emit('del-face')
    }
  }
}
</script>

<style lang="scss" scoped>
.face-wrapper{
  height: 200px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .face-tabs{
    flex: 1;
    overflow: scroll;
    .qq_face{
      padding: 6px;
      font-size: 0;
      margin: 0 auto;
      &::after{
        content: '';
        clear: both;
        display: block;
        overflow: hidden;
      }
      .item-box{
        display: inline-block;
        padding: 4px;
        width: 29px;
        height: 29px;
        text-align: center;
      }
      .face{
        width: 100%;
        height: 100%;
        display: block;
        font-size: 0;
        text-indent: -999em;
        border-bottom: 1px solid #f0f0f0;
        border-right: 1px solid #f0f0f0;
        cursor: pointer;
        background: url(../assets/images/chat/qq-face.png) no-repeat;
        background-size: 434px 202px;
      }
      @for $i from 0 through 6 {
        @for $j from 0 through 14 {
          .qq-face-#{$i * 15 + $j} {
            background-position: (-29px * $j) (-29px * $i);
          }
        }
      }
    }
    .wx_face{
      padding: 6px;
      font-size: 0;
      margin: 0 auto;
      &::after{
        content: '';
        clear: both;
        display: block;
        overflow: hidden;
      }
      .item-box{
        display: inline-block;
        padding: 4px;
        width: 29px;
        height: 29px;
        text-align: center;
      }
      .face{
        width: 100%;
        height: 100%;
        display: block;
        font-size: 0;
        text-indent: -999em;
        border-bottom: 1px solid #f0f0f0;
        border-right: 1px solid #f0f0f0;
        cursor: pointer;
        background: url(../assets/images/chat/wx-face.png) no-repeat;
        background-size: 480px 384px;
      }
      @for $i from 0 through 11 {
        @for $j from 0 through 14 {
          .wx-face-#{$i * 15 + $j} {
            background-position: (-32px * $j + 2) (-32px * $i + 2);
          }
        }
      }
    }
    .emoji_face{
      padding: 6px;
      font-size: 0;
      margin: 0 auto;
      &::after{
        content: '';
        clear: both;
        display: block;
        overflow: hidden;
      }
      .item-box{
        display: inline-block;
        padding: 4px;
        width: 29px;
        height: 29px;
        line-height: 29px;
        text-align: center;
        .emoji-face{
          font-size: 22px;
          /deep/.emoji{
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
  .bottom-tabs{
    width: 100%;
    flex: 0 0 30px;
    height: 30px;
    line-height: 30px;
    background: #f9f9f9;
    &::after{
      content: '';
      clear: both;
      display: block;
      overflow: hidden;
    }
    .item{
      float: left;
      background: #f9f9f9;
      color: #b7c1c9;
      font-size: 12px;
      padding: 0 12px;
      &.active{
        background: #e9e9e9;
        color: #868d94;
      }
      &.del-btn{
        background: none;
        float: right;
        margin-right: 10px;
        font-size: 22px;
        color: #7e8f9d;
      }
    }
  }
}
</style>
