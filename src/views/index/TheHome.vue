<template>
<div class="wraper">
  <!--banner-->
  <van-swipe :autoplay="3000" class="banner">
    <van-swipe-item v-for="(list, index) in bannerData" :key="index">
      <a :href="list.url"><img :src="list.pic"></a>
    </van-swipe-item>
  </van-swipe>
  <form action="/">
    <van-search
      v-model="seachVal"
      placeholder="搜索商品"
      show-action
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
  </form>
  <!--商品分类-->
  <ul class="category-wraper clearfix">
    <router-link tag="li" :to="{path: '/goodslist', query:{categoryId: item.id, title: item.title}}" v-for="(item, index) in categoryData" :key="index">
      <div class="pic"><img :src="item.thumb"></div>
      <div class="title">{{item.title}}</div>
      <!--<div class="detail"><img :src="item.pic"></div>-->
    </router-link>
  </ul>
  <!--热销商品-->
  <div class="hot-good" v-if="newData.length > 0">
    <img src="./images/bg.jpg" width="100%">
    <van-swipe :width="200" :show-indicators="false" :loop="false" class="hot-swipe">
      <van-swipe-item v-for="(list, index) in newData" :key="index">
        <router-link tag="div" :to="{path: 'goodsdetail', query: {goodId: list.id}}" class="new-good">
          <div class="img-con">
            <img :src="list.thumb">
          </div>
          <div class="title ellipsis">{{list.title}}</div>
          <div class="description">{{list.desc | subDesc}}</div>
          <div class="price">￥{{list.price}}</div>
        </router-link >
      </van-swipe-item>
    </van-swipe>
  </div>
  <!--双十一特惠-->
  <div class='index-info-wraper' v-if="infoData.length > 0">
    <p class="t-title">双十一特惠</p>
    <van-swipe class="info-index">
      <van-swipe-item v-for="(list, index) in infoData" :key="index">
        <div>
          <div class="img-con">
            <img :src="list.thumb">
          </div>
          <div class="title">{{list.title | subDesc}}</div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
  <!--为你精选-->
  <div class="jx-wraper">
    <img src="./images/bg-2.jpg" width="100%">
    <van-list
      v-model="loading"
      :finished="finished"
      :loading-text="loadingText"
      :immediate-check="immediateCheck"
      @load="onLoad"
    >
      <ul class="goods">
        <router-link tag="li" :to="{path: 'goodsdetail', query: {goodId: list.id}}" class="jx-de" v-for="(list, index) in indexData" :key="index">
          <div class="new-good">
            <div class="img-con">
              <img :src="list.thumb">
            </div>
            <div class="title ellipsis">{{list.title}}</div>
            <div class="description">{{list.desc | subDesc}}</div>
            <div class="price">￥{{list.price}}</div>
          </div>
        </router-link>
      </ul>
    </van-list>
  </div>
  <!--页脚-->
  <TheFooter :selected="selected"></TheFooter>
</div>
</template>

<script>
import TheFooter from '../../components/TheFooter'
import { ALL_CATEGORY, BANNER_LIST, GOODS_NEWST, GOODS_INDEX, INFO_INDEX } from '@/api/api-type'
export default {
  name: 'TheHome',
  components: {TheFooter},
  data() {
    return {
      selected: 0,
      categoryData: [],
      bannerData: [],
      newData: [], // 最新商品
      indexData: [], // 商品推荐
      infoData: [], // 主页咨询
      token: window.localStorage.getItem('TOKEN'),
      seachVal: '', // 商品搜索关键字
      loading: false,
      finished: false,
      totalPage: 0,
      immediateCheck: false,
      loadingText: '加载中~',
      param: {
        page: 1,
        pagesize: 6
      }
    }
  },
  created () {
    this.setToken()
    this.initData();
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
      this.$axios.post(ALL_CATEGORY, {token: window.localStorage.getItem('TOKEN'), page: 1, pagesize: 10}).then(res => {
        this.categoryData = res.data.data.data
      });
      this.$axios.post(BANNER_LIST).then(res => {
        this.bannerData = res.data.data
      });
      // 最新商品
      this.$axios.post(GOODS_NEWST, {page: 1, pagesize: 10}).then(res => {
        this.newData = res.data.data.data
      });
      // 商品推荐
      this.$axios.post(GOODS_INDEX, {page: 1, pagesize: 10}).then(res => {
        this.indexData = res.data.data.data
      });
      // 主页咨询
      this.$axios.post(INFO_INDEX, {page: 1, pagesize: 5}).then(res => {
        this.infoData = res.data.data.data
      });
    },
    setToken() {
      let storage = window.localStorage
      // let url = window.location.href + 'token=0d35501dbe96a78fbf368e8ae1bc9089';
      let url = window.location.href;
      let start = url.lastIndexOf('token')
      let TOKEN = ''
      if (start !== -1) {
        TOKEN = url.substr(url.lastIndexOf('token') + 6);
        storage.setItem('TOKEN', TOKEN)
      }
    },
    // 搜索商品
    onSearch() {
      if (this.seachVal == '') {
        return false
      } else {
        this.$router.push({
          path: '/searchgoodslist',
          query: {
            seachVal: this.seachVal
            // isSearch: false
          }
        })
      }
    },
    onLoad() {
      let _this = this
      setTimeout(() => {
        let listParm = {
          page: _this.param.page + 1,
          pagesize: 6
        }
        this.$axios.post(GOODS_INDEX, listParm).then(res => {
          if (res.data.error_code == 0) {
            _this.indexData = _this.indexData.concat(res.data.data.data)
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
          // console.log(111)
        }
      }, 500);
    }
  }
}
</script>
<style lang="less">
.index-info-wraper{
  .van-swipe__indicator{
    width: 18px;
    height: 4px;
    border-radius: 3px;
  }
}
</style>
<style scoped lang="less">
.wraper{
  padding-bottom: 55px;
  background-color: #f4f4f4;
  .banner{
    height: 3.5rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .gsjs{
    .image{
      width: 100%;
    }
  }
  .category-wraper{
    background-color: #fff;
    margin-bottom: 10px;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    li{
      width: 25%;
      float: left;
      text-align: center;
      .pic{
        padding-top: 0.2rem;
        img{
          width: 1rem;
          height: 1rem;
        }
      }
      .title{
        font-size: 0.24rem;
      }
    }
  }
  .hot-good{
    .hot-swipe{
      height: 5.8rem;
    }
  }
  .index-info-wraper{
    background-color: #fff;
    width: 94%;
    padding: 0 3%;
    margin-top: 15px;
    .t-title{
      font-size: 0.32rem;
      text-align: center;
      line-height: 1.4rem;
    }
    .info-index{
      height: 4.8rem;
      .title{
        font-size: 0.28rem;
        color: #666;
        margin-top: 0.2rem;
        line-height: 0.3rem;
      }
      .img-con{
        width: 100%;
        height: 3.8rem;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  /*为你精选*/
  .jx-wraper{
    margin-top: 15px;
    .goods{
      display: -webkit-flex; /* Safari */
      -webkit-justify-content: space-between; /* Safari 6.1+ */
      display: flex;
      justify-content: space-between;
      flex-flow: row wrap;
      width: 94%;
      margin-left: auto;
      margin-right: auto;
      /*margin-top: 10px;*/
      .jx-de{
        background-color: #fff;
        height: 6rem;
        width: 3.43rem;
        margin-bottom: 15px;
      }
    }
  }
  .new-good{
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

</style>
