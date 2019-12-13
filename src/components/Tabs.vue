<template>
  <cube-tab-bar
    class="tab-bar-warpper"
    v-model="selectedLabelDefault">
    <cube-tab
      v-for="(item, index) in tabs"
      :label="item.label"
      :key="index"
      @click.native="clickHandler(item.path)"
      :class="'cube-tab-' + item.label"
      :unread-sum="unReadSum">
      <i slot="icon" class="tab-icon" :class="item.icon"></i>
      <div>{{item.label }}</div>
    </cube-tab>
  </cube-tab-bar>
</template>

<style lang="scss" scoped>
  @import "@/assets/scss/variable.scss";

  .tab-bar-warpper{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    border-top: 1px solid #ccc;
    .cube-tab{
      color: #8f9bab;
      position: relative;
      &.cube-tab-Chat{
        &::before{
          content: attr(unread-sum);
          position: absolute;
          right: 30px;
          top: 0px;
          padding: 0 5px;
          min-width: 6px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          background: $color-background-unread;
          color: $color-txt-unread;
          border-radius: 8px;
          font-size: 11px;
        }
      }
      &.cube-tab_active{
        color: #515967;
      }
    }
  }
</style>

<script>
import { mapGetters } from 'vuex'

const TABS_KEY_VALUES = {
  Home: 'Home',
  Contacts: 'Contacts',
  User: 'Me'
}

export default {
  name: 'Tabs',
  data () {
    return {
      selectedLabelDefault: 'Home',
      tabs: [{
        label: 'Chat',
        icon: 'cubeic-home',
        path: 'Home'
      }, {
        label: 'Contacts',
        icon: 'cubeic-mobile-phone',
        path: 'Contacts'
      }, {
        label: 'Me',
        icon: 'cubeic-person',
        path: 'User'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'chatList'
    ]),
    unReadSum () {
      return this.chatList.reduce((pre, cur) => {
        return pre + cur.unReadNum
      }, 0)
    }
  },
  created () {
    const routeName = this.$route.name
    if (routeName && TABS_KEY_VALUES[routeName]) {
      this.selectedLabelDefault = TABS_KEY_VALUES[routeName]
    }
  },
  methods: {
    clickHandler (path) {
      // if you clicked home tab, then print 'Home'
      this.$router.push({ name: path })
    }
  }
}
</script>
