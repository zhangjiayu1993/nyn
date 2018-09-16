<template>
  <div class="footer">
    <mt-tabbar v-model="message" fixed>
      <mt-tab-item id="home">
        <i slot="icon" class="iconfont icon-home"></i>
        首页
      </mt-tab-item>
      <mt-tab-item id="info">
        <i slot="icon" class="iconfont icon-info"></i>
        咨询
      </mt-tab-item>
      <mt-tab-item id="cart">
        <i slot="icon" class="iconfont icon-cart"></i>
        购物车
      </mt-tab-item>
      <mt-tab-item id="my">
        <i slot="icon" class="iconfont icon-my"></i>
        我的
      </mt-tab-item>
    </mt-tabbar>
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
    selected: String
  },
  watch: {
    message: function (val, oldVal) {
      // console.log(val)
      // console.log(oldVal)
      switch (val) {
        case 'home':
          this.$router.push({
            path: '/',
            name: 'TheHome'
          })
          break
        case 'info':
          this.$router.push({})
          break
        case 'cart':
          this.$router.push({})
          break
        case 'my':
          this.$router.push({
            path: '/my',
            name: 'TheMy'
          })
          break
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
