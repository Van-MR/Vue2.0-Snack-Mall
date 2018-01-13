<template lang="html">
       <header>
         <img src="../../../static/img/icon/arrowBack.png" @click="onBack" />
         <p>{{tabName}}</p>
       </header>
</template>

<script>
export default {
  props:['tabName'],
  data() {
    return{
      isBack: true
    }
  },
  methods:{
     onBack() {
       if(this.isBack) {
         this.$router.back();
        } else {
         this.$router.push('./member');
       }
     }
  }
}
</script>

<style lang="scss" scoped>
@import 'static/scss/variable.scss';
header {
    width: 100%;
    position: fixed;
    display: flex;
    z-index: 1000;
    left: 0;
    top: 0;
    text-align: center;
    background: $theme_background;
    color: $base_color;
    font-size: 14px;
    line-height: 14px;
    img {
		width: 34px;
		height: 24px;
		margin-left:5px;
    margin-top: 9px;
	  }
    p {
		text-align: center;
		width: 100%;
		margin-right: 5px;
	}
}

</style>
