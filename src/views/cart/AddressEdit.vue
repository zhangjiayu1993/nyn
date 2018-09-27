<template>
<div class="wraper address-edit">
  <van-address-edit
    :area-list="areaList"
    show-delete
    show-set-default
    show-search-result
    @save="onSave"
    @delete="onDelete"
    delete-button-text="删除地址"
  />
</div>
</template>

<script>
import { ADDRESS_ADD, ADDRESS_LIST } from '@/api/api-type';
//  引入areaList
import areaList from 'vant/packages/area/demo/area'

export default {
  name: 'AddressEdit',
  data () {
    return {
      areaList,
      token: this.$store.state.token
    }
  },
  created() {
    this.$axios.post(ADDRESS_LIST, {token: this.token, page: 1, pagesize: 10}).then(res => {
      console.log(res)
    })
  },
  methods: {
    onSave(content) {
      console.log(content)
      let addr = {};
      addr = {
        token: this.token,
        prov: content.province,
        city: content.city,
        area: content.county,
        address: content.addressDetail,
        status: 0,
        mobile: content.tel,
        name: content.name
      };
      this.$axios.post(ADDRESS_ADD, addr).then(res => {
        this.$toast('保存成功！');
      })
    },
    onDelete() {
      this.$toast('delete');
    }
  }
}
</script>

<style lang="less">
.address-edit{
  .van-button--danger{
    background-color: #1c1d1d;
    border-color: #1c1d1d;
  }
  .van-button--default{
    span{
      color: #ed4e16;
    }
  }
}
</style>
<style scoped lang="less">
.wraper{
  padding-top: 15px;
  min-height: 100%;
  background-color: #f4f4f4;
}
</style>
