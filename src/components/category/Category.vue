<template lang="html">
     <div class="category">
         <headers tabName="分类"></headers>
         <transition name="move">
            <div class="container" v-show='mainarea'>
              <div class="left-bar">
                  <div class="barItem" v-for="(menuItem,menuIndex) in menuList">
                     <p class="menutext" @click="onBar(menuIndex)">
                        {{menuItem.cat_name}}
                     </p>
                  </div>
              </div>
              <div class="rightContent">
                 <div class="rightItem" v-for="categoryItem in categoryContent.cart" @click="onDetail(categoryItem )">
                    <div class="categoryItem">
                       <div class="item">
                           <div class="goods-Img">
                               <img v-lazy="categoryItem.GoodsImage">
                           </div>
                           <div class="goods-TextBox">
                               <p class="goods-Name">{{categoryItem.GoodsName}}</p>
                               <p class="goods-Couch">¥{{categoryItem.GoodsPrice}}</p>
                               <div class="goods-cartBox">
                                   <img src="../../../static/img/icon/shop_addCart.png" />
                               </div>
                           </div>
                       </div>
                    </div>
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
        menuList: [],
				categoryList: [],
				categoryContent: [],
        mainarea: false
     }
  },
  mounted() {
    this.mainarea = true;
    if(this.$store.state.tabindex == undefined) {
				this.setTabindex(0);
		};
    this.getMenuList();
    this.getCategoryList();
  },
  computed: {
			...mapGetters([
				'carts',
				'this.$store.state.tabindex',
				'this.$store.state.comname'
			])
		},
  methods: {
    /*获取分类栏目*/
		getMenuList() {
      this.$http.get('/api/menudata', {}).then((res) =>{
         this.menuList = res.data.data;
         //console.log(this.menuList);
      })
      .catch((err) =>{
        console.log(error);
      })
    },
    /*获取分类列表*/
    getCategoryList() {
      this.$http.get('/api/categorydata', {}).then((res) =>{
        this.categoryList = res.data.data;
        this.categoryContent = this.categoryList[0]
      // console.log(this.categoryContent);
      })
      .catch((err) =>{
        console.log(error);
      })
    },
    /*切换分类*/
    onBar(index) {
      const that = this;
      this.setTabindex(index);
      that.categoryContent = that.categoryList[this.$store.state.tabindex];
    },
    /*进入商品详情*/
			onDetail(item) {
				this.$router.push('/detail');
				this.setGoods(item)
			},
    ...mapMutations({
				setGoods: 'SET_GOODS',
				//setCarts: 'SET_CARTS',
				setTabindex: 'SET_TABINDEX',
				//setComname: 'SET_COMNAME'
			})

  },
  components:{
    headers,
    footers
  }
}
</script>

<style lang="scss" scoped>
@import 'static/scss/variable.scss';
    .category{
      .container{
        width: 100%;
        padding-top:42px;
        padding-bottom: 40px;
        &.move-enter-active, &.move-leave-active{
           transition:all .5s linear;
         }
        &.move-enter, &.move-leave-active{
           transform: translate3d(-100%, 0, 0);
         }
        .left-bar{
          position:fixed;
          background-color: #fafafa;
          top:42px;
          left: 0;
          width:90px;
          height: 560px;
          border-right: 1px solid #ccc;
          .barItem{
            font-size: 14px;
            text-align: center;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #ccc;
            margin-top: -14px;
            &:hover{
              background-color: $theme_hover;
            }
          }
        }
        .rightContent{
          width:100%;
          flex: 1;
          margin-top:42px;
          margin-left: 2px;
          .rightItem{
            width: 100%;
            .categoryItem{
                display: flex;
                border-bottom: 1px solid #ccc;
                .item{
                  display: flex;
                  width: 100%;
                  margin-left: 82px;
                  .goods-Img{
                    width:120px;
                    height:122px;
                    img{
                      width: 100%;
                      height: 100%;
                    }
                  }
                  .goods-Name{
                    font-size: 12px;
                  }
                  .goods-Couch{
                    color:#ff2600;
                    font-size: 12px;
                  }
                  .goods-cartBox{
                    img{
                      width: 20px;
                      height: 20px;
                    }
                  }
                }
            }
          }
        }
      }
    }
</style>
