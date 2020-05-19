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
import Tabs from '@/components/Tabs.vue'
import { mapMutations } from 'vuex'

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
  activated () {
    console.log('Layout.vue activated')
    // 初始化一些全局的数据
    this._initSocket()
    this._getFollowers()
    this._getGroups()
  },
  deactivated () {
    console.log('Layout.vue deactivated')
    this.$chatSocket.clearSocket()
  },
  methods: {
    _initSocket () {
      this.$chatSocket.initSocket()
    },
    _getFollowers () {
      this.$nodeApi.follow.GetFollowers().then(res => {
        const followData = {}
        res.data.map(item => {
          // 交互位置，统一放到 targetUser 参数
          if (item.originUser) {
            exchange(item, 'originUser', 'targetUser')
            exchange(item, 'originId', 'targetId')
            exchange(item, 'originAlias', 'targetAlias')
          }
          followData[item.id] = item
        })
        this.setContacts(followData)
      })
    },
    _getGroups () {
      this.$nodeApi.follow.GetGroups().then(res => {
        const groupRes = {}
        res.data.forEach(item => {
          groupRes[item.groupId] = item
        })
        this.setGroups(groupRes)
      })
    },
    ...mapMutations({
      setContacts: 'SET_CONTACTS',
      setGroups: 'SET_GROUPS'
    })
  },
  components: {
    Tabs
  }
}
</script>
