<template>
<div class="wraper">
  <!--banner-->
  <mt-swipe :auto="4000" class="banner">
    <mt-swipe-item>
      <img src="./images/banner.jpg">
    </mt-swipe-item>
    <mt-swipe-item>2</mt-swipe-item>
    <mt-swipe-item>3</mt-swipe-item>
  </mt-swipe>
  <!--公司介绍-->
  <div class="gsjs">
    <img src="./images/index_02.jpg" class="image"/>
    <img src="./images/index_03.jpg" class="image"/>
    <img src="./images/index_04.jpg" class="image"/>
    <img src="./images/index_05.jpg" class="image"/>
  </div>
  <!--页脚-->
  <TheFooter :selected="selected"></TheFooter>
</div>
</template>

<script>
import TheFooter from '../../components/TheFooter'
export default {
  name: 'TheHome',
  components: {TheFooter},
  data() {
    return {
      selected: 'home'
    }
  }
}
</script>
<style>
  .mint-swipe-indicator.is-active{
    background: #ed4e16 !important;
    opacity: 1;
  }
  .mint-swipe-indicator{
    opacity: 0.4;
  }
</style>
<style scoped lang="less">
.wraper{
  padding-bottom: 55px;
  .banner{
    height: 3.5rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .gsjs{
    .image{
      width: 100%;
    }
  }
}

</style>
