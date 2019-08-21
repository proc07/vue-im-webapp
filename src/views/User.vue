<template>
  <div class="user-wrapper">
    <div class="user-head">
      <img src="http://iph.href.lu/200x200" alt="头像" class="avatar">
      <div class="info">
        <div class="name">zArey</div>
        <div class="box">
          <div class="account">账号：790847400@qq.com</div>
          <i class="cubeic-arrow"></i>
        </div>
      </div>
    </div>
    <div class="card-list">
      <div class="card-item" v-for="(item, index) in 3" :key="index">
        <img class="icon" src="@/assets/images/me/setting-icon.png" alt="icon">
        <div class="box">
          <div class="name">设置</div>
          <i class="cubeic-arrow"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .user-wrapper{
    background: #f7f7f7;
    .user-head{
      background: #fff;
      display: flex;
      align-items: center;
      padding: 30px 20px;
      box-sizing: border-box;
      margin-bottom: 10px;
      .avatar{
        width: 60px;
        height: 60px;
        flex: 0 0 60px;
        border-radius: 5px;
      }
      .info{
        flex: 1;
        padding-left: 20px;
        .name{
          font-size: 18px;
          color: #333;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .box{
          display: flex;
          justify-content: space-between;
          .account{
            font-size: 16px;
            color: #9e9e9e;
          }
          .cubeic-arrow{
            color: #9e9e9e;
          }
        }
      }
    }
    .card-list{
      background: #fff;
      .card-item{
        display: flex;
        align-items: center;
        padding-left: 10px;
        .icon{
          flex: 0 0 20px;
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
        .box{
          flex: 1;
          display: flex;
          height: 50px;
          line-height: 50px;
          justify-content: space-between;
          border-bottom: 1px solid #f7f7f7;
          padding-right: 20px;
          .name{
            flex: 1;
            font-size: 16px;
            color: #333;
          }
          .cubeic-arrow{
            color: #9e9e9e;
          }
        }
      }
    }
  }
</style>

<script>
export default {
  name: 'User',
  data () {
    return {
    }
  }
}
</script>
