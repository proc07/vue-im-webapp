<template>
  <div class="layout">
    <router-view class="router-view active" />
    <tabs></tabs>
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
  }
</style>

<script>
import Tabs from '@/components/Tabs.vue'

export default {
  name: 'Layout',
  data() {
    return {
      
    }
  },
  methods: {

  },
  components: {
    Tabs
  }
}
</script>
