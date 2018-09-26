<template>
  <div class="wraper cart">
    <van-swipe-cell :right-width="65" :on-close="onClose">
      <van-checkbox v-model="checked"></van-checkbox>
      <van-card
        title="标题"
        desc="描述"
        num="2"
        price="2.00"
        :thumb="src"
      >
        <div slot="footer">
          <span class="price">￥3.00</span>
          <van-stepper v-model="value"/>
        </div>
      </van-card>
      <span slot="right">删除</span>
    </van-swipe-cell>
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
import { CART_LIST } from '../../api/api-type'
export default {
  name: 'TheCart',
  components: {TheFooter},
  data() {
    return {
      selected: 2,
      checked: [],
      allChecked: [],
      param: {
        token: this.$store.state.token,
        page: 1,
        pagesize: 5
      }
    }
  },
  created () {
    this.initData()
    console.log(this.$route.path)
    console.log(this.comefrom)
  },
  methods: {
    initData() {
      this.$axios.post(CART_LIST, this.param).then(res => {
        console.log(res)
      })
    },
    // 左滑删除订单
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
          this.$dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            instance.close();
          });
          break;
      }
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
}
</style>
