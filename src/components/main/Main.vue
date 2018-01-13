<template lang="html">
     <div class="index">
        <headers tabName="零食商城"></headers>
        <transition name="move">
          <div class="container" v-show="mainarea">
            <!-- swipe -->
              <div class="swiper-container">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="bannerItem in bannerList">
                    <img :src="bannerItem.img" />
                  </div>
                </div>
                <div class="swiper-pagination"></div>
              </div>
              <div class="content">
                  <div class="flooritem" v-for="(productItem,productIndex) in productlist">
                      <div class="productTop">
                         <p class="product-text">{{productItem.Category.TopText}}</p>
                         <div class="flex-align-center">
                            <p class="product-text">{{productIndex+1}}F</p>
                            <!-- <img src="../../static/img/icon/arrowBack.png" class="arrowImg" /> -->
                         </div>
                      </div>
                      <div class="productContent">
                          <div class="productBox flex">
                               <div class="productitem" v-for="goodsItem in productItem.SalesProduct">
                                    <div class="itemBox">
                                        <div class="goodsImg" @click="onGoodsDetail(goodsItem,goodsItem.CategoryId)">
                                            <img v-lazy="goodsItem.GoodsImage" class="itemImg" />
                                        </div>
                                        <div class="goodsName text-ellipsis">
                                            <p class="goods-name">{{goodsItem.GoodsName}}</p>
                                        </div>
                                        <div class="addCartBox flex-between">
                                            <p class="goods-price">
                                               <span>￥{{goodsItem.GoodsPrice}}</span>
                                            </p>
                                            <img src="../../../static/img/icon/shop_addCart.png" class="addcart"
                                              @click="onAddCart(goodsItem.GoodsName)"
                                            />
                                        </div>
                                    </div>
                               </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </transition>
        <footers :urlRouter="$route.path" ref="footer"></footers>
     </div>
</template>

<script>
import headers from 'components/base/Header.vue'
import footers from 'components/base/Footer.vue'
import '../../../static/css/swiper.min.css'
import Swiper from '../../../static/js/swiper.min'
import { mapGetters, mapMutations } from 'vuex';
export default {
   data() {
      return{
        bannerList:[],
        productlist:[],
        cartLength: 0,
				mainarea: false
      }
   },
   mounted(){
     this.mainarea = true;
     setTimeout(() => {
       const swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 30,
        autoplay: 3000,
        effect: 'fade',
      });
    },200)
     this.getBannerList();
     this.getGoodList();

   },
   methods: {
      getBannerList() {
       this.$http.get('/api/bannerdata').then((res) => {
          this.bannerList = res.data.data;
          //console.log(this.bannerList);
        })
        .catch((error) => {
          console.log(error)
        })
      },
      getGoodList() {
         this.$http.get('/api/homedata').then((res) => {
             this.productlist = res.data.data;
             //console.log( this.productlist);
         })
         .catch((err) => {
           console.log(error);
         })
      },
      //进入商品详情页
      onGoodsDetail(item,id) {
        this.$router.push({
          path:'/detail',
          query: {
            id:id
          }
        });
       this.setGoods(item)
     },
     /*添加到购物车*/
			onAddCart(item, name) {

				if(!this.$store.state.carts.includes(item)) {
					if(!this.$refs.footer.showNum) {
						this.cartLength = this.$store.state.carts.length + 1;
						this.$refs.footer.showNum = true;
						this.setCarts(item);
					}
				}

			},
     ...mapMutations({
				setGoods: 'SET_GOODS',
				setCarts: 'SET_CARTS',
				setTabindex: 'SET_TABINDEX',
				setComname: 'SET_COMNAME'
			})


   },
   components: {
        headers,
        footers
   }
}
</script>

<style lang="scss" scoped>
    @import 'static/scss/variable.scss';
    .index{
      .container{
        width: 100%;
        position: absolute;
        left: 0;
        top:34px;
        &.move-enter-active,
        &.move-leave-active {
            transition: all 0.3s;
            opacity: 0.8;
        }
        &.move-enter,
        &.move-leave-active {
            transition: all 0.3s;
            transform: translate3d(-100%, 0, 0);
            opacity: 0.8;
        }
        .swiper-container{
          width: 100%;
          .swiper-slide img {
            width: 100%;
            height: 100%;
          }
        }
        .content{
          width: 100%;
          .flooritem{
             &:last-child{
                padding-bottom: 42px;
             }
             .productTop{
                position: relative;
                height: 32px;
                border-bottom: $base_border;
                border-top: $base_border;
                .product-text{
                    position:absolute;
                    left: 0;
                    margin-top: 7px;
                }
                .flex-align-center{
                  position: absolute;
                  right: 45px;
                  background-color: blue;
                }
             }
             .productContent{
               width: 100%;
               height: 230px;
               .flex{
                 display: flex;
                 width: 100%;
                 justify-content: space-between;
                 .productitem{

                   &:nth-child(1){
                     border-right: 1px solid #e6e6e6;
                   }
                   .itemBox{
                     .goodsImg{
                       display: flex;
                        margin-top: -5px;
                        .itemImg{
                          width: 175px;
                          height: 160px;
                          float: left;
                        }
                     }
                     .goodsName{
                       color:#6495ed;

                       font-size: 12px;
                     }
                     .flex-between{
                       display: flex;
                       justify-content: space-between;
                       .goods-price{
                         margin-top: 1px;
                         color:#ff2600;
                         font-size: 12px;
                       }
                       .addcart{
                         width: 20px;
                         height: 20px;
                         position: relative;
                         left: -18px;
                       }
                     }

                   }

                 }
               }


             }

           }
        }

     }
    }




</style>
