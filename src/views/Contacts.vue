<template>
  <div class="contacts-wrapper">
    <div class="header">
      <div class="left"></div>
      <div class="center">Contacts</div>
      <div class="right"></div>
    </div>
    <div class="main">
      <cube-index-list
        class="contact-list"
        :data="cityData"
        @select="selectItem"
        @title-click="clickTitle">
      </cube-index-list>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .contacts-wrapper{
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
      background-color: #edf0f4;
      border-bottom: 1px solid rgba(143, 155, 171, 0.35);
      .left{}
      .center{
        color: #515967;
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
      .contact-list{
        width: 100%;
      }
    }
  }
</style>

<script>

const cityData = [
  {
    name: '群聊',
    items: [
      {
        name: '天猫小群',
        value: '666'
      }
    ]
  },
  {
    'name': '★ 星标朋友',
    'items': [
      {
        'name': 'BEIJING',
        'value': 1
      },
      {
        'name': 'SHANGHAI',
        'value': 2
      },
      {
        'name': 'BEIJING',
        'value': 3
      },
      {
        'name': 'SHANGHAI',
        'value': 4
      }
    ]
  },
  {
    'name': 'A',
    'items': [
      {
        'name': 'ANSHAN',
        'value': 5
      },
      {
        'name': 'ANQING',
        'value': 6
      },
      {
        'name': 'ANSHAN',
        'value': 7
      },
      {
        'name': 'ANQING',
        'value': 8
      }
    ]
  },
  {
    'name': 'B',
    'items': [
      {
        'name': 'ANSHAN',
        'value': 9
      },
      {
        'name': 'ANQING',
        'value': 41
      },
      {
        'name': 'ANSHAN',
        'value': 32
      },
      {
        'name': 'ANQING',
        'value': 43
      }
    ]
  }
]

export default {
  name: 'Contacts',
  data () {
    return {
      cityData: cityData
    }
  },
  methods: {
    selectItem (item) {
      console.log(item.name)
    },
    clickTitle (title) {
      console.log(title)
    }
  }
}
</script>
