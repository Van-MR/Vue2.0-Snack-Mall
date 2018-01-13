<template lang="html">
   <div class="orderTab">
      <div class="tab-item">
        <router-link to='./order'>
           <p class="tab-title">全部</p>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to='./order'>
           <p class="tab-title">待付款</p>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to='./order'>
           <p class="tab-title">待发货</p>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to='./order'>
           <p class="tab-title">待收货</p>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to='./order'>
           <p class="tab-title">已完成</p>
        </router-link>
      </div>
   </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import 'static/scss/variable.scss';
  .orderTab{
    width: 100%;
    height: 35px;
    position: absolute;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    .tab-item{
      & a{
        text-decoration: none;
      }
      .tab-title{
        color:$base_textColor;
        box-sizing: border-box;
        padding-left: 5px;
        padding-right: 5px;
        &:hover{
          color:$theme_hover;
        }
      }
      &:hover{
          border-bottom: 1px solid blue;
      }



    }
  }
</style>
