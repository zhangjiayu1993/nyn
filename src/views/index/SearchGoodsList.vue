<template>
<div class="content">
  <div class="wraper">
    <div class="categroy-title">
      <!--<span>{{title}}</span>-->
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      :loading-text="loadingText"
      :immediate-check="immediateCheck"
      @load="onLoad"
    >
    <ul class="goods" v-if="listData.length > 0">
      <router-link tag="li" :to="{path: 'goodsdetail', query: {goodId: list.id}}" class="list" v-for="(list, index) in listData" :key="index">
        <div class="img-con">
          <img :src="list.thumb">
        </div>
        <div class="title ellipsis">{{list.title}}</div>
        <div class="description">{{list.desc | subDesc}}</div>
        <div class="price">￥{{list.price}}</div>
      </router-link>
    </ul>
      <div v-else class="nodada">~暂无商品~</div>
    </van-list>
  </div>
</div>
</template>

<script>
import { GOODS_KEYWORD } from '@/api/api-type'
export default {
  name: 'SearchGoodsList',
  data() {
    return {
      title: this.$route.query.title,
      currentPage: 2,
      param: {
        keyword: this.$route.query.seachVal,
        page: 1,
        pagesize: 10
      },
      listData: [],
      loading: false,
      finished: false,
      totalPage: 0,
      immediateCheck: false,
      loadingText: '加载中~',
      list: [],
      seachVal: this.$route.query.seachVal
      // isSearch: this.$route.query.isSearch
    }
  },
  created() {
    this.initData(this.param)
  },
  filters: {
    subDesc: (val) => {
      let str = ''
      if (val.length > 20) {
        str = val.substr(0, 20) + '....'
      } else {
        str = val
      }
      return str
    }
  },
  methods: {
    initData(param) {
      this.$axios.post(GOODS_KEYWORD, param).then(res => {
        if (res.data.error_code == 0) {
          this.listData = res.data.data.data
          this.totalPage = res.data.data.total_page
          console.log(this.listData)
        } else {
          this.loading = false
          this.finished = true;
          // console.log(1222)
        }
        // console.log(111)
      })
    },
    onLoad() {
      let _this = this
      setTimeout(() => {
        let listParm = {
          keyword: _this.seachVal,
          page: _this.param.page + 1,
          pagesize: 10
        }
        this.$axios.post(GOODS_KEYWORD, listParm).then(res => {
          if (res.data.error_code == 0) {
            _this.listData = _this.listData.concat(res.data.data.data)
            _this.totalPage = res.data.data.total_page
            _this.loading = false
            _this.param.page++
          } else {
            // console.log(1)
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

<style scoped lang="less">
.content{
  background-color: #f4f4f4;
  overflow: hidden;
  min-height: 100%;
}
.wraper{
  width: 94%;
  margin: 0 auto;
  .categroy-title{
    text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
    font-size: 0.3rem;
    span:before{
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      margin-right: 15px;
      border-bottom: 1px solid #d9d9d9;
    }
    span:after{
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      margin-left: 15px;
      border-bottom: 1px solid #d9d9d9;
    }
  }
  .goods{
    display: -webkit-flex; /* Safari */
    -webkit-justify-content: space-between; /* Safari 6.1+ */
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
    width: 100%;
    .list{
      background-color: #fff;
      height: 6rem;
      width: 3.43rem;
      margin-bottom: 15px;
      .img-con{
        display: inline-block;
        width: 3.43rem;
        height: 3.43rem;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .title{
        padding: 0 0.15rem 0.15rem 0.15rem;
        font-size: 0.26rem;
      }
      .description{
        padding: 0 0.15rem 0 0.15rem;
        font-size: 0.26rem;
        color: #999;
        line-height: 0.32rem;
        height: 0.64rem;
        margin-bottom: 0.15rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .price{
        padding: 0 0.15rem;
        color: #ed4e16;
        font-weight: bold;
      }
    }
  }
}
.nodada{
  text-align: center;
  line-height: 40px;
  margin-top: 30px;
  font-size: 0.28rem;
  color: #999;
}
</style>
