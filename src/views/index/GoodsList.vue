<template>
<div class="content">
  <div class="wraper">
    <div class="categroy-title">
      <span>{{title}}</span>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      :loading-text="'加载中~'"
      @load="onLoad"
    >
    <ul class="goods">
      <router-link tag="li" to="" class="list" v-for="(list, index) in listData" :key="index">
        <div class="img-con">
          <img :src="list.thumb">
        </div>
        <div class="title ellipsis">{{list.title}}</div>
        <div class="description">{{list.desc | subDesc}}</div>
        <div class="price">￥{{list.price}}</div>
      </router-link>
    </ul>
      <!--<van-cell v-for="item in list" :key="item" :title="item + ''" />-->
    </van-list>
  </div>
</div>
</template>

<script>
import { GOODS_LIST } from '@/api/api-type'
export default {
  name: 'GoodsList',
  data() {
    return {
      title: this.$route.query.title,
      currentPage: 2,
      param: {
        category_id: this.$route.query.categoryId,
        page: 1,
        pagesize: 2
      },
      listData: [],
      loading: false,
      finished: false,
      totalPage: 0,
      list: []
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
      this.$axios.post(GOODS_LIST, param).then(res => {
        this.listData = res.data.data.data
        this.totalPage = res.data.data.total_page
        console.log(this.listData)
        console.log(111)
      })
    },
    onLoad() {
      let _this = this
      setTimeout(() => {
        let listParm = {
          category_id: _this.$route.query.categoryId,
          page: _this.param.page + 1,
          pagesize: 2
        }
        this.$axios.post(GOODS_LIST, listParm).then(res => {
          _this.listData = _this.listData.concat(res.data.data.data)
          _this.totalPage = res.data.data.total_page
          _this.loading = false
          _this.param.page++
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
        img{
          width: 100%;
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

</style>
