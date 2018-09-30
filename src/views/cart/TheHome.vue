<template>
  <div class="wraper cart">
    <ul class="cart-list-con">
      <li v-if="cartLisLCount > 0">
        <van-checkbox-group v-model="checkResult" @change="selectGood">
          <van-swipe-cell :right-width="65" v-for="(item, index) in cartList" :key="index">
            <van-checkbox :name="item" ></van-checkbox>
            <van-card
              :title="item.get_goods.title"
              :desc="item.get_goods.desc"
              :thumb="item.get_goods.thumb"
            >
              <div slot="footer">
                <span class="price">￥{{item.get_goods.price}}</span>
                <van-stepper v-model="item.num"  @change="changeCount(item.id, item.num)"/>
              </div>
            </van-card>
            <span slot="right" @click="deleteCart(item.id)">删除</span>
          </van-swipe-cell>
        </van-checkbox-group>
      </li>
      <li v-else class="no-good">购物车空空如也~快去选择心仪的宝贝吧~~</li>
    </ul>
    <!--底部提交订单-->
    <van-submit-bar
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
      :disabled="isSubmit"
    >
      <van-checkbox v-model="checked" @change="checkedAll">全选</van-checkbox>
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
      checked: true,
      token: window.localStorage.getItem('TOKEN'),
      param: {
        page: 1,
        pagesize: 5
      },
      cartList: [], // 购物车列表
      cartLisLCount: 0, // 购物车商品数量
      checkResult: [], // 复选框选择结果
      totalPrice: 0,
      cartId: [], // 订单提交id存储
      isSubmit: false // 是否可提交订单
    }
  },
  created () {
    this.initData();
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
          this.checkResult = this.cartList
          if (this.cartLisLCount == 0) {
            this.checked = false;
            this.isSubmit = true
          }
          this.calcuteTotalPrice()
        } else if (res.data.error_code == 5203) {
          this.cartLisLCount = 0
          this.$store.state.cartFooterCount = ''
          this.totalPrice = 0
          if (this.cartLisLCount == 0) {
            this.checked = false;
            this.isSubmit = true
          }
        } else {
          this.$toast(res.data.error_msg)
          this.totalPrice = 0
          this.$store.state.cartFooterCount = ''
          this.checked = false;
          this.isSubmit = true
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
        })
      });
    },
    // 修改订单数目
    changeCount(id, val) {
      this.totalPrice = 0
      this.$axios.post(CART_UPDATE, {token: this.token, cart_id: id, num: val}).then(res => {
        if (res.data.error_code == 0) {
          // 计算总金额
          this.calcuteTotalPrice()
        }
      })
    },
    // 选择商品
    selectGood() {
      let checkedLength = this.checkResult.length
      let cartLength = this.cartLisLCount
      if (checkedLength == cartLength) {
        this.checked = true
      } else {
        this.checked = false
      }
      // 计算总金额
      this.calcuteTotalPrice()
    },
    // 全选全不选
    checkedAll() {
      let checkedLength = this.checkResult.length
      let cartLength = this.cartLisLCount
      if (this.checked) {
        this.checkResult = this.cartList
      } else {
        if (checkedLength == cartLength) {
          this.checkResult = []
        }
      }
    },
    // 计算总金额
    calcuteTotalPrice () {
      let res = this.checkResult;
      let price = 0;
      this.cartId = []
      for (let i = 0; i < res.length; i++) {
        price += res[i].num * res[i].get_goods.price * 100
        this.cartId.push(res[i].id)
      }
      this.$store.state.cartId = this.cartId
      console.log(this.cartId)
      this.totalPrice = price
    },
    // 提交订单
    onSubmit() {
      this.$router.push({
        path: '/fillingorder',
        name: 'FillingOrder'
      })
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
  .van-button--disabled{
    background-color: #999999;
    color: #fff;
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
