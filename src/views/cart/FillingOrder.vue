<template>
<div class="wraper fill-order">
  <div class="add-address" @click="addAddress" v-if="isAddrSeclected">
      <i class="iconfont icon-tianjia"></i>
      <div class="add-word">新增收货地址</div>
      <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
  </div>
  <div class="add-address" @click="selectAddress" v-else>
    <i class="iconfont icon-dizhi"></i>
    <div class="detail">
      <p class="clearfix">
        <span class="pull-left">收货人：{{addrSelected.name}}</span>
        <span class="pull-right">{{addrSelected.tel}}</span>
      </p>
      <p>收获地址：{{addrSelected.address}}</p>
    </div>
    <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
  </div>
  <!--已选择的商品-->
  <div class="order-selected">
    <van-card
      title="3"
      desc="3"
      :thumb="url">
      <div slot="footer">
        <span class="price">￥<i>3.00</i></span>
        <span class="number">X2</span>
      </div>
    </van-card>
  </div>
  <van-checkbox v-model="agree">我同意<i>《美锦商城用户服务协议》</i></van-checkbox>
  <!--立即支付-->
  <van-submit-bar
    :price="3050"
    button-text="立即支付"
    @submit="onSubmit"
  />
</div>
</template>

<script>
import { ADDRESS_LIST } from '@/api/api-type';
export default {
  name: 'FillingOrder',
  data () {
    return {
      agree: true,
      addrSelected: this.$route.params,
      token: this.$store.state.token,
      isAddrSeclected: false,
      addrLen: 0 // 是否有已添加的地址
    }
  },
  created() {
    if (JSON.stringify(this.addrSelected) == '{}') {
      this.isAddrSeclected = true
    } else {
      this.isAddrSeclected = false
    }
    this.$axios.post(ADDRESS_LIST, {token: this.token, page: 1, pagesize: 10}).then(res => {
      this.addrLen = res.data.data.data.length
    })
  },
  methods: {
    onSubmit() {},
    addAddress() {
      if (this.addrLen == 0) {
        this.$router.push({
          path: '/addressedit',
          name: 'AddressEdit'
        })
      } else {
        this.$router.push({
          path: '/addresslist',
          name: 'AddressList'
        })
      }
    },
    selectAddress() {
      this.$router.push({
        path: '/addresslist',
        name: 'AddressList'
      })
    }
  }
}
</script>

<style lang="less">
.fill-order{
  .order-selected{
    margin-top: 10px;
    .van-card__footer{
      box-sizing: border-box;
      width: 100%;
      padding-left: 130px;
      .number{
        float: right;
      }
      .price{
        float: left;
        color: #ed4e16;
      }
    }
  }
  .van-button--danger{
    background-color: #1c1d1d;
    border-color: #1c1d1d;
  }
  .van-submit-bar__text{
    padding-left: 15px;
    text-align: left;
    font-size: 0.34rem;
    .van-submit-bar__price{
      color: #ed4e16;
    }
  }
  .van-checkbox{
    padding: 15px;
    font-size: 0.26rem;
    span i{
      color: #ed4e16;
    }
    .van-checkbox__icon--checked .van-icon{
      background-color: #ed4e16;
      border-color: #ed4e16;
    }
  }
}
</style>
<style scoped lang="less">
.wraper{
  min-height: 100%;
  background-color: #f4f4f4;
  .add-address{
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding:15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    min-height: 100px;
    position: relative;
    background-color: #fff;
    color: #333;
    font-size: 14px;
    overflow: hidden;
    .icon-dizhi{
      font-size: 40px;
      display: inline-block;
      height: 70px;
      line-height: 70px;
      margin-right: 15px;
    }
    .detail{
      line-height: 24px;
      flex: 1;
    }
    .icon-tianjia{
      margin-right: 15px;
      font-size: 40px;
      vertical-align: middle;
      display: inline-block;
      color: #d3d3d3;
      height: 70px;
      line-height: 70px;
    }
    .add-word{
      flex: 1;
      line-height: 70px;
    }
    .van-icon-arrow{
      line-height: 70px;
    }
    &:before{
      content: '';
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      position: absolute;
      background: -webkit-repeating-linear-gradient(135deg,#ff6c6c 0,#ff6c6c 20%,transparent 0,transparent 25%,#3283fa 0,#3283fa 45%,transparent 0,transparent 50%);
      background: repeating-linear-gradient(-45deg,#ff6c6c 0,#ff6c6c 20%,transparent 0,transparent 25%,#3283fa 0,#3283fa 45%,transparent 0,transparent 50%);
      background-size: 80px;
    }
  }
}

</style>
