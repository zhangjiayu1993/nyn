<template>
<div class="wraper">
  <div class="order">
    <div class="top">订购号：121222</div>
    <van-card
      title="222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222"
      desc="eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
      :thumb="imageURL">
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
  <div class="order">
    <div class="top">订购号：121222</div>
    <van-card
      title="222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222"
      desc="eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
      :thumb="imageURL">
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
export default {
  name: 'MyOrder',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less">
.order{
  .van-card__footer{
    right: auto;
    .price, .number{
      display: inline-block;
    }
    .price{
      margin-right: 2.9rem;
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
