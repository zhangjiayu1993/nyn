<template>
<div class="wraper">
  <div class="avatar">
    <img src="./avatar.jpg" class="image"/>
    <span class="name">周杰伦</span>
  </div>
  <van-cell-group class="cell">
    <van-cell is-link>
      <template slot="title">
        <i class="iconfont icon-dingdan"></i>
        <span class="van-cell-text">我的订单</span>
      </template>
    </van-cell>
    <van-cell  is-link>
      <template slot="title">
        <i class="iconfont icon-hezuo"></i>
        <span class="van-cell-text">商务合作</span>
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group class="cell">
    <van-cell is-link>
      <template slot="title">
        <i class="iconfont icon-guanyuwomen"></i>
        <span class="van-cell-text">关于我们</span>
      </template>
    </van-cell>
  </van-cell-group>
  <TheFooter :selected="selected"></TheFooter>
</div>
</template>

<script>
import TheFooter from '../../components/TheFooter'
export default {
  name: 'TheMy',
  components: {TheFooter},
  data() {
    return {
      selected: 3
    }
  }
}
</script>

<style scoped lang="less">
.wraper{
  min-height: 100%;
  background-color: #f4f4f4;
  .avatar{
    width: 100%;
    height: 1.6rem;
    padding-top: 0.4rem;
    background: url("./bg.jpg") no-repeat;
    background-size: 100%;
    margin-bottom: 10px;
    .image{
      display: inline-block;
      vertical-align: middle;
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      margin-left: 3%;
      margin-right: 10px;
    }
    .name{
      display: inline-block;
      line-height: 1.2rem;
    }
  }
  .cell{
    margin-bottom: 10px;
    .icon-dingdan{
      color: #da8988;
    }
    .icon-hezuo{
      color: #d4ca79;
    }
    .icon-guanyuwomen{
      color: #da8988;
    }
  }
}
</style>
