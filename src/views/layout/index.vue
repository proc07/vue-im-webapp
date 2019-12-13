<template>
  <div class="layout">
    <keep-alive>
      <router-view class="router-view" :class="showTabs ? 'active' : ''" />
    </keep-alive>
    <tabs class="tabs" :class="showTabs ? '' : 'hide'"></tabs>
  </div>
</template>

<style lang="scss" scoped>
  .layout{
    height: 100%;
    .router-view{
      height: 100%;
      overflow: hidden;
      &.active{
        height: calc(100% - 50px);
      }
    }
    .tabs{
      transition: .5s bottom;
      &.hide{
        bottom: -51px;
      }
    }
  }
</style>

<script>
import { mapMutations } from 'vuex'
import Tabs from '@/components/Tabs.vue'

function exchange (data, key1, key2) {
  const temp = data[key1]
  data[key1] = data[key2]
  data[key2] = temp
}

export default {
  name: 'Layout',
  data () {
    return {
      showTabs: false
    }
  },
  watch: {
    '$route': {
      handler (newRoute) {
        this.showTabs = !!newRoute.meta.fixedTabs
      },
      immediate: true
    }
  },
  created () {
    // 初始化一些全局的数据
    this._initSocket()
    this._getFollowers()
  },
  methods: {
    _getFollowers () {
      this.$nodeApi.follow.GetFollowers().then(res => {
        const followData = {}
        res.data.map(item => {
          // originUser 存在时为对方数据，需要转移
          if (item.originUser) {
            exchange(item, 'originUser', 'targetUser')
            exchange(item, 'originId', 'targetId')
          }
          followData[item.id] = item
        })
        this.setContacts(followData)
      })
    },
    _initSocket () {
      this.$chatSocket.initSocket()
    },
    ...mapMutations({
      setContacts: 'SET_CONTACTS'
    })
  },
  components: {
    Tabs
  }
}
</script>
