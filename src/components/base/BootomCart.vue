<template lang="html">
     <div class="bottomcart">
       <div class="toCart">
         <img src="../../../static/img/icon/cart_white.png"/>
         <transition name="bullet" >
            <p v-show="cartNum">{{cartLength}}</p>
         </transition>
       </div>
       <div class="addCart">
          <span class="tabbar-label">加入购物车</span>
       </div>
       <div class="external addPay">
          <span class="tabbar-label">立即购买</span>
       </div>
     </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import 'static/scss/variable.scss';
.bottomcart{
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 42px;
  line-height: 42px;
  position: fixed;
  bottom:0;
  left: 0;
  color:#ffffff;
  font-size: 12px;
  background-color: $theme_background;
  .toCart{
    img{
      width: 20px;
      height: 20px;
      margin-top: 10px;
    }
  }
}


</style>
