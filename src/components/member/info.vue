<template lang="html">
  <div class="info">
     <headerBac tabName="个人信息"></headerBac>
     <transition name="slide">
       <div class="container" v-show="mainarea">
          <div class="m-inf">
            <img src="../../../static/img/github.png" alt="" />
            <p>wechat:vanisher</p>
          </div>
       </div>
     </transition>
  </div>


</template>

<script>
import headerBac from 'components/base/HeaderBac.vue'
export default {
  data() {
     return {
       mainarea:false
     }
  },
  mounted() {
    this.mainarea = true
  },
  components: {
      headerBac
  }
}
</script>

<style lang="scss" scoped>
    .info{
      .container{
        padding-top: 42px;
        width: 100%;
        &.slide-enter-active,&.slide-leave-active{
          transition: all .5s ;
          opacity: .8;
        }
        &.slide-enter,&.slide-leave-active{
          transition: all .5s ;
          transform: translate3d(100%, 0, 0);
          opacity: .8;
        }
        .m-inf{
          display: flex;
          align-items: center;
          flex-flow: column;
          img{
            width: 80px;
            height: 80px;
          }
          p{
            color:#ff2600;
          }
        }
      }
    }

</style>
