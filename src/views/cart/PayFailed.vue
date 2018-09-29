<template>
  <div class="wraper">
    <div class="container">
      <img src="./zf_sb_iocn.png" class="image">
      <div class="word">您的订单支付失败，请重试</div>
      <router-link to="myorder" tag="div" class="btn">查看订单</router-link>
      <router-link to="/" tag="div" class="btn plain">再等等</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayFailed',
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
  .wraper{
    background-color: #fff;
    min-height: 100%;
    overflow: hidden;
    .container{
      width: 80%;
      margin: 0 auto;
      padding-top: 1rem;
      text-align: center;
      .image{
        width: 2.1rem;
        height: 2.1rem;
        margin: 0 auto;
      }
      .word{
        font-size: 0.3rem;
        color: #666;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .btn{
        width: 100%;
        height: 0.9rem;
        border-radius: 0.45rem;
        background-color: #1c1d1d;
        border: 1px solid #1c1d1d;
        color: #fff;
        line-height: 0.9rem;
        font-size: 0.3rem;
        margin-bottom: 20px;
        &.plain{
          background-color: #fff;
          color: #333;
        }
      }
    }
  }
</style>
