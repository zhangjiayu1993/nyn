<template>
<div class="content">
  <div class="wraper">
    <div class="categroy-title">
      <span>{{title}}</span>
    </div>
    <van-list
      class="goods"
      v-model="loading"
      :finished="finished"
      @load="onLoad"
    >
      <!--<router-link tag="li" to="" class="list" v-for="(list, index) in listData" :key="index">-->
        <!--<div class="img-con">-->
          <!--<img :src="list.thumb">-->
        <!--</div>-->
        <!--<div class="title ellipsis">{{list.title}}</div>-->
        <!--<div class="description">{{list.desc | subDesc}}</div>-->
        <!--<div class="price">￥{{list.price}}</div>-->
      <!--</router-link>-->
      <van-cell v-for="item in listData" :key="item" :title="item + ''" />
    </van-list>
    <!--<ul class="goods">-->
      <!--<router-link tag="li" to="" class="list" v-for="(list, index) in listData" :key="index">-->
        <!--<div class="img-con">-->
          <!--<img :src="list.thumb">-->
        <!--</div>-->
        <!--<div class="title ellipsis">{{list.title}}</div>-->
        <!--<div class="description">{{list.desc | subDesc}}</div>-->
        <!--<div class="price">￥{{list.price}}</div>-->
      <!--</router-link>-->
    <!--</ul>-->
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
      param: {
        category_id: this.$route.query.categoryId,
        page: 1,
        pagesize: 10
      },
      listData: [],
      loading: false,
      finished: false
    }
  },
  created() {
    this.initData()
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
    initData() {
      this.$axios.post(GOODS_LIST, this.param).then(res => {
        this.listData = res.data.data.data
        console.log(res.data.data.data)
      })
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
    display: flex;
    justify-content: space-between;
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
