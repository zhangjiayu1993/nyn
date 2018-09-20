<template>
  <div class="wraper">
    <ul class="nav">
      <li @click="handpick()" :class="navType == 'handpick' ? 'active' : ''">精选</li>
      <li @click="all()" :class="navType == 'all' ? 'active' : ''">全部</li>
    </ul>
    <ul>
      <li v-if="navType == 'handpick'">
        <keep-alive>
          <InfoList :listData="listData"></InfoList>
        </keep-alive>
      </li>
      <li v-else>
        <keep-alive>
          <InfoList :listData="listData"></InfoList>
        </keep-alive>
      </li>
    </ul>
    <!--详情页-->
    <!--底部导航-->
    <TheFooter :selected="selected"></TheFooter>
  </div>
</template>

<script>
import TheFooter from '../../components/TheFooter'
import { INFO_LIST } from '@/api/api-type'

import InfoList from './InfoList'
export default {
  name: 'TheInfo',
  components: {
    TheFooter,
    InfoList
  },
  data() {
    return {
      navType: 'handpick', // 顶部导航分类
      selected: 1, // 底部导航高亮
      listData: [],
      param: {
        type: '1',
        page: '1',
        pagesize: '10'
      }
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    // 初始化页面数据
    initData () {
      this.$axios.post(INFO_LIST, this.param)
        .then(res => {
          this.listData = res.data.data.data
          console.log(this.listData)
        })
    },
    handpick() {
      this.navType = 'handpick'
      this.param.type = 1
      this.initData()
    },
    all() {
      this.navType = 'all'
      this.param.type = 0
      this.initData()
    }
  }
}
</script>

<style scoped lang="less">
.wraper{
  width: 94%;
  margin: 0 auto;
  padding-bottom: 50px;
  overflow: hidden;
  .nav{
    width:4rem;
    height: 0.8rem;
    border-radius: 0.4rem;
    border: 1px solid #494a4a;
    margin: 0.3rem auto;
    overflow: hidden;
    display: flex;
    li{
      flex: 1;
      width: 1.95rem;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.3rem;
      &.active{
        background-color: #494a4a;
        color: #fff;
      }
    }
  }
}
</style>
