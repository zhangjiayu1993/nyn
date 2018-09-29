<template>
<div class="wraper">
  <ul v-if="orderLen > 0">
    <li class="order" v-for="(items, index) in orderData" :key="index">
      <div class="top">订单号：{{items.sn}}</div>
      <div v-for="(item, index) in items.get_goods" :key="index">
        <van-card
          :title="item.title"
          :desc="item.desc"
          :thumb="item.thumb" >
          <div slot="footer">
            <span class="price">￥<i>{{item.price}}</i></span>
            <span class="number">X{{item.num}}</span>
          </div>
        </van-card>
      </div>
      <van-row class="bottom">
        <van-col span="20">运单号：{{items.logistics}}</van-col>
        <van-col span="4">{{items.status | deliverStatus}}</van-col>
      </van-row>
    </li>
  </ul>
  <div v-else class="no-data">~暂无订单，小主快去选购商品吧~</div>
</div>
</template>

<script>
import { ORDER_LIST } from '@/api/api-type'
export default {
  name: 'MyOrder',
  data() {
    return {
      param: {
        token: this.$store.state.token,
        page: 1,
        pagesize: 9
      },
      orderData: [],
      orderLen: 0
    }
  },
  created() {
    this.initData()
  },
  filters: {
    deliverStatus: (val) => {
      if (val === 0) {
        return '已取消'
      } else if (val === 1) {
        return '待支付'
      } else if (val === 2) {
        return '已支付'
      } else {
        return '已发货'
      }
    }
  },
  methods: {
    initData() {
      this.$axios.post(ORDER_LIST, this.param).then(res => {
        this.orderLen = res.data.data.count
        this.orderData = res.data.data.data
        console.log(this.orderData[0].get_goods[0].title)
      })
    }
  }
}
</script>

<style lang="less">
.order{
  .van-card__footer{
    box-sizing: border-box;
    width: 100%;
    padding-left: 140px;
    .number{
      float: right;
      font-size: 0.26rem;
    }
    .price{
      float: left;
      color: #ed4e16;
    }
  }
}
</style>
<style scoped lang="less">
.wraper{
  background-color: #f4f4f4;
  overflow: hidden;
  min-height: 100%;
  .order{
    background-color: #fff;
    margin-top: 10px;
    &:last-child{
      margin-bottom: 30px;
    }
    .van-card{
      background: #fff;
      border-bottom: 1px solid #eee;
    }
    .top{
      font-size: 0.24rem;
      padding: 5px 15px;
      border-bottom: 1px solid #eee;
    }
    .bottom{
      font-size: 0.24rem;
      padding: 5px 15px;
      /*border-top: 1px solid #eee;*/
    }
  }
}
</style>
