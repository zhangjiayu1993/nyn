<template>
<div class="wraper">
  <!--banner-->
  <van-swipe :autoplay="3000" class="banner">
    <van-swipe-item>
      <img src="./images/banner.jpg">
    </van-swipe-item>
    <van-swipe-item>2</van-swipe-item>
    <van-swipe-item>3</van-swipe-item>
    <van-swipe-item>4</van-swipe-item>
  </van-swipe>
  <!--公司介绍-->
  <div class="gsjs">
    <img src="./images/index_02.jpg" class="image"/>
    <img src="./images/index_03.jpg" class="image"/>
    <img src="./images/index_04.jpg" class="image"/>
    <img src="./images/index_05.jpg" class="image"/>
  </div>
  <ul class="category-wraper">
    <router-link tag="li" :to="{path: '/goodslist', query:{categoryId: item.id, title: item.title}}" v-for="(item, index) in categoryData" :key="index">
      <div class="title"><img :src="item.thumb"></div>
      <div class="detail"><img :src="item.pic"></div>
    </router-link>
  </ul>
  <!--页脚-->
  <TheFooter :selected="selected"></TheFooter>
</div>
</template>

<script>
import TheFooter from '../../components/TheFooter'
import { ALL_CATEGORY, LOGIN } from '@/api/api-type'
export default {
  name: 'TheHome',
  components: {TheFooter},
  data() {
    return {
      selected: 0,
      categoryData: [],
      token: this.$store.state.token
    }
  },
  created () {
    this.initData();
    // 登录
    this.$axios.post(LOGIN).then(res => {
      console.log(res)
    })
    this.setToken()
  },
  methods: {
    initData() {
      this.$axios.post(ALL_CATEGORY, {token: this.token, page: 1, pagesize: 10}).then(res => {
        this.categoryData = res.data.data.data
        console.log(this.categoryData)
      })
    },
    setToken() {
      let storage = window.localStorage
      // let url = window.location.href + 'token=5cc915c437c43fb8129c2437db72d734';
      let url = window.location.href;
      let start = url.lastIndexOf('token')
      let TOKEN = ''
      if (start !== -1) {
        TOKEN = url.substr(url.lastIndexOf('token') + 6);
      }
      storage.setItem('TOKEN', TOKEN)
      console.log(url.lastIndexOf('token'))
    }
  }
}
</script>
<style scoped lang="less">
.wraper{
  padding-bottom: 55px;
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
    background-color: #e6e5e8;
    li{
      margin-bottom: 10px;
      .title{
        background-color: #fff;
        text-align: center;
        padding: 0.2rem 0;
        img{
          width: 0.8rem;
          height: 1rem;
        }
      }
      .detail{
        width: 100%;
        height: 3.4rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

</style>
