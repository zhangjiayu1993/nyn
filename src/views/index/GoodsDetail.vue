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
      <span class="steper"><van-stepper v-model="selectVal" @change="addGood(goodData.id)"/></span>
    </div>
  </div>
  <div class="headline"><span><i class="iconfont icon-tupian"></i>商品详情</span></div>
  <div class="good-de"><div v-html="goodData.content"></div></div>
  <!--商品页行动点-->
  <van-goods-action>
    <van-goods-action-mini-btn icon="cart" text="购物车" @click="shopCart" :info="count"/>
    <van-goods-action-big-btn text="加入购物车" @click="addShopCart" />
    <van-goods-action-big-btn text="立即购买" @click="buyNow" primary />
  </van-goods-action>
</div>
</template>

<script>
import { GOODS_DETAIL, CART_ADD } from '@/api/api-type'
export default {
  name: 'GoodsDetail',
  data() {
    return {
      token: this.$store.state.token,
      goodId: this.$route.query.goodId,
      goodData: [],
      selectVal: 1, // 进步器默认值
      count: ''
    }
  },
  created () {
    this.initData()
  },
  methods: {
    // 初始化页面数据
    initData() {
      this.$axios.post(GOODS_DETAIL, {goods_id: this.goodId}).then(res => {
        this.goodData = res.data.data
        console.log(res.data.data)
      })
    },
    // 添加商品
    addGood(goodId) {
      console.log(this.selectVal)
      this.$axios.post(CART_ADD, {goods_id: goodId, token: this.token, num: this.selectVal}).then(res => {
        this.count = this.selectVal
        console.log(res.data.data)
      })
    },
    // 购物车
    shopCart() {
      this.$router.replace({
        path: '/cart',
        name: 'TheCart',
        query: {
        }
      })
    },
    // 加入购物车
    addShopCart() {},
    // 立即购买
    buyNow() {
      this.$router.push({
        path: '/fillingorder',
        name: 'FillingOrder'
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
}
</style>
