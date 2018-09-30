<template>
<div class="wraper">
  <!--banner-->
  <van-swipe :autoplay="3000" class="banner">
    <van-swipe-item v-for="(item, index) in goodData.get_goods_pic" :key="index"><img :src="item.url"></van-swipe-item>
  </van-swipe>
  <div class="good-desc">
    <div class="title">{{goodData.title}}</div>
    <div class="desc">{{goodData.desc}}</div>
    <div class="sell">
      <span class="price"><i>￥</i>{{goodData.price}}</span>
      <span class="sales">销量{{goodData.num}}</span>
    </div>
    <div class="select-num">
      <span class="tip">数量选择</span>
      <span class="steper"><van-stepper v-model="selectVal" :max="99"/></span>
    </div>
  </div>
  <div class="headline"><span><i class="iconfont icon-tupian"></i>商品详情</span></div>
  <div class="good-de"><div v-html="goodData.content"></div></div>
  <!--商品页行动点-->
  <van-goods-action>
    <van-goods-action-mini-btn icon="cart" text="购物车" @click="shopCart" :info="cartFooterCount"/>
    <van-goods-action-big-btn text="加入购物车" @click="addShopCart(goodData.id)" />
    <van-goods-action-big-btn text="立即购买" @click="buyNow(goodData.id)" primary />
  </van-goods-action>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GOODS_DETAIL, CART_ADD, CART_LIST } from '@/api/api-type'
export default {
  name: 'GoodsDetail',
  data() {
    return {
      token: window.localStorage.getItem('TOKEN'),
      goodId: this.$route.query.goodId,
      goodData: [],
      selectVal: 1, // 进步器默认值
      isBuyNow: false // 是否立即购买
    }
  },
  created () {
    this.initData();
    this.cartCount()
  },
  computed: {
    ...mapGetters([
      'cartFooterCount'
    ])
  },
  methods: {
    // 初始化页面数据
    initData() {
      this.$axios.post(GOODS_DETAIL, {goods_id: this.goodId}).then(res => {
        this.goodData = res.data.data
        console.log(res.data.data)
      })
    },
    // 计算购物车商品数量
    cartCount() {
      this.$axios.post(CART_LIST, {token: this.token, page: 1, pagesize: 2}).then(res => {
        if (res.data.error_code == 0) {
          let result = res.data.data;
          this.$store.state.cartFooterCount = result.count;
          // 是否点击立即购买，如果立即购买，页面跳转
          if (this.isBuyNow) {
            let cartId = [];
            cartId.push(result.data[0].id);
            this.$store.state.cartId = cartId;
            this.$router.push({
              path: '/fillingorder',
              name: 'FillingOrder'
            })
          }
        }
      })
    },
    // 购物车
    shopCart() {
      this.$router.replace({
        path: '/cart',
        name: 'TheCart'
      })
    },
    // 加入购物车
    addShopCart(goodId) {
      this.$axios.post(CART_ADD, {goods_id: goodId, token: this.token, num: this.selectVal}).then(res => {
        if (res.data.error_code == 0) {
          this.$toast('已成功加入购物车~')
          this.cartCount()
        } else {
          this.$toast(res.data.error_msg)
        }
      })
    },
    // 立即购买
    buyNow(goodId) {
      this.isBuyNow = true;
      // 先加入购物车
      this.$axios.post(CART_ADD, {goods_id: goodId, token: this.token, num: this.selectVal}).then(res => {
        if (res.data.error_code == 0) {
          this.cartCount()
        } else {
          this.$toast(res.data.error_msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
.good-de{
  img{
    width: 100%;
  }
}
</style>
<style scoped lang="less">
.wraper{
  min-height: 100%;
  background-color: #f4f4f4;
  .banner{
    height: 6rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .good-desc{
    background-color: #fff;
    width: 94%;
    padding: 10px 3%;
    .title{
      font-size: 0.32rem;
      color: #333;
    }
    .desc{
      font-size: 0.24rem;
      color: #666;
    }
    .sell{
      display: flex;
      line-height: 0.7rem;
      margin-top: 0.2rem;
      border-bottom: 1px solid #e6e6e6;
      .price{
        color: #ed4e16;
        font-size: 0.46rem;
        flex: 1;
        i{
          font-size: 0.36rem;
        }
      }
      .sales{
        color: #999;
        font-size: 0.24rem;
        flex: 1;
        text-align: right;
      }
    }
    .select-num{
      display: flex;
      margin-top: 0.2rem;
      span{
        flex: 1;
        &.tip{
          text-align: left;
        }
        &.steper{
          text-align: right;
        }
      }
    }
  }
  .headline{
    text-align: center;
    line-height: 0.85rem;
    color: #999;
    font-size: 0.24rem;
    i{
      margin-right: 5px;
      vertical-align: middle;
    }
    span:before{
      content: '';
      display: inline-block;
      width: 1rem;
      border-bottom: 1px solid #ccc;
      vertical-align: middle;
      margin-right: 10px;
    }
    span:after{
      content: '';
      display: inline-block;
      width: 1rem;
      border-bottom: 1px solid #ccc;
      vertical-align: middle;
      margin-left: 10px;
    }
  }
  .van-button--bottom-action{
    background-color: #333333;
  }
  .van-button--bottom-action.van-button--primary{
    background-color: #f44;
  }
  /*.van-goods-action-mini-btn{*/
    /*min-width: 50%;*/
  /*}*/
}
</style>
