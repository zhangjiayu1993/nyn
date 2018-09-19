<template>
  <div>购物车
    <TheFooter :selected="selected"></TheFooter>
  </div>
</template>

<script>
import TheFooter from '../../components/TheFooter'
export default {
  name: 'TheCart',
  components: {TheFooter},
  data() {
    return {
      selected: 2
    }
  }
}
</script>

<style scoped>

</style>
