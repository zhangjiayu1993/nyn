<template>
<div class="wraper">
  <div class="title">公司简介</div>
  <div class="detail">圆匀和香—由北京美锦文化公司倾心打造，公司已经形成了和香香品研发、生产、香文化培训、香会雅集策划承办等综合性、一体化的香文化产业链。公司旗下的美锦香会馆位于北京大兴区，环境雅致，闹中取静，已成为全国精英雅士心灵归所 </div>
  <img src="./us.jpg" class="image"/>
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
    margin-top: 15px;
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
