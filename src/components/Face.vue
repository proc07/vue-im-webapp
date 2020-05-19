<template functional>
  <ul class="face-comp" :class="{ hot: props.unReadNum, childs: props.faces.length !== 1 }" :unread-num="props.unReadNum">
    <!-- 头像 -->
    <li v-for="(face, index) in props.faces" :key="index">
      <img class="img" :src="face">
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Face',
  props: {
    unReadNum: Number,
    faces: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

.face-comp{
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
  align-content: center;
  border-radius: 4px;
  &.childs{
    padding: 1px;
    box-sizing: border-box;
    background: #ccc;
  }
  &.hot{
    &::before{
      content: attr(unread-num);
      position: absolute;
      right: -5px;
      top: -5px;
      padding: 0 5px;
      min-width: 6px;
      height: 16px;
      line-height: 16px;
      text-align: center;
      background: $color-background-unread;
      color: $color-txt-unread;
      border-radius: 8px;
      font-size: 11px;
    }
  }
  li {
    float: left;
    border-radius: 4px;
    overflow: hidden;
    list-style: none;
    padding: 1px;
    box-sizing: border-box;
    font-size: 0;
    img{
      width: 100%;
      height: 100%;
      background: #fff;
    }
  }
  /*1*/
  li:only-child{
    width: 100%;
    height: 100%;
    padding: 0;
  }
  /*2*/
  li:first-child:nth-last-child(2),
  li:first-child:nth-last-child(2) + li{
      width: 50%;
      height: 50%;
  }
  li:first-child:nth-last-child(2) + li {
      margin-left: 50%;
  }
  /*3*/
  li:first-child:nth-last-child(3),
  li:first-child:nth-last-child(3) ~ li {
      width: 50%;
      height: 50%;
  }
  li:first-child:nth-last-child(3) {
      margin-left: 25%;
  }
  li:first-child:nth-last-child(3) ~ li {
      float: left;
  }
  /*4*/
  li:first-child:nth-last-child(4),
  li:first-child:nth-last-child(4) ~ li {
      width: 50%;
      height: 50%;
      float: left;
  }
  /*5/6*/
  li:first-child:nth-last-child(5),
  li:first-child:nth-last-child(6){
      width:66.6%;
      height:66.55%; // 0.01 bug
  }
  li:first-child:nth-last-child(5) ~ li,
  li:first-child:nth-last-child(6) ~ li {
      width:33.3%;
      height:33.3%;
  }
  /* 7 8 9 */
  li:first-child:nth-last-child(7),
  li:first-child:nth-last-child(8),
  li:first-child:nth-last-child(9),
  li:first-child:nth-last-child(7) ~ li,
  li:first-child:nth-last-child(8) ~ li,
  li:first-child:nth-last-child(9) ~ li {
      width: 33.3%;
      height: 33.3%;
  }
  li:first-child:nth-last-child(7) {
      margin-left:33.3%;
      margin-right: 33.3%;
  }
  li:first-child:nth-last-child(8) {
      margin-left: 16.6%;
  }
}
</style>