<template>
<div class="wraper">
  <div class="avatar">
    <img src="./avatar.jpg" class="image"/>
    <span class="name"></span>
  </div>
  <TheFooter :selected="selected"></TheFooter>
</div>
</template>

<script>
import TheFooter from '../../components/TheFooter'
export default {
  name: 'TheMy',
  components: {TheFooter},
  data() {
    return {
      selected: 'my'
    }
  }
}
</script>

<style scoped lang="less">
.wraper{
  padding-bottom: 55px;
  .avatar{
    width: 100%;
    height: 2rem;
    background: url("./bg.jpg") no-repeat;
    background-size: 100%;
    .image{
      display: inline-block;
      vertical-align: middle;
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      margin-top: 0.4rem;
      margin-left: 3%;
    }
  }
}
</style>
