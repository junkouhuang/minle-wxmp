<template>
  <div class="header">
    <div class="top">
      <div slot='left' class="arrow" @click="$router.go('-1')"></div>
      <div slot='center' class="title">分享二维码</div>
    </div>
    <div class="abc" >
      <div id="qrcode">

        <img class="qrcode" :src="qrcodeImg">

        <span class="scan">扫一扫 · 按压识别二维码</span>
        <!--<span class="tip">扫一扫 · 按压识别二维码</span>-->
      </div>
    </div>
  </div>
</template>
<script>
  export {default} from './js/index'
</script>
<style lang="less" scope>
  @import './less/index';
</style>
