<template>
  <div class="signin-wrapper">
    <div class="linear-gradient"></div>
    <div class="signin container" v-show="true">
      <h1 class="title">欢迎您！</h1>
      <div class="signin-form">
        <div class="form-item account">
          <svg-icon icon-class="ic_phone" class="icon" />
          <input type="text" placeholder="邮箱/手机号" class="">
        </div>
        <div class="form-item password">
          <svg-icon icon-class="ic_key" class="icon" />
          <input type="password" placeholder="密码" class="">
        </div>
        <div class="form-item person">
          <svg-icon icon-class="ic_person" class="icon" />
          <input type="text" placeholder="名字" class="">
        </div>
      </div>
      <router-link tag="div" to="/login" class="tips-signin">已有账户？去登录 ></router-link>

      <div class="signin-btn">注册</div>
    </div>
    <div class="update-info container" v-show="false">
      <h2 class="title">仅差一步了</h2>
      <div class="uploading">
        <div class="box">
          <div class="haed-portrait">
            <svg-icon icon-class="ic_add" class="add-icon" />
          </div>
          <div class="sex">
            <div class="man svg-sex">
              <svg-icon icon-class="ic_sex_man" />
            </div>
            <div class="woman svg-sex">
              <svg-icon icon-class="ic_sex_woman" />
            </div>
          </div>
        </div>
      </div>
      <div class="please-select">请选择你的专属头像</div>
      <input type="text" placeholder="用一句话介绍自己" class="introduce" >

      <div class="submit-btn">提交</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .signin-wrapper{
    width: 100%;
    height: 100%;
    background: url('../assets/images/bg_src_tianjin.jpg') no-repeat center center;
    background-size: cover;
    position: relative;

    .linear-gradient{
      width: 100%;
      height: 100%;
      // background: rgba(20, 114, 250, 0.6);
      background-image: linear-gradient(rgba(20, 114, 250, 0.3), rgba(20, 114, 250, 0.6));
    }

    .container{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
    }

    .signin{
      .title{
        font-size: 26px;
        color: #fff;
        height: 80px;
        line-height: 80px;
        padding-bottom: 40px;
      }
      .signin-form{
        border-radius: 4px;
        overflow: hidden;
        .form-item{
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.8);
          .icon{
            width: 40px;
            font-size: 20px;
            color: #1472fa;
          }
          &.account{
          }
          &.password{
          }
          &.person{
            input{
              border-bottom: none;
            }
          }
          input{
            background: none;
            flex: 1;
            height: 50px;
            line-height: 50px;
            padding: 10px;
            box-sizing: border-box;
            outline: 0;
            font-size: 12px;
            border-bottom: 1px solid #ccc;
          }
        }
      }
      .tips-signin{
        text-align: right;
        color: #fff;
        margin-top: 15px;
        font-size: 12px;
      }
      .signin-btn{
        position: absolute;
        left: 50%;
        bottom: 30px;
        margin-left: -80px;
        width: 160px;
        height: 40px;
        line-height: 40px;
        border-radius: 50px;
        background: rgba(0, 0, 0, 0.5);
        color: rgba(255, 255, 255, 0.8);
        text-align: center;
        &:active{
          background: rgba(0, 0, 0, 0.2);
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }

    .update-info{
      .title{
        color: #fff;
        font-size: 26px;
      }
      .uploading{
        padding-top: 30px;
        .box{
          position: relative;
          width: 82px;
          height: 82px;
          margin: 0 auto;
          .haed-portrait{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 1px solid #fff;
            background: rgba(255, 255, 255, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            .add-icon{
              color: #fff;
            }
          }
          .sex{
            position: absolute;
            right: 10px;
            bottom: 2px;
            width: 20px;
            height: 20px;
            .svg-sex{
              position: absolute;
              left: 0;
              top: 0;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              border: 1px solid #fff;
              padding: 3px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #fff;
            }
            .man{
              background: #44a2ee;
              z-index: 2;
            }
            .woman{
              background: #ea55da;
              z-index: 1;
            }
          }
        }
      }
      .please-select{
        color: #fff;
        font-size: 12px;
        text-align: center;
        margin-top: 5px;
      }
      .introduce{
        width: 100%;
        background: none;
        border-bottom: 1px solid #fff;
        color: #fff;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        outline: 0;
        margin-top: 20px;
        &::placeholder{
          color: #fff9;
        }
      }
      .submit-btn{
        position: absolute;
        left: 50%;
        bottom: 30px;
        margin-left: -80px;
        width: 160px;
        height: 40px;
        line-height: 40px;
        border-radius: 50px;
        background: rgba(0, 0, 0, 0.5);
        color: rgba(255, 255, 255, 0.8);
        text-align: center;
        &:active{
          background: rgba(0, 0, 0, 0.2);
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }

  }
</style>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
