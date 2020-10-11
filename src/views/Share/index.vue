<template>
  <div class="share"  :class="{'top0':isshow==1}">
    <tops  v-if="isshow==0">
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">分享商品</div>
    </tops>
    <div class="tops">
      <!--<div class="topleft">
        <div class="left">点击右上角<div class="more"><img src="./images/more.png"></div></div>
        <div class="left">马上分享商品</div>
      </div>
      <img src="./images/finger.png" class="finger"/>-->
      <img src="./images/finger.png" class="finger"/>
      <div class="click">
        <p>点击这里</p>
        <p>立即分享</p>
      </div>
    </div>
    <img :src="bannerPicture" class="bannerPicture">
    <div class="bottom">
      <img src="./images/code.jpg" class="code"/>
      <div class="content">
        <div class="spmc">{{name}}</div>
        <div class="price"><span class="jg"><i>￥</i>{{price}}</span><span class="by">包邮</span></div>
        <button class="buy" @click="buynow">立即购买</button>
      </div>
    </div>
  </div>
</template>

<script>
  export {default} from './js/index'
</script>

<style lang="less" scoped>
  @import './less/index';
</style>
