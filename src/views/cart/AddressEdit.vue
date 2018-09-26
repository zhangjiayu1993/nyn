<template>
<div class="wraper address-edit">
  <van-address-edit
    :area-list="areaList"
    show-delete
    show-set-default
    show-search-result
    :search-result="searchResult"
    @save="onSave"
    @delete="onDelete"
    @change-detail="onChangeDetail"
    delete-button-text="删除地址"
  />
</div>
</template>

<script>
export default {
  name: 'AddressEdit',
  data () {
    return {
      areaList: '',
      searchResult: []
    }
  },
  methods: {
    onSave() {
      this.$toast('save');
    },
    onDelete() {
      this.$toast('delete');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }];
      } else {
        this.searchResult = [];
      }
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
