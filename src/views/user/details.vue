<template>
  <div class="user-details">
    <div class="header" :style="{  }">
      <div class="bar">
        <div class="back"></div>
        <div class="star"></div>
      </div>
      <div class="name">你好</div>
      <img src="https://res.cloudinary.com/zhangli-blog/image/upload/v1575364101/k3wkxmv10lpyn8hpk3mr.jpg" alt="" class="portrait">
    </div>
    <div class="userinfo">
      <div class="follow-wrapper">
        <div class="follows">
          FOLLOWS<br/>1
        </div>
        <div class="following">
          FOLLOWING<br/>1
        </div>
      </div>
      <div class="description">description</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .user-details{
    .header{
      position: relative;
      width: 100%;
      height: 200px;
      background: url(../../assets/images/default_portrait.jpg) no-repeat center center;
      background-size: 100%;
      .bar{
        width: 100%;
        height: 56px;
        background: rgba(255, 255, 255, 0.4);
        .back{

        }
        .star{
          
        }
      }
      .name{
        font-size: 30px;
        font-weight: 300;
        color: #fff;
        text-align: left;
        margin-top: 35px;
        margin-left: 20px;
      }
      .portrait{
        display: block;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: #fff;
        border: 2px solid #fff;
        position: absolute;
        left: 20px;
        bottom: -40px;
      }
    }
    .userinfo{
      display: flex;
      flex-direction: column;
      padding: 20px;
      .follow-wrapper{
        display: flex;
        justify-content: flex-end;
        text-align: center;
        margin-bottom: 20px;
        color: #87878f;
        font-size: 13px;
        .follows{
          margin-right: 10px;
        }
        .following{
        }
      }
      .description{
        color: #87878f;
      }
    }
  }
</style>

<script>

export default {
  name: '',
  data () {
    return {
    }
  },
  methods: {}
}
</script>
