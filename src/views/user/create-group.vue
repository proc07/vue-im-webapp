<template>
  <div class="group-wrapper">
    <div class="header">
      <div class="left">
        <svg-icon icon-class="ic_back" @click.native="$router.back()" class="icon-back" />
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
            @click.native="selectMember(item.targetId)"
            :icon-class="selectMembers[item.targetId] ? 'ic_check_circle_selected' : 'ic_check_circle_unselected'"
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
        .form-item{
          height: 40px;
          line-height: 40px;
          .label{
            color: #fff;
            margin-right: 10px;
          }
          .input-field{
            color: #fff;
            background: #1372fa;
            outline: 0;
            border-bottom: 1px solid #fff;
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
import { mapGetters } from 'vuex'

export default {
  name: 'CreateGroup',
  data () {
    return {
      groupForm: {
        name: '',
        description: ''
      },
      checkedAll: false,
      selectMembers: {
        length: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'contacts'
    ])
  },
  methods: {
    done () {
      console.log(this._getSelectMemberId())
    },
    selectMember (targetId) {
      if (this.selectMembers[targetId]) {
        this.selectMembers.length -= 1
      } else {
        this.selectMembers.length += 1
      }

      this.checkedAll = this.selectMembers.length === this._getContactsLength()
      this.$set(this.selectMembers, targetId, !this.selectMembers[targetId])
    },
    selectAll () {
      for (const key in this.contacts) {
        const val = this.contacts[key]
        this.$set(this.selectMembers, val.targetId, !this.checkedAll)
      }
      this.selectMembers.length = this.checkedAll ? 0 : this._getContactsLength()
      this.checkedAll = !this.checkedAll
    },
    _getContactsLength () {
      let count = 0
      for (const key in this.contacts) {
        if (this.contacts.hasOwnProperty(key)) {
          count++
        }
      }
      return count
    },
    _getSelectMemberId () {
      const res = []
      for (const key in this.selectMembers) {
        if (key !== 'length' && this.selectMembers[key]) {
          res.push(key)
        }
      }
      return res
    }
  }
}
</script>
