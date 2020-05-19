<template>
  <div class="group-wrapper">
    <div class="header">
      <div class="left">
        <svg-icon icon-class="ic_back" @click.native="back" class="icon-back" />
      </div>
      <div class="right">
        <svg-icon icon-class="ic_done" @click.native="done" class="icon-done" />
      </div>
    </div>
    <div class="content">
      <div class="icon">
        <svg-icon icon-class="ic_group_add" class="ic_group_add"></svg-icon>
      </div>
      <div class="form">
        <div class="name form-item">
          <label for="" class="label">群名称</label>
          <input type="text" class="input-field" v-model="groupForm.name">
        </div>
        <div class="description form-item">
          <label for="" class="label">群描述</label>
          <input type="text" class="input-field" v-model="groupForm.description">
        </div>
      </div>
    </div>
    <div class="members">
      <div class="select-all">
        <div class="label">群成员</div>
        <svg-icon
          @click.native="selectAll"
          :icon-class="checkedAll ? 'ic_check_circle_selected' : 'ic_check_circle_unselected'"
          class="ic_check_circle">
        </svg-icon>
      </div>
      <div class="list">
        <div class="item" v-for="item in contacts" :key="item.id">
          <img class="portrait" :src="item.targetUser.portrait">
          <div class="name">{{ item.targetAlias || item.targetUser.name }}</div>
          <svg-icon
            @click.native="selectMember(item.id)"
            :icon-class="checkedMemberMap[item.id] ? 'ic_check_circle_selected' : 'ic_check_circle_unselected'"
            class="ic_check_circle">
          </svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .group-wrapper{
    background: #f7f7f7;
    .header{
      height: 56px;
      display: flex;
      padding: 0 20px;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      background: #1372fa;
      .left {
        .icon-back{
          color: #fff;
          font-size: 20px;
        }
      }
      .right{
        .icon-done{
          color: #fff;
          font-size: 20px;
        }
      }
    }
    .content{
      background: #1372fa;
      height: 120px;
      padding: 10px 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .icon{
        width: 80px;
        height: 80px;
        flex: 0 0 80px;
        border-radius: 50%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        .ic_group_add{
          font-size: 40px;
          color: #607d8b;
        }
      }
      .form{
        display: flex;
        flex: 1;
        flex-direction: column;
        padding-left: 20px;
        .form-item{
          height: 40px;
          margin-bottom: 8px;
          .label{
            color: #fff;
            margin-right: 10px;
          }
          .input-field{
            color: #fff;
            background: #1372fa;
            outline: 0;
            border-bottom: 1px solid #fff;
            width: 100%;
          }
          &.name{

          }
          &.description{

          }
        }
      }
    }

    .members{
      padding: 20px;
      .select-all{
        display: flex;
        justify-content: space-between;
        padding-right: 12px;
        .label{
          font-size: 14px;
          color: #333;
        }
        .ic_check_circle{
          width: 20px;
          height: 20px;
          color: #3b4652;
        }
      }
      .list{
        margin-top: 12px;
        .item{
          background: #fff;
          display: flex;
          align-items: center;
          padding: 12px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          .portrait{
            flex: 0 0 35px;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin-right: 10px;
          }
          .name{
            flex: 1;
            font-size: 14px;
            color: #333;
          }
          .ic_check_circle{
            width: 20px;
            flex: 0 0 20px;
            height: 20px;
            color: #3b4652;
          }
        }
      }
    }
  }
</style>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { generateUUID } from '@/assets/js/util'

export default {
  name: 'CreateGroup',
  data () {
    return {
      groupForm: {
        uuid: generateUUID(),
        name: '',
        description: ''
      },
      checkedAll: false,
      checkedMemberMap: {
        length: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'contacts',
      'chatList'
    ])
  },
  methods: {
    ...mapMutations({
      setChatList: 'SET_CHATLIST'
    }),
    done () {
      const { name } = this.groupForm
      const members = this._getSelectMembers()

      if (!name.length) {
        this.$createToast({
          txt: '请填写群名称！',
          type: 'warn'
        }).show()
        return
      }
      if (!members.length) {
        this.$createToast({
          txt: '请选择群成员！',
          type: 'warn'
        }).show()
        return
      }
      this.$nodeApi.apply.CreateGroup({
        ...this.groupForm,
        members
      }).then(res => {
        // 添加数据到 chatlist
        console.log('CreateGroup', res)
        this.setChatList([res.data, ...this.chatList])
        this.back()
      })
    },
    back () {
      this.$router.back()
    },
    // 单选，切换
    selectMember (id) {
      const checkedMemberMap = this.checkedMemberMap
      if (checkedMemberMap[id]) {
        checkedMemberMap.length -= 1
      } else {
        checkedMemberMap.length += 1
      }

      this.checkedAll = checkedMemberMap.length === this._getContactsLength()
      this.$set(checkedMemberMap, id, !checkedMemberMap[id])
    },
    // 全选
    selectAll () {
      for (const key in this.contacts) {
        const val = this.contacts[key]
        this.$set(this.checkedMemberMap, val.id, !this.checkedAll)
      }
      this.checkedMemberMap.length = this.checkedAll ? 0 : this._getContactsLength()
      this.checkedAll = !this.checkedAll
    },
    // 获取好友的总数量
    _getContactsLength () {
      let count = 0
      for (const key in this.contacts) {
        if (this.contacts.hasOwnProperty(key)) {
          count++
        }
      }
      return count
    },
    // 获取选中的好友 (array)
    _getSelectMembers () {
      const checkedMemberMap = this.checkedMemberMap
      const res = []
      for (const key in checkedMemberMap) {
        if (key !== 'length' && checkedMemberMap[key]) {
          // targetUser，服务端需要全部成员的信息，推送给每个成员,
          res.push(this.contacts[key].targetUser)
        }
      }
      return res
    }
  }
}
</script>
