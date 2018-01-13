<template lang="html">
       <div class="cart">
            <headersBac tabName="购物车"></headersBac>
            <transition name="move">
              <div class="container" v-show="mainarea">
                <div  v-show="!havePage">
                   <nopage></nopage>
                </div>
                <div v-show="havePage">
                   <div class="cart-item" v-for="(cartItem,cartIndex) in $store.state.carts" @click="onDetail(cartItem)">
                       <v-touch @swipeleft="onSwipeLeft(cartIndex)" @swiperight="onSwipeRight(cartIndex)">
                           <div class="cart-content flex-align-center">
                             <div class="goods-radio"  @click.stop="onGoodsRadio(cartItem)">
                               <img src="../../../static/img/icon/radio.png" v-show="!cartItem.goodsRadio" />
                               <img src="../../../static/img/icon/radio_select.png" v-show="cartItem.goodsRadio" />
                             </div>
                           </div>
                           <div class="goodsitem">
                              <div class="goods-img">
                                <img :src="cartItem.GoodsImage" />
                              </div>
                              <div class="goods-textBox">
                                 <p class="goods-name">{{cartItem.GoodsName}}</p>
                                 <div class="goodsOp flex">
                                   <img src="../../../static/img/icon/shop_cut.png" @click.stop="onCutCart(cartItem)" class="cut" />
                                   <input type="text" :value="cartItem.GoodsNum" />
                                   <img src="../../../static/img/icon/shop_add.png" @click.stop="onAddCart(cartItem)" class="add" />
                                 </div>
                                 <p class="goods-coach">¥{{cartItem.GoodsPrice}}</p>
                              </div>
                           </div>
                           <div class="remove" @click.stop="onRemove(cartItem)">
                             <img src="../../../static/img/icon/remove.png" />
                           </div>
                       </v-touch>
                   </div>
                </div>
              </div>
            </transition>
           <div class="cartBottom-detail flex-between" v-show="$store.state.carts">
              <div class="flex">
                <div class="shopRadio" @click="onSelectAll()">
                   <img src="../../../static/img/icon/radio.png" class="goods-radio" v-show="!goodsRadioAll" />
                   <img src="../../../static/img/icon/radio_select.png" class="goods-radio" v-show="goodsRadioAll" />
                </div>
                <div class="bottom-left">
        					<p>合计: <span class="shopCoach">¥{{allCoach}}</span> </p>
        				</div>
                <div class="subminCart" @click="onOrder">
          				<p>提交订单</p>
          			</div>
              </div>
           </div>
           <footers></footers>
       </div>
</template>

<script>
import headers from 'components/base/Header.vue'
import headersBac from 'components/base/HeaderBac.vue'
import footers from 'components/base/Footer.vue'
import nopage from '../base/NoPage.vue';
import { mapGetters, mapMutations } from 'vuex';
export default {
  data() {
     return {
       goodsRadioAll: false,
       allCoach: 0,
       radioArr: [],
       havePage: false,
       itemIndex: '',
       slidename: 'slide-go',
       mainarea: false,
     }
  },
  computed: {
    ...mapGetters([
				'this.$store.state.carts',
				'this.$store.state.comname'
			])
  },
  methods: {
    /*选择单个商品*/
        onGoodsRadio(item) {
          const that = this;
          that.radioArr = [];
          item.goodsRadio = !item.goodsRadio;
          that.$store.state.carts.forEach(function(itemGoods) {
            that.radioArr.push(itemGoods.goodsRadio);
          });
          if(that.radioArr.indexOf(false) == -1) {
            that.goodsRadioAll = true;
          } else {
            that.goodsRadioAll = false;
          }
          that.onCalAllCoach();

        },
        /*添加商品数量*/
       onAddCart(item) {
         item.GoodsNum++;
         this.onCalAllCoach();
       },
       /*减少商品数量*/
       onCutCart(item) {
				if(item.GoodsNum > 1) {
					item.GoodsNum--;
					this.onCalAllCoach();
				}

			},
      /*删除商品*/
			onRemove(item) {
				let index = this.$store.state.carts.indexOf(item);
				this.$store.state.carts.splice(index, 1);
				this.itemIndex = '';
			},
      /*选择全部商品*/
			onSelectAll() {
				this.goodsRadioAll = !this.goodsRadioAll;
				if(this.goodsRadioAll) {
					this.$store.state.carts.forEach(function(item) {
						item.goodsRadio = true;

					})
				} else {
					this.$store.state.carts.forEach(function(item) {
						item.goodsRadio = false;
					})
				}
				this.onCalAllCoach();
			},
      /*计算价格*/
			onCalAllCoach() {
				const that = this;
				that.allCoach = 0;
				that.$store.state.carts.forEach(function(item) {
					if(item.goodsRadio) {
						that.allCoach += item.GoodsNum * item.GoodsPrice;
					}
				})
			},
      /*提交订单*/
      onOrder() {
				let orderArr = [];
				this.$store.state.carts.forEach(function(item) {
					if(item.goodsRadio) {
						orderArr.push(item);
					}
				});
				if(orderArr.length) {
					this.$router.push('orderwait')
					this.setOrders(orderArr);
				}

			},
      /*向左滑出现删除*/
			onSwipeLeft(index) {
				this.itemIndex = index;

			},
      /*向右滑隐藏删除*/
			onSwipeRight() {
				this.itemIndex = '';
			},
      onDetail(item) {
				this.$router.push('/detail');
				this.setGoods(item)
			},
      ...mapMutations({
				setOrders: 'SET_ORDERS',
				setGoods: 'SET_GOODS',
				setComname: 'SET_COMNAME'
			})

  },
  mounted() {
      const that = this;
			that.mainarea = true;
      if(that.$store.state.carts.length == 0) {
         that.havePage = false;
      }else{
        that.havePage = true;
        that.$store.state.carts.forEach(function(item) {
					if(typeof item.goodsRadio == 'undefined') {
						that.$set(item, "goodsRadio", false);
					}
				})
      }
  },
  components:{
    headers,
    footers,
    nopage,
    headersBac
  }
}
</script>

<style lang="scss" scoped>
@import 'static/scss/variable.scss';
    .container{
      display: flex;
      width: 100%;
      padding-top: 42px;
      padding-bottom: 40px;
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
      .cart-content{
        display: flex;
        width: 100%;
        align-items: center;
        background-color: red;
        &:after{
          display: block;
          height: 0;
          content: '.';
          clear:both;
          visibility: hidden;
        }
        .goods-radio{
          margin-bottom: -110px;
          img{
            width: 18px;
            height: 18px;
            vertical-align: center;
          }
        }
      }
      .goodsitem{
        display:flex;
        width: 100%;
        margin-left: 40px;
        .goods-img{
          width: 80px;
          height: 80px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .goods-textBox{
         margin-left: 50px;
          .goods-name{

            font-size: 14px;
          }
          .goodsOp{
            display: flex;
            margin-left: -60px;
            input{
              text-align: center;
            }
            img{
              width: 20px;
              height: 20px;
            }
            .add{position: relative;left:-60px;}
            .cut{position: relative;left:60px;}
          }
          .goods-coach{
            color:#ed462f;
          }
        }
      }
      .remove{
        background: linear-gradient(90deg, #9bbeff 0%, #6495ED 100%);
    		width: 18%;
    		height: 2.6rem;
    		line-height: 2.6rem;
    		text-align: center;
    		text-decoration: none;
    		position: absolute;
    		right: -18%;
    		top: 0;
    		img {
    			position: absolute;
    			top: 0;
    			bottom: 0;
    			margin: auto;
    			left: 20%;
    			width: .4rem;
    			height: .4rem;
    		}
      }
    }
    .cartBottom-detail{
      position: fixed;
      bottom:40px;
      left: 0;
      width: 100%;
      height: 40px;
      font-size: 16px;
      background-color: $theme_background;
      .flex{
        display: flex;
        height: 40px;
        .shopRadio{
           img{
             width: 16px;
             height: 16px;
             padding-top:12px;
             padding-left: 7px;
           }
        }
        .bottom-left{
          margin-left: 20px;
          margin-top: -4px;
          color:#fff;
          font-size: 14px;
        }
        .subminCart{
          font-size: 14px;
          vertical-align: center;
          margin-top:-4px;
          color:#fff;
          position: absolute;
          right: 10px;
        }
      }
    }
</style>
