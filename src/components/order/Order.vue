<template lang="html">
    <div class="orderPage">
        <headerBac tabName="我的订单"></headerBac>
        <Ordertab></Ordertab>
        <div class="container">

        </div>
    </div>
</template>

<script>
import headerBac from 'components/base/HeaderBac.vue'
import Ordertab from '../base/OrderTab.vue';
export default {
  components: {
    headerBac,
    Ordertab
  }
}
</script>

<style lang="scss" scoped>
    .orderPage{
      padding-top: 34px;

    }
</style>
