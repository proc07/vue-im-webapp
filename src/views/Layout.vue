<template>
  <div class="layout">
    <router-view class="router-view" :class="showTabs ? 'active' : ''" />
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
  methods: {
  },
  components: {
    Tabs
  }
}
</script>
