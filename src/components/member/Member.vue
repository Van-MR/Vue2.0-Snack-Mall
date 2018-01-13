<template>
    <div class="member">
      <headers tabName="我的"></headers>
      <transition name="move">
        <div class="container" v-show="mainarea">
           <div class="floor">
             <div class="infos">
               <img src="../../../static/img/github.png"  />
               <p>Open Free Share</p>
             </div>
           </div>
           <div class="floor-two">
             <div class="m-message mine" @click="onInfo">
                 <p>个人信息</p>
             </div>
             <div class="m-order mine" @click="onOrder">
                 <p>我的订单</p>
             </div>
             <div class="m-address mine" @click="onAddress">
                 <p>我的地址</p>
             </div>
           </div>
        </div>
      </transition>
      <footers></footers>
    </div>
</template>

<script>
import headers from 'components/base/Header.vue'
import footers from 'components/base/Footer.vue'
import { mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
       mainarea: false
    }
  },
  mounted() {
    this.mainarea = true;
  },
  methods: {
    onInfo() {
      this.$router.push('/info')
    },
    onOrder() {
      this.$router.push('/order')
    },
    onAddress() {
      this.$router.push('/address')
    }
  },
  components:{
    headers,
    footers
  }
}
</script>

<style lang="scss" scoped>
@import 'static/scss/variable.scss';

   .member{
     .container{
       display: flex;
       width: 100%;
       height: 100%;
       padding-top: 42px;
       &.move-enter-active,
       &.move-leave-active {
         transition: all .5s;
         opacity: .8;
       }
       &.move-enter,
       &.move-leave-active {
         transition: all .5s;
         transform: translate3d(100%, 0, 0);
         opacity: .8;
       }
       .floor{
         width: 100%;
         height: 200px;
         position: absolute;
         left: 0;
         margin-top:-10px;
         background-color: $theme_background;
         .infos{
           display: flex;
           flex-flow: column nowrap;
           color:#fff;
           align-items: center;
           justify-content: center;
           margin-top:20px;
           img{
             width: 80px;
             height: 80px;
           }
         }
       }
       .floor-two{
         position:absolute;
         left: 0;
         top: 239px;
         width: 100%;

         .mine{
           height: 40px;
           background-color: #f3f3f3;
           margin-bottom:20px;
           line-height: 40px;
           &:nth-child(1){
             margin-top: -15px;
           }
           p{
             margin-left: 10px;
             font-size: 14px;
           }
         }

       }
     }
   }
</style>
