<template>
<div class="wraper">
  我的我的我的啦啦啦
  <TheFooter :selected="selected"></TheFooter>
</div>
</template>

<script>
import TheFooter from '../../components/TheFooter'
export default {
  name: 'TheMy',
  components: {TheFooter},
  data() {
    return {
      selected: 'my'
    }
  }
}
</script>

<style scoped>
.wraper{
  padding-bottom: 55px;
}
</style>
