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
      <div class="title">{{item.id}}</div>
      <div class="detail">{{item.title}}</div>
    </router-link>
  </ul>
  <!--页脚-->
  <TheFooter :selected="selected"></TheFooter>
</div>
</template>

<script>
import TheFooter from '../../components/TheFooter'
import { ALL_CATEGORY } from '@/api/api-type'
export default {
  name: 'TheHome',
  components: {TheFooter},
  data() {
    return {
      selected: 0,
      token: '',
      categoryData: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData() {
      this.$axios.post(ALL_CATEGORY, {token: this.token, page: 1, pagesize: 10}).then(res => {
        this.categoryData = res.data.data.data
        console.log(this.categoryData)
      })
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
}

</style>
