<template>
<div class="wraper">
  <div class="title">{{infoData.title}}</div>
  <div class="author">
    <span class="auth"></span>
    <span class="time">{{infoData.created_at}}</span>
  </div>
  <div class="info-detail" v-html="infoData.content"></div>
</div>
</template>

<script>
import { INFO_DETAIL } from '../../api/api-type'

export default {
  name: 'InfoDetail',
  data () {
    return {
      infoId: this.$route.query.info_id,
      infoData: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData() {
      this.$axios.post(INFO_DETAIL, {info_id: this.infoId}).then(res => {
        this.infoData = res.data.data
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less">
.info-detail{
  img{
    max-width: 100%;
  }
}
</style>

<style scoped lang="less">
.wraper{
  width: 94%;
  margin: 0 auto;
  .title{
    font-size: 0.32rem;
    margin-bottom: 0.2rem;
    text-align: justify;
  }
  .author{
    font-size: 0.24rem;
    color: #999;
    margin-bottom: 0.2rem;
    .auth{
      margin-right: 0.1rem;
    }
  }
}
</style>
