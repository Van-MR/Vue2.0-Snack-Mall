
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router/index'
import axios from 'axios'
import store  from './Store'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import VueAwesomeSwiper from 'vue-awesome-swiper'

var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'}) //滑动事件
VueTouch.config.swipe = {            //配置滑动区域为左滑动，解决和滚动事件的冲突
	direction: 'horizontal',
  	threshold: 200
}

Vue.config.productionTip = false
Vue.use(VueLazyLoad, {//懒加载声明错误图和占位图
  preLoad: 1.3,
  //error: './static/img/food.jpg',
  loading: './static/img/loading1.gif',
  throttleWait:800
})

require('../mock')

Vue.use(Vuex)
Vue.prototype.$http = axios
fastclick.attach(document.body) //解决移动端点击事件200ms延迟

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
