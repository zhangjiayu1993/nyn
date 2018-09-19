<template>
  <div class="wraper">
    <ul class="nav">
      <li @click="handpick()" :class="navType == 'handpick' ? 'active' : ''">精选</li>
      <li @click="all()" :class="navType == 'all' ? 'active' : ''">全部</li>
    </ul>
    <van-tabs v-model="navType">
      <van-tab>
        <keep-alive>
          <div class="item">
            <div class="img-con">
              <img src="./big-bg.png" alt="">
            </div>
            <div class="bottom">
              <div class="ellipsis title">一支只谈匠心不谈匠人的纯手工线香一支只谈匠心不谈匠人的纯手工线香</div>
              <div class="scan"><i class="iconfont icon-liulan"></i>871人浏览</div>
            </div>
            <div class="date">
              <span>2018</span>
              <span>7月2日</span>
            </div>
          </div>
        </keep-alive>
      </van-tab>
      <van-tab>
        <keep-alive>
          <div class="item">
            <div class="img-con">
              <img src="./big-bg.png" alt="">
            </div>
            <div class="bottom">
              <div class="ellipsis title">alll</div>
              <div class="scan"><i class="iconfont icon-liulan"></i>871人浏览</div>
            </div>
            <div class="date">
              <span>2018</span>
              <span>7月2日</span>
            </div>
          </div>
        </keep-alive>
      </van-tab>
      <van-tab>内容 3</van-tab>
      <van-tab>内容 4</van-tab>
    </van-tabs>
    <!--详情页-->
    <!--底部导航-->
    <TheFooter :selected="selected"></TheFooter>
  </div>
</template>

<script>
import TheFooter from '../../components/TheFooter'
import { CONTACT } from '@/api/api-type'

export default {
  name: 'TheInfo',
  components: {
    TheFooter
  },
  data() {
    return {
      navType: 'handpick', // 顶部导航分类
      selected: 1
    }
  },
  mounted () {
    // this.$axios.post(LOGIN).then(res => {
    //   console.log(res)
    // })
    this.initData()
  },
  methods: {
    // 初始化页面数据
    initData () {
      let self = this
      // this.$axios(this.url, {type: 1}).then(res => {
      self.$axios.post(CONTACT, this.qs.stringify({mobile: '18310413634', content: '1'}))
        .then(res => {
          console.log(res)
        })
    },
    handpick() {
      this.navType = 'handpick'
    },
    all() {
      this.navType = 'all'
    }
  }
}
</script>

<style scoped lang="less">
.wraper{
  width: 94%;
  margin: 0 auto;
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
  .item{
    position: relative;
    margin-top: 10px;
    margin-bottom: 0.2rem;
    border-radius: 0 0 0.4rem 0.4rem;
    box-shadow: 0 4px 11px 2px rgba(0,0,0,0.1);
    .img-con{
      width: 100%;
      height: 3.8rem;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
    .bottom{
      padding:0.2rem 0.25rem;
      .title{
        font-size: 0.3rem;
        color: #666;
      }
      .scan{
        font-size: 0.24rem;
        color: #8c8c8c;
        i{
          margin-right: 10px;
        }
      }
    }
    .date{
      position: absolute;
      top: -8px;
      left: 10px;
      width: 1.22rem;
      height: 1.1rem;
      background: url("./bg.png") no-repeat;
      background-size: 100%;
      padding-top: 5px;
      span{
        display: block;
        text-align: center;
        font-size: 0.24rem;
        color: #000;
        &:first-child:after{
          content: '';
          display: block;
          width: 40%;
          border-bottom: 1px solid #666666;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
