<template lang="html">
    <div class="address">
        <headerBac tabName="我的地址"></headerBac>
        <transition name="slide">
          <div class="container" v-show="mainarea">
            <div v-show="!havePage">
               <nopage></nopage>
            </div>
            <div v-show="havePage">
              <div class="address-item" v-for="addressItem in this.$store.state.address" @click="onChooseAddress(addressItem)">
                 <p>{{addressItem}}</p>
              </div>
            </div>
          </div>
        </transition>
        <div class="pageBottom" @click="onAddAddress">
            <p class="tabbar-label">新增地址</p>
        </div>
    </div>
</template>

<script>
import headerBac from 'components/base/HeaderBac.vue'
import nopage from '../base/NoPage.vue';
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      mainarea:false,
      havePage:false
    }
  },
  computed: {
			...mapGetters([
				'this.$store.state.address',
				'this.$store.state.chooseaddress',
				'this.$store.state.ischoose',
				'this.$store.state.comname'
			])
		},
    mounted() {
      this.mainarea = true
      if(this.$store.state.address.length === 0) {
				this.havePage = false;

			} else {
				this.havePage = true;
			}
    },
  methods: {
    /*添加地址*/
			onAddAddress() {
				this.$router.push('./addaddress')
			},
			/*选择地址*/
    onChooseAddress() {
      if(this.$store.state.ischoose == 1) {
					this.setChooseaddress(item);
					this.$router.push('./orderwait');
					this.setIschoose(2);
				}
    }
  },
  components: {
    headerBac,
    nopage

  }
}
</script>

<style lang="scss" scoped>
@import 'static/scss/variable.scss';
   .address{
     width: 100%;
     .container{
        padding-top:42px;
        padding-bottom: 40px;
        &.slide-enter-active,&.slide-leave-active{
          transition: all .5s ;
          opacity: .8;
        }
        &.slide-enter,&.slide-leave-active{
          transition: all .5s ;
          transform: translate3d(100%, 0, 0);
          opacity: .8;
        }
        .address-item{
          width: 100%;
          height: 65px;
          position: absolute;
          left: 0;
          text-align: center;
          margin-top: -18px;
          line-height: 45px;
          border-bottom: 1px solid #ccc;
          font-size: 14px;
        }
     }
     .pageBottom{
       position: fixed;
       left: 0;
       bottom: 0;
       width: 100%;
       height: 40px;
       background-color: $theme_background;
       p{
         text-align: center;
         line-height: 10px;
         color:#fff;
       }
     }
   }
</style>
