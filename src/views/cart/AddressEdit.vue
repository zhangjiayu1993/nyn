<template>
<div class="wraper address-edit">
  <van-address-edit
    :area-list="areaList"
    :show-delete="showDelete"
    :address-info="addressInfo"
    @save="onSave"
    @delete="onDelete"
    delete-button-text="删除地址"
    save-button-text="确定"
  ></van-address-edit>
</div>
</template>

<script>
import { ADDRESS_ADD, ADDRESS_DELETE, ADDRESS_UPDATE } from '@/api/api-type';
//  引入areaList
import areaList from 'vant/packages/area/demo/area'

export default {
  name: 'AddressEdit',
  data () {
    return {
      areaList,
      token: this.$store.state.token,
      editAddr: this.$route.params,
      isEdit: false, // 是否为修改地址
      addressInfo: {}, // 由地址列表进来的地址详情
      showDelete: false // 是否显示删除按钮
    }
  },
  created() {
    if (JSON.stringify(this.editAddr) == '{}') {
      this.addressInfo = {};
      this.showDelete = false;
      this.isEdit = false;
    } else {
      this.addressInfo = this.editAddr;
      this.showDelete = true;
      this.isEdit = true
    }
    // console.log(this.editAddr)
  },
  methods: {
    onSave(content) {
      // console.log(typeof content.areaCode)
      let param = {}
      param = {
        token: this.token,
        prov: content.province,
        city: content.city,
        area: content.county,
        address: content.addressDetail,
        status: 0,
        mobile: content.tel,
        name: content.name,
        areaCode: content.areaCode
      };
      if (!this.isEdit) {
        // 添加地址
        this.$axios.post(ADDRESS_ADD, param).then(res => {
          if (res.data.error_code == 0) {
            this.$toast('保存成功！');
            this.$router.push({
              path: '/addresslist',
              name: 'AddressList'
            })
          } else {
            this.$toast('保存失败');
          }
        })
      } else {
        // 修改地址
        console.log(content)
        param.address_id = content.id
        this.$axios.post(ADDRESS_UPDATE, param).then(res => {
          if (res.data.error_code == 0) {
            this.$toast('地址修改成功！');
            this.$router.push({
              path: '/addresslist',
              name: 'AddressList'
            })
          } else {
            this.$toast('修改失败');
          }
        })
      }
    },
    onDelete(item) {
      this.$axios.post(ADDRESS_DELETE, {token: this.token, address_id: item.id}).then(res => {
        if (res.data.error_code == 0) {
          this.$toast('删除成功！');
          this.$router.push({
            path: '/addresslist',
            name: 'AddressList'
          })
        } else {
          this.$toast('删除失败！');
        }
      })
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
