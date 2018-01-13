<template lang="html">
     <footer>
          <div class="footer-item">
              <router-link to='/main'>
                  <i class="footer-icon iconfont icon-Home"></i>
                  <p class="footer-title">首页</p>
              </router-link>
          </div>
          <div class="footer-item">
              <router-link to="/category">
                <i class="footer-icon iconfont icon-category"></i>
                <p class="footer-title">分类</p>
              </router-link>
          </div>
          <div class="footer-item">
              <router-link to="/cart">
                <i class="footer-icon iconfont icon-cart"></i>
                <p class="footer-title">购物车</p>
              </router-link>
          </div>
          <div class="footer-item">
              <router-link to="/member">
                <i class="footer-icon iconfont icon-mine"></i>
                <p class="footer-title">我的</p>
              </router-link>
          </div>
     </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import 'static/scss/variable.scss';
footer {
    width: 100%;
    height: 40px;
    z-index: 10000;
    position: fixed;
    display: flex;
    bottom: 0;
    left: 0;
    color: $base_textColor;
    background-color: #ffffff;
    box-shadow: 0 -2px 9px rgba(0, 0, 0, .1);
    .footer-item {
        align-items: center;
        justify-content: center;
        flex: 1 1 auto;
        text-align: center;
        & a {
            text-decoration: none;
        }
        .footer-title {
            color: $base_textColor;
            font-size: 10px;
            margin-top: -1px;
        }
        .footer-icon{
          font-size: 20px;
          color:red;
        }

    }
}
</style>
