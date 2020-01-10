<template>
  <transition name="fade">
    <div class="search-wrapper" v-if="visible">
      <div class="header">
        <i class="cubeic-search"></i>
        <input type="text" v-model="searchVal" @keydown="search" clearable placeholder="搜索账号或者名称" class="search-value">
        <div class="cancel" @click="$emit('update:visible', false)">取消</div>
      </div>
      <div class="content" v-if="resUserList.length">
        <div class="result-box">
          <div class="type">已搜索到的用户</div>
          <div class="list">
            <cube-index-list-item
              class="item"
              v-for="(item, index) in resUserList" :key="index"
              :item="item"
              @select="selectItem">
              <img class="portrait" :src="item.portrait" alt="">
              <div class="name">{{ item.name }}</div>
            </cube-index-list-item>
          </div>
        </div>
      </div>
      <div class="no-result" v-show="!resUserList.length && once">该用户不存在</div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .search-wrapper{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: #edf0f4;
    .header{
      display: flex;
      padding: 5px;
      box-sizing: border-box;
      color: #515967;
      .cubeic-search{
        width: 35px;
        flex: 0 0 35px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        background: #fff;
        border-radius: 3px 0 0 3px;
        border: 1px solid rgba(143, 155, 171, 0.2);
        border-right: none;
      }
      .search-value{
        border: 1px solid rgba(143, 155, 171, 0.2);
        border-left: none;
        flex: 1;
        height: 35px;
        line-height: 35px;
        background: #fff;
        outline: none;
        border-radius: 0 3px 3px 0;
      }
      .cancel{
        width: 60px;
        flex: 0 0 60px;
        height: 35px;
        line-height: 35px;
        text-align: center;
      }
    }
    .content{
      background: #fff;
      .result-box{
        margin-top: 10px;
        border-top: 1px solid rgba(143, 155, 171, 0.2);
        border-bottom: 1px solid rgba(143, 155, 171, 0.2);
        .type{
          font-size: 13px;
          padding: 4px 10px;
          border-bottom: 1px solid #ebebeb;
          height: 22px;
          line-height: 22px;
          color: #9E9E9E;
        }
        .list{
          .item{
            display: flex;
            padding: 10px;
            border-bottom: 1px solid #ebebeb;
            &:last-child{
              border-bottom: none;
            }
            .portrait{
              margin-right: 10px;
              width: 35px;
              height: 35px;
              border-radius: 5px;
            }
            .name{
              font-size: 14px;
              height: 35px;
              line-height: 35px;
            }
          }
        }
      }
    }
    .no-result{
      font-size: 14px;
      color: #9E9E9E;
      background: #fff;
      height: 100px;
      line-height: 100px;
      margin: 10px 0;
      text-align: center;
    }
  }
</style>

<script>
export default {
  name: 'Search',
  data () {
    return {
      once: false,
      searchVal: '',
      resUserList: []
    }
  },
  props: {
    visible: Boolean
  },
  methods: {
    search (e) {
      if (e.keyCode === 13 && this.searchVal) {
        this.$nodeApi.user.SearchUserByPhoneOrName({
          search: this.searchVal
        }).then(res => {
          this.once = true
          this.resUserList = res.data
        })
      }
    },
    selectItem (item) {
      this.$router.push({ name: 'UserDetails', params: { id: item.id } })
    }
  }
}
</script>
