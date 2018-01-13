<template id="headerTab">
<div class="header">
  <p>{{tabName}}</p>
</div>
</template>

<script>
export default {
  props:['tabName']
}
</script>

<style lang="scss" scoped>
@import 'static/scss/variable.scss';
.header {
    width: 100%;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    text-align: center;
    background: $theme_background;
    color: $base_color;
    font-size: 14px;
    line-height: 14px;
}
</style>
