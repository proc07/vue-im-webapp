<template>
  <cube-tab-bar
    class="tab-bar-warpper"
    v-model="selectedLabelDefault">
    <cube-tab 
      v-for="(item, index) in tabs" 
      :label="item.label" 
      :key="item.label"
      @click.native="clickHandler(item.path)">
      <i slot="icon" class="tab-icon" :class="item.icon"></i>
      <div>{{item.label}}</div>
    </cube-tab>
  </cube-tab-bar>
</template>

<style lang="scss" scoped>
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
      &.cube-tab_active{
        color: #515967;
      }
    }
  }
</style>

<script>
export default {
  name: 'Tabs',
  data () {
    return {
      selectedLabelDefault: 'Home',
      tabs: [{
        label: 'Home',
        icon: 'cubeic-home',
        path: 'Home'
      }, {
        label: 'Contact',
        icon: 'cubeic-mobile-phone',
        path: 'Contacts'
      }, {
        label: 'Me',
        icon: 'cubeic-person',
        path: 'User'
      }]
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
