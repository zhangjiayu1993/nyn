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
    <ul>
      <li v-for="(item, index) in cartAcountData" :key="index">
      <van-card
        :title="item.get_goods.title"
        :desc="item.get_goods.desc"
        :thumb="item.get_goods.thumb">
        <div slot="footer">
          <span class="price">￥<i>{{item.get_goods.price}}</i></span>
          <span class="number">X{{item.num}}</span>
        </div>
      </van-card>
      </li>
    </ul>
  </div>
  <div class="agree-con">
    <van-checkbox v-model="agree"></van-checkbox>
    <div class="agreement">我同意<router-link to="/agreement">《美锦商城用户服务协议》</router-link></div>
  </div>
  <!--立即支付-->
  <van-submit-bar
    :price="price"
    button-text="立即支付"
    @submit="onSubmit"
  />
</div>
</template>

<script>
import { CART_DETAIL, ADDRESS_STATUS, ORDER_ADD, PAY_WECHAT } from '@/api/api-type';
import wx from 'weixin-js-sdk'
export default {
  name: 'FillingOrder',
  data () {
    return {
      agree: true,
      addrSelected: {
        name: '',
        tel: '0',
        address: ''
      },
      routefrom: this.$route.params.form,
      token: window.localStorage.getItem('TOKEN'),
      isAddrSeclected: false,
      addrLen: 0, // 是否有已添加的地址
      cartId: this.$store.state.cartId, // 购物车id
      cartAcountData: [],
      price: 0
    }
  },
  created() {
    // 结算购物车列表详情
    this.$axios.post(CART_DETAIL, {token: this.token, cart_id: this.cartId}).then(res => {
      this.cartAcountData = res.data.data
      let result = res.data.data
      for (let i in result) {
        this.price += result[i].num * result[i].get_goods.price * 100
      }
    });
    // 默认地址
    this.$axios.post(ADDRESS_STATUS, {token: this.token}).then(res => {
      let result = res.data.data
      if (res.data.error_code == 0) {
        this.isAddrSeclected = false
        if (this.routefrom == 'addressList') {
          this.addrSelected = this.$route.params.address
        } else {
          console.log(result)
          this.addrSelected = {
            address: result.prov + ' ' + result.city + ' ' + result.area,
            name: result.name,
            tel: result.mobile,
            provice: result.prov,
            city: result.city,
            country: result.area,
            areaCode: result.areaCode,
            id: result.id
          }
        }
      } else {
        this.isAddrSeclected = true
        this.addrSelected = {}
      }
    })
  },
  methods: {
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
      this.$store.state.chosenAddressId = this.addrSelected.id
      this.$router.push({
        path: '/addresslist',
        name: 'AddressList'
      })
    },
    // 立即支付
    onSubmit() {
      // this.$router.push({
      //   path: '/paysucess',
      //   name: 'PaySucess'
      // })
      let addrId = this.addrSelected.id
      let orderId = 0
      if (this.agree) {
        this.$axios.post(ORDER_ADD, {token: this.token, address_id: addrId, cart_id: this.cartId}).then(res => {
          if (res.data.error_code == 0) {
            orderId = res.data.data.id
            this.pay(orderId)
          }
        });
      } else {
        this.$dialog.alert({
          message: '请阅读同意《美锦商城用户服务协议》'
        })
      }
    },
    pay(id) {
      this.$axios.post(PAY_WECHAT, {token: this.token, order_id: id}).then(res => {
        if (res.data.error_code === 0) {
          let data = JSON.parse(res.data.data)
          wx.config({
            debug: false,
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timeStamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，微信签名，这个签名，和下面的paySign,不是同一个。生成方法，见http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html 附录1
            jsApiList: [
              'chooseWXPay'
            ] // 必填，需要使用的JS接口列表
          });
          wx.ready(function() {
            wx.chooseWXPay({
              appId: data.appId,
              timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
              package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: data.paySign, // 支付签名
              success: function (res) {
                alert('sucess' + res.errMsg);
                // 支付成功后的回调函数
                // if (res.err_msg === 'get_brand_wcpay_request:ok') {
                if (res.errMsg === 'chooseWXPay:ok') {
                  // this.$router.push({
                  //   path: '/paysucess',
                  //   name: 'PaySucess'
                  // })
                  window.location.href = 'http://meijin.benxiong.org.cn/paysucess'
                } else {
                  // this.$router.push({
                  //   path: '/payfailed',
                  //   name: 'PayFailed'
                  // })
                  window.location.href = 'http://meijin.benxiong.org.cn/payfailed'
                }
              },
              cancel: function (res) {
                alert('cancel' + res.errMsg);
                window.location.href = 'http://meijin.benxiong.org.cn/payfailed'
              }
            })
          });
        }
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
    display: inline-block;
    .van-checkbox__icon--checked .van-icon{
      background-color: #ed4e16;
      border-color: #ed4e16;
    }
  }
  .van-card{
    margin-top: 10px;
  }
}
</style>
<style scoped lang="less">
.wraper{
  min-height: 100%;
  background-color: #f4f4f4;
  .agreement{
    display: inline-block;
    padding-top: 15px;
    padding-bottom: 15px;
    overflow: hidden;
    a{
      color: #ed4e16;
    }
  }
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
