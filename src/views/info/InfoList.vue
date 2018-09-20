<template>
  <div>
    <div class="item" v-for="(item, index) in listData" :key="index">
      <router-link :to="{path: '/infodetail', name: 'InfoDetal', query:{info_id: item.id}}">
        <div class="img-con">
          <img :src="item.thumb" alt="">
        </div>
        <div class="bottom">
          <div class="ellipsis title">{{item.title}}</div>
          <div class="scan"><i class="iconfont icon-liulan"></i>{{item.view}}人浏览</div>
        </div>
        <div class="date">
          <span>{{item.created_at | year}}</span>
          <span>{{item.created_at | mouth}}月{{item.created_at | date}}日</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { year, mouth, date } from '../../assets/js/date'
export default {
  name: 'InfoList',
  props: {
    listData: Array
  },
  filters: {
    year: (time) => {
      return year(time)
    },
    mouth: (time) => {
      return mouth(time)
    },
    date: (time) => {
      return date(time)
    }
  }
}
</script>

<style scoped lang="less">
  .item{
    position: relative;
    margin-top: 0.6rem;
    margin-bottom: 0.2rem;
    border-radius: 0 0 0.4rem 0.4rem;
    box-shadow: 0 4px 11px 2px rgba(0,0,0,0.1);
    &:first-child{
      margin-top: 0.4rem;
    }
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
</style>
