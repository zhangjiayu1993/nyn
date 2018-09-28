<template>
  <div class="wraper cart">
    <ul class="cart-list-con">
      <li v-if="cartLisLCount > 0">
        <van-swipe-cell :right-width="65" v-for="(item, index) in cartList" :key="index">
          <van-checkbox v-model="checked"></van-checkbox>
          <van-card
            :title="item.get_goods.title"
            :desc="item.get_goods.desc"
            :thumb="item.get_goods.thumb"
          >
            <div slot="footer">
              <span class="price">￥{{item.get_goods.price}}</span>
              <van-stepper v-model="item.num" @change="changeCount(item.id, item.num)"/>
            </div>
          </van-card>
          <span slot="right" @click="deleteCart(item.id)">删除</span>
        </van-swipe-cell>
      </li>
      <li v-else class="no-good">购物车空空如也~快去选择心仪的宝贝吧~~</li>
    </ul>
    <!--底部提交订单-->
    <van-submit-bar
      :price="3050"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="allChecked">全选</van-checkbox>
    </van-submit-bar>
    <!--底部导航-->
    <TheFooter :selected="selected"></TheFooter>
  </div>
</template>

<script>
import TheFooter from '../../components/TheFooter'
import { CART_LIST, CART_DELETE, CART_UPDATE } from '../../api/api-type'
export default {
  name: 'TheCart',
  components: {TheFooter},
  data() {
    return {
      selected: 2,
      checked: [],
      allChecked: [],
      token: this.$store.state.token,
      param: {
        page: 1,
        pagesize: 5
      },
      cartList: [], // 购物车列表
      cartLisLCount: 0 // 购物车商品数量
    }
  },
  created () {
    this.initData()
  },
  watch: {
    cartLisLCount: function (val, oldval) {
      return val
    }
  },
  methods: {
    initData() {
      this.param.token = this.token
      this.$axios.post(CART_LIST, this.param).then(res => {
        if (res.data.error_code == 0) {
          this.cartLisLCount = res.data.data.count
          this.$store.state.cartFooterCount = res.data.data.count
          this.cartList = res.data.data.data
        } else {
          this.cartLisLCount = 0
          this.$store.state.cartFooterCount = ''
        }
      })
    },
    // 删除订单
    deleteCart(id) {
      this.$dialog.confirm({
        message: '确定删除吗？'
      }).then(() => {
        this.$axios.post(CART_DELETE, {token: this.token, cart_id: id}).then(res => {
          if (res.data.error_code == 0) {
            this.$toast('删除成功~')
          } else {
            this.$toast('删除失败~')
          }
          this.initData()
          // setTimeout(this.initData(), 500)
        })
      });
    },
    // 修改订单数目
    changeCount(id, val) {
      console.log(1)
      console.log(val)
      this.$axios.post(CART_UPDATE, {token: this.token, cart_id: id, num: 5}).then(res => {
        console.log(res)
        if (res.data.error_code == 0) {
          this.cartList.num = val
        }
      })
    },
    // 提交订单
    onSubmit() {
    }
  }
}
</script>

<style lang="less">
.wraper.cart{
  /* 提交订单按钮颜色 */
  .van-button--danger{
    background-color: #1c1d1d;
    border-color: #1c1d1d;
  }
  /*checkbox 颜色修改*/
  .van-checkbox__icon--checked .van-icon{
    background-color: #ed4e16;
    border-color: #ed4e16;
  }
  .van-submit-bar__price{
    color: #ed4e16;
  }
  .van-card__thumb{
    left: 40px;
    background-color: #000;
  }
  .van-card__footer{
    box-sizing: border-box;
    width: 100%;
    padding-left: 140px;
    right: auto;
    left: 0;
    .price{
      float: left;
      color: #ed4e16;
    }
    .van-stepper{
      float: right;
      margin-right: 15px;
    }
  }
  .van-swipe-cell__right {
    color: #FFFFFF;
    font-size: 15px;
    width: 65px;
    height: 100px;
    display: inline-block;
    text-align: center;
    line-height: 100px;
    background-color: #ff3b30;
    span{
      display: block;
    }
  }
}
</style>
<style scoped lang="less">
.wraper{
  min-height: 100%;
  background-color: #f4f4f4;
  .van-card{
    padding-left: 140px;
  }
  .van-swipe-cell{
    .van-checkbox{
      position: absolute;
      z-index: 2;
      left: 10px;
      top: 30px;
    }
  }
  .van-submit-bar{
    bottom: 50px;
    .van-checkbox{
      margin-left: 10px;
    }
  }
  .no-good{
    color: #999;
    font-size: 0.26rem;
    text-align: center;
    padding: 5rem 15px 0 15px;
  }
}
</style>
