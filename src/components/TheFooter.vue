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
      <van-tabbar-item to="/cart" :info="cartFooterCount">
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
import { mapGetters } from 'vuex'
import { CART_LIST } from '@/api/api-type'
export default {
  name: 'TheFooter',
  data() {
    return {
      message: this.selected,
      token: this.$store.state.token
    }
  },
  props: {
    selected: Number
  },
  computed: mapGetters([
    'cartFooterCount'
  ]),
  created() {
    this.$axios.post(CART_LIST, {token: this.token, page: 1, pagesize: 2}).then(res => {
      this.$store.state.cartFooterCount = res.data.data.count
      console.log(222)
    })
  }
}
</script>

<style scoped lang="less">
</style>
