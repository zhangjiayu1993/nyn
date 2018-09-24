<template>
<div class="wraper">
  <img src="./us.jpg" class="image"/>
  <div class="title">公司简介</div>
  <div class="detail">公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介</div>
</div>
</template>

<script>
export default {
  name: 'AboutUs',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">
.wraper{
  width: 94%;
  margin: 0 auto;
  background-color: #fff;
  padding-top: 10px;
  .image{
    width: 100%;
  }
  .title{
    font-size: 0.36rem;
    color: #333;
  }
  .detail{
    text-align: justify;
    font-size: 0.24rem;
    line-height: 0.36rem;
    text-indent: 10px;
    color: #666;
  }
}
</style>
