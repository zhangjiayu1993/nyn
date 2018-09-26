<template>
<div class="wraper">
  <div class="order">
    <div class="top">订单号：</div>
    <van-card
      title="222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222"
      desc="eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
      :thumb="1">
      <div slot="footer">
        <span class="price">￥<i>3.00</i></span>
        <span class="number">X2</span>
      </div>
    </van-card>
    <van-row class="bottom">
      <van-col span="20">运单号：111</van-col>
      <van-col span="4">已发货</van-col>
    </van-row>
  </div>
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
        pagesize: 5
      },
      orderData: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.$axios.post(ORDER_LIST, this.param).then(res => {
        this.orderData = res.data.data.data
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
    }
    .price{
      float: left;
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
    .van-card{
      background: #fff;
    }
    .top{
      font-size: 0.24rem;
      padding: 5px 15px;
      border-bottom: 1px solid #eee;
    }
    .bottom{
      font-size: 0.24rem;
      padding: 5px 15px;
      border-top: 1px solid #eee;
    }
  }
}
</style>
