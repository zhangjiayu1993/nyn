<template>
  <div class="footer">
    <van-tabbar v-model="message" fixed>
      <van-tabbar-item to="/">
        <span>首页</span>
        <i slot="icon" slot-scope="props" class="iconfont icon-home"></i>
      </van-tabbar-item>
      <van-tabbar-item to="/info">
        <span>咨询</span>
        <i slot="icon" slot-scope="props" class="iconfont icon-info"></i>
      </van-tabbar-item>
      <van-tabbar-item to="/cart">
        <span>购物车</span>
        <i slot="icon" slot-scope="props" class="iconfont icon-cart"></i>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>我的</span>
        <i slot="icon" slot-scope="props" class="iconfont icon-my"></i>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TheFooter',
  data() {
    return {
      message: this.selected
    }
  },
  props: {
    selected: Number
  }
}
</script>

<style scoped lang="less">
</style>
