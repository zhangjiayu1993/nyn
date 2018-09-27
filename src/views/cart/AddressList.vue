<template>
<div class="wraper">
  <van-address-list
    v-model="chosenAddressId"
    :list="list"
    @add="onAdd"
    @edit="onEdit"
    @select="onSelect"
  ></van-address-list>
</div>
</template>

<script>
import { ADDRESS_LIST, ADDRESS_STATUS } from '@/api/api-type';
export default {
  name: 'AddressList',
  data() {
    return {
      chosenAddressId: '1',
      list: [], // 地址列表
      token: this.$store.state.token
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.$axios.post(ADDRESS_LIST, {token: this.token, page: 1, pagesize: 10}).then(res => {
        let result = res.data.data.data
        for (let i = 0; i < result.length; i++) {
          let obj = {};
          obj.id = result[i].id;
          obj.address = result[i].prov + ' ' + result[i].city + ' ' + result[i].area + ' ' + result[i].address;
          obj.city = result[i].city;
          obj.province = result[i].prov;
          obj.county = result[i].area;
          obj.addressDetail = result[i].address;
          obj.areaCode = result[i].areaCode; // 地址代码  需要后台增加字段
          obj.name = result[i].name;
          obj.tel = result[i].mobile;
          this.list.push(obj)
        }
      })
    },
    onAdd() {
      this.$router.push({
        path: '/addressedit',
        name: 'AddressEdit'
      })
    },
    onEdit(item, index) {
      this.$router.push({
        path: '/addressedit',
        name: 'AddressEdit',
        params: item
      })
      // this.$toast('编辑地址:' + index);
    },
    onSelect(item, index) {
      this.$router.push({
        path: '/fillingorder',
        name: 'FillingOrder',
        params: item
      });
      // 设为默认地址
      this.$axios.post(ADDRESS_STATUS, {token: this.token, address_id: item.id}).then(res => console.log(res))
    }
  }
}
</script>

<style scoped>

</style>
