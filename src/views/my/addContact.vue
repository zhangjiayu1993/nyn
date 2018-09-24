<template>
<div class="wraper">
  <div class="form">
    <textarea v-model="content" rows="8" placeholder="请输入您的合作要求" class="content"></textarea>
    <input v-model="mobile" maxlength="11" placeholder="请输入您的手机号码" class="mobile"/>
    <van-button size="large" @click="submit">提交</van-button>
  </div>
</div>
</template>

<script>
import { CONTACT } from '@/api/api-type'
export default {
  name: 'addContact',
  data() {
    return {
      content: '',
      mobile: ''
    }
  },
  methods: {
    submit() {
      let _this = this
      this.$axios.post(CONTACT, {mobile: this.mobile, content: this.content}).then(res => {
        if (res.data.error_code === 0) {
          _this.content = ''
          _this.mobile = ''
        }
        this.$toast(res.data.error_msg);
      })
    }
  }
}
</script>

<style scoped lang="less">
.wraper{
  width: 94%;
  margin: 0 auto;
  .form{
    padding-top: 10px;
    .content, .mobile{
      outline: none;
      border: 1px solid #eee;
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
      padding: 3px 10px;
      box-sizing: border-box;
      width: 100%;
      font-size: 0.26rem;
    }
    .mobile{
      margin-bottom: 22px;
    }
    .content{
      resize: none;
    }
  }
  .van-button--default{
    background-color: #1c1d1d;
    color: #fff;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
  }
}
</style>
