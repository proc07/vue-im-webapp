<template>
  <div class="system-notiy">
    <div class="header">
      <div class="left">
        <svg-icon icon-class="ic_back" @click.native="$router.back()" class="icon-back" />
      </div>
      <div class="title">消息通知</div>
      <div class="right"></div>
    </div>
    <div class="notiy-list">
      <div
        class="notiy-friend"
        v-for="item in systemMsg.message || []"
        :key="item.id"
      >
        <div class="subject">新的朋友</div>
        <div class="item">
          <img class="portrait" :src="item.entity.applicantUser.portrait" alt="">
          <div class="info">
            <div class="name">{{ item.entity.applicantUser.name }}</div>
            <div class="content">{{ item.entity.description }}</div>
          </div>
          <div class="handler">
            <div class="status-agreed" v-if="item.entity.status === true">已添加</div>
            <div class="agreed-btn" @click="agreedAddFriend(item)" v-else>同意</div>
            <!-- <div class="status-wait" v-else>等待验证</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .system-notiy{
    .header{
      display: flex;
      height: 50px;
      line-height: 50px;
      justify-content: space-between;
      background-color: #edf0f4;
      color: #000;
      .left{
        padding-left: 12px;
        width: 50px;
        flex: 0 0 50px;
        box-sizing: border-box;
        .icon-back{
          font-size: 20px;
        }
      }
      .title{
        flex: 1;
        text-align: center;
      }
      .right{
        width: 50px;
        flex: 0 0 50px;
      }
    }
    .notiy-list{
      padding-top: 12px;
      .notiy-friend{
        padding: 0 12px 12px 12px;
        .subject{
          color: #9e9e9e;
          font-size: 13px;
          margin-bottom: 10px;
        }
        .item{
          display: flex;
          justify-content: space-between;
          .portrait{
            width: 55px;
            height: 55px;
            background: #ccc;
            border-radius: 5px;
            margin-right: 12px;
          }
          .info{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .name{
              font-size: 15px;
              line-height: 14px;
              margin-bottom: 6px;
            }
            .content{
              font-size: 13px;
              line-height: 14px;
              color: #9e9e9e;
              .tag{
                color: #edf0f4;
                background: #03a9f4;
                padding: 2px 6px;
                font-size: 10px;
                border-radius: 10px;
              }
            }
          }
          .handler{
            width: 60px;
            flex: 0 0 60px;
            font-size: 13px;
            display: flex;
            align-items: center;
            .agreed-btn{
              width: 50px;
              height: 25px;
              line-height: 25px;
              border-radius: 25px;
              text-align: center;
              background: #edf0f4;
              color: #000;
            }
            .status-agreed{
              color: #9e9e9e;
            }
            .status-wait{
              color: #9e9e9e;
            }
          }
        }
      }
    }
  }
</style>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SystemNotify',
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'systemMsg',
      'contacts'
    ])
  },
  activated () {
    this._setReadMsg(this.systemMsg.message)
  },
  methods: {
    ...mapMutations({
      setContacts: 'SET_CONTACTS'
    }),
    agreedAddFriend (item) {
      const applicantId = item.entity.applicantId
      this.$nodeApi.follow.ApplyUserFollow({
        originId: applicantId
      }).then(res => {
        this.$createToast({
          txt: '添加成功！',
          type: 'correct'
        }).show()
        item.entity.status = true
        this.$set(this.contacts, res.data.id, res.data)
      })
    },
    _setReadMsg (data) {
      let count = 0
      data.forEach(msgItem => {
        if (!msgItem.arrivalAt) {
          count++
          this.$chatSocket.setReadMsg(msgItem.id, (arrivalAt) => {
            msgItem.arrivalAt = arrivalAt
          })
        }
      })
      if (count > 0) {
        this.systemMsg.unReadNum -= count
      }
    }
  }
}
</script>
