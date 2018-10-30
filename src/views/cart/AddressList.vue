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
import { ADDRESS_LIST } from '@/api/api-type';
export default {
  name: 'AddressList',
  data() {
    return {
      chosenAddressId: this.$store.state.chosenAddressId,
      list: [], // 地址列表
      token: window.localStorage.getItem('TOKEN'),
      addressId: this.$route.params.addressId,
      routeFrom: this.$route.params.comeform
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.$axios.post(ADDRESS_LIST, {token: this.token, page: 1, pagesize: 10}).then(res => {
        let result = res.data.data.data
        console.log(result)
        for (let i = 0; i < result.length; i++) {
          let obj = {};
          obj.id = result[i].id;
          obj.address = result[i].prov + ' ' + result[i].city + ' ' + result[i].area + ' ' + result[i].address;
          obj.city = result[i].city;
          obj.province = result[i].prov;
          obj.county = result[i].area;
          obj.addressDetail = result[i].address;
          obj.areaCode = result[i].areaCode.toString(); // 地址代码  需要后台增加字段 必须为字符串
          obj.name = result[i].name;
          obj.tel = result[i].mobile;
          if (result[i].status == 1) {
            obj.isDefault = true;
          } else {
            obj.isDefault = false;
          }
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
        params: {
          address: item,
          form: 'addressList'
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
