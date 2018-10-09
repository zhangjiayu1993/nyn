<template>
<div class="wraper">
  <ul v-if="orderLen > 0">
    <van-list
      v-model="loading"
      :finished="finished"
      :loading-text="'加载中~'"
      @load="onLoad"
    >
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
    </van-list>
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
        token: window.localStorage.getItem('TOKEN'),
        page: 1,
        pagesize: 3
      },
      orderData: [],
      orderLen: 0,
      loading: false,
      finished: false
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
        if (res.data.error_code == 0) {
          this.orderLen = res.data.data.count
          this.orderData = res.data.data.data
        } else {
          this.loading = false
          this.finished = true;
          this.$toast(res.data.error_msg)
        }
      })
    },
    onLoad() {
      let _this = this;
      setTimeout(() => {
        let listParm = {
          token: window.localStorage.getItem('TOKEN'),
          page: _this.param.page + 1,
          pagesize: 3
        }
        this.$axios.post(ORDER_LIST, listParm).then(res => {
          if (res.data.error_code == 0) {
            _this.orderData = _this.orderData.concat(res.data.data.data)
            _this.totalPage = res.data.data.total_page
            _this.loading = false
            _this.param.page++
          } else {
            _this.loading = false
            _this.finished = true;
          }
        })
        if (_this.param.page >= _this.totalPage) {
          _this.finished = true;
        }
      }, 500);
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
  .no-data{
    font-size: 0.24rem;
    color: #999;
    text-align: center;
    margin-top: 50%;
  }
}
</style>
