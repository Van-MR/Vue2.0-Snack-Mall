<template lang="html">
     <div class="nopage">
         <div class="flex">
           <img src="../../../static/img/nodata.jpeg" />
           <p>暂无数据，请前往添加。</p>
         </div>
     </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
    .flex{
      display: flex;
      flex-direction: column;
  		align-items: center;
  		justify-content: center;
  		font-size: 12px;
      img {
    		text-align: center;
    		width: 70px;
    		height: 70px;
    	}
      p {
    		text-align: center;
    	}
    }
</style>
