import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//主页
const Main = () => import('../components/main/Main');
//商品分类页
const Category = () => import('../components/category/Category');
//购物车页
const Cart = () => import('../components/cart/Cart');
//个人中心页
const Member = () => import('../components/member/Member');
//商品详情页
const Detail = () => import('../components/detail/Detail');
//个人信息页
const Info = () => import('../components/member/info')
//我的订单页面
const Order = () => import('../components/order/Order')
//地址页面
const Address = () => import('../components/address/Address')
//新增地址页面
const addAddress = () => import('../components/address/addAddress')

export default new Router({
  routes: [
          {
            path: '/',
            redirect:'/main'
          },
          {
            path:'/main',
            component: Main
          },
          {
            path:'/cart',
            component:Cart
          },
          {
            path:'/category',
            component:Category
          },
          {
            path:'/member',
            component:Member
          },
          {
            path: '/detail',
            component: Detail
          },
          {
            path:'/info',
            component:Info
          },
          {
            path:'/order',
            component:Order
          },
          {
            path:'/address',
            component:Address
          },
          {
            path:'/addAddress',
            component:addAddress
          }
      ]
})
