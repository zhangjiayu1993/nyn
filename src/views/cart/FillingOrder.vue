<template>
<div class="wraper">
  <van-contact-card/>
  <div class="add-address">
    <i></i>
  </div>
</div>
</template>

<script>
export default {
  name: 'FillingOrder',
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
.add-address{
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 10px 15px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 24px;
  position: relative;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  overflow: hidden;
  &:before{
    content: '';
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    position: absolute;
    background: -webkit-repeating-linear-gradient(135deg,#ff6c6c 0,#ff6c6c 20%,transparent 0,transparent 25%,#3283fa 0,#3283fa 45%,transparent 0,transparent 50%);
    background: repeating-linear-gradient(-45deg,#ff6c6c 0,#ff6c6c 20%,transparent 0,transparent 25%,#3283fa 0,#3283fa 45%,transparent 0,transparent 50%);
    background-size: 80px;
  }
}
</style>
