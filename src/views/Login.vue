<template>
  <div class="wraper"></div>
</template>

<script>
import { LOGIN } from '@/api/api-type'
import { Toast } from 'vant'
export default {
  created () {
    Toast.loading('正在登陆')
    let storage = window.localStorage
    storage.removeItem('TOKEN')
    // 登录
    this.$axios.post(LOGIN).then(res => {
      console.log(res)
    });
    // 开发环境手动跳转到首页，拼接token，正式环境有自动跳转
    if (process.env.NODE_ENV === 'development') {
      this.setToken()
    }
    // 设置token
    // let token = window.localStorage.getItem('TOKEN')
    // if (!token) {
    //   this.setToken()
    // }
  },
  methods: {
    setToken() {
      let self = this
      setTimeout(function () {
        self.$router.push({
          path: '/',
          query: {
            token: '0d35501dbe96a78fbf368e8ae1bc9089'
          }
        })
      }, 1000)
    }
  }
}
</script>
<style scoped lang="less">

</style>
