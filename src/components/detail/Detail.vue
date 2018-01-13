<template lang="html">
    <div class="detail">
        <headersBac tabName="详情"></headersBac>
        <transition name="move">
          <div class="container" v-show="mainarea">
              <div v-show="!havePage">
                   <nopage></nopage>
              </div>
              <div v-show="havePage" class="goods-Img">
        				<img :src="$store.state.goods.GoodsImage" class="goodsImg" />
              </div>
        			<div class="detail-content">
        				<p class="goods-name">{{$store.state.goods.GoodsName}}</p>
        				<p class="goods-price">¥{{$store.state.goods.GoodsPrice}}</p>
        			</div>
          </div>
        </transition>
        <div class="detail-bottom">
             <div class="toCart">
               <img src="../../../static/img/icon/cart_white.png"  @click="toCart"/>
               <transition name="bullet" >
                  <p v-show="cartNum">{{cartLength}}</p>
               </transition>
             </div>
             <div class="addCart">
        				<span class="tabbar-label" @click="onCartModel()">加入购物车</span>
        		 </div>
        		 <div class="external addPay">
        				<span class="tabbar-label" @click="onBuyModel()">立即购买</span>
        		 </div>
        </div>
        <transition name="slide-up">
          <div class="model" v-show="addCartModel" v-cloak>
             <div class="model-content addCart-content" @click.stop="addCartModel=true">
               <div class="cartModel-box flex">
                     <div class="cartModel-img">
                       <img :src="$store.state.goods.GoodsImage" />
                     </div>
                     <div class="cartModel-text">
                         <div class="flex-between">
                            <p class="goods-name">{{$store.state.goods.GoodsName}}</p>
                            <img src="../../../static/img/icon/close.png" class="cartClose" @click.stop="addCartModel=false" />
                         </div>
                         <p class="goods-price">¥{{$store.state.goods.GoodsPrice}}</p>
                     </div>
               </div>
               <div class="cartModel-bottom flex-between">
                   <p>购买数量</p>
                   <div class="goodsOp flex">
                     <img src="../../../static/img/icon/shop_cut.png" @click="onCutCart()" class="one"/>
                     <input type="text" :value="goodsNum" readonly="" />
                     <img src="../../../static/img/icon/shop_add.png" @click="onAddCart()" />
                   </div>
               </div>
               <div @click.stop="onBuy" class="addToCart">
                   <p class="cartModel-addCart"  v-show="!isBuy">
                     加入购物车
                   </p>
                   <p class="cartModel-addCart" v-show="isBuy">
                     立即购买
                   </p>
               </div>
             </div>
           </div>
        </transition>
    </div>
</template>

<script>
import headersBac from 'components/base/HeaderBac.vue'
import nopage from '../base/NoPage.vue';
import { mapGetters,mapMutations } from 'vuex';
export default {
  props: ['tabName'],
  data() {
    return {
      goodsNum: 1,
      addCartModel: false,
      isBuy: true,
      havePage: false,
      cartLength: '',
      cartNum: false,
      mainarea: false
    }
  },
  computed: {
    ...mapGetters([
      'this.$store.state.goods',
      'this.$store.state.carts',
      'this.$store.state.comname'
    ])
  },
  mounted() {
    this.mainarea = true;
    if (this.$store.state.goods === undefined) {
      this.havePage = false;

    } else {
      this.havePage = true;
    }
    if (this.$store.state.carts != undefined) {
      this.cartLength = this.$store.state.carts.length;
    }
    /*拿到路由跳转的id*/
    const id = this.$route.query.id;

  },
  methods:{
    toCart() {
				this.$router.push('./cart');
		},
    onCartModel() {
      this.addCartModel=true;
			this.isBuy=false;
    },
    onBuyModel(){
				this.addCartModel=true;
				this.isBuy=true;
		},
    onAddCart() {
				this.goodsNum++;
			},
		onCutCart() {
			if(this.goodsNum > 1) {
				this.goodsNum--;
			}
   },
   onBuy() {
     const that = this;
       if(this.isBuy){
         let orderArr = [];
         orderArr.push(this.$store.state.goods)
         this.setOrders(orderArr);
         this.$router.push('./orderwait')
       }else{
         if(!this.cartNum){
						this.setCarts(this.$store.state.goods);
						this.addCartModel=false;
						this.cartNum=true;
						this.cartLength = this.cartLength+1;
						setTimeout(()=>{
							this.cartNum=false;
						},2000)
					}

       }
   },
   ...mapMutations({
				setOrders: 'SET_ORDERS',
				setCarts: 'SET_CARTS',
				setComname: 'SET_COMNAME'
			})
  },
  components: {
    headersBac,
    nopage
  }
}
</script>

<style lang="scss" scoped>
@import 'static/scss/variable.scss';
.detail {
    .container {
        width: 100%;
        margin-top: 30px;
        &.move-enter-active,
        &.move-leave-active {
            transition: all 0.3s;
            opacity: 0.8;
        }
        &.move-enter,
        &.move-leave-active {
            transition: all 0.3s;
            transform: translate3d(100%, 0, 0);
            opacity: 0.8;
        }
        .goods-Img {
            margin-left: 30px;
        }
        .detail-content {
            .goods-name {
                font-size: 12px;
            }
            .goods-price {
                color: #ff2600;
                font-size: 12px;
            }
        }
    }
    .detail-bottom {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 42px;
        line-height: 42px;
        position: fixed;
        bottom: 0;
        left: 0;
        color: #ffffff;
        font-size: 12px;
        background-color: $theme_background;
        .toCart {
            img {
                width: 20px;
                height: 20px;
                margin-top: 10px;
            }
        }
    }
    .model{
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      &.slide-up-enter-active,&.slide-up-leave-active {
              transition: all .5s
          }
      &.slide-up-enter,&.slide-up-leave-to {
          opacity: 0;
          transform: translate3d(0, 100%, 0);
      }
       .model-content{
         .cartModel-box {
           display: flex;
           border-bottom:1px solid #ccc;
           border-top:1px solid #ccc;
           .cartModel-img{
             width: 90px;
             height: 80px;
             img{
               width: 100%;
               height: 100%;
             }
           }
           .cartModel-text{
             display: flex;
             justify-content: space-between;
             .flex-between{
               display: flex;
               justify-content: space-between;
               .cartClose{
                 position: absolute;
                 right: 0;
                 margin-top: 5px;
                 margin-right: 15px;
               }
               .goods-name{
                 font-size: 12px;
               }
               .cartClose{
                 width: 20px;
                 height: 20px;
               }
             }
             .goods-price{
               position: relative;
               margin-left: 20px;

             }
             .goods-price{
               color:#ff2600;
               font-size: 12px;
             }
           }
         }
         .cartModel-bottom{
           position: relative;
           display: flex;
           justify-content: flex-between;
           font-size: 12px;
           
           p{
             font-size: 14px;
             color: blue;
             margin-bottom: 5px;
           }
           .goodsOp{
             position: absolute;
             display: flex;
             right: 0;
             bottom:5px;
             width: 170px;
             img{
               width: 16px;
               height: 16px;
               .one{
                position: relative;
                right: 40px;
               }
             }
             input{
          			font-size: 12px;
          			border: none;
          			text-align: center;
          		}
           }
         }
         .cartModel-addCart{
           background-color: $theme_background;
           z-index:9999;
           margin-bottom: 0;
           height: 42px;
           width: 100%;
           text-align: center;
           line-height: 42px;
           p{
             width: 100%;
             height: 100%;
             position: fixed;
             left: 0;
             background-color: red;
           }
         }
       }
    }
}
</style>
