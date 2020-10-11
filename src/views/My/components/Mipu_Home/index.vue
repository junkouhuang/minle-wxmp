<template>
  <div class="mipu">
    <div class="Mipu_Home">
      <tops>
        <div slot='left' class="arrow" @click="returns"></div>
        <div slot='center' class="title">米铺</div>
      </tops>

      <!--
      <van-search shape="round" disabled placeholder="搜索您想要找的米铺"  class="search" @click="history"></van-search>
      -->

      <div class="van-search" style="background: rgb(255, 255, 255);" @click="history" >
        <div class="van-search__content van-search__content--round">
          <div class="van-cell van-cell--borderless van-field">
            <div class="van-field__left-icon">
              <i class="iconfont mmc-icon-sousuo" size="16" style="color:#C1C1C1"></i>
            </div>
            <div class="van-cell__value van-cell__value--alone">
              <div class="van-field__body">
                <input type="search" disabled="disabled" placeholder="搜索您想要找的米铺" class="van-field__control" >
              </div>
            </div>
          </div>
        </div>
      </div>

      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in SwipeImg" :key="index">
          <a target="_self" :href="item.url">
            <div class="img" :style="{backgroundImage: 'url(' + item.picture + ')' }"></div>
          </a>
        </van-swipe-item>
      </van-swipe>
      <div class="content1">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad">
          <div class="mipu_row">
            <div class="mipu_col" v-for="(item,index) in mipuList" :key="index">
              <div class="item" @click="info(item)">
                <div class="shop_icon" :style="{backgroundImage: 'url(' + item.applyMipuPictures[0] + ')' }"></div>
                <p class="name">{{item.applyMipuName}}</p>
                <div class="tag">
                  <span v-for="(items,index) in item.applyMipuTags" :key="index">{{items}}</span>
                </div>
                <p class="distance">距离{{item.distince}}</p>
              </div>
            </div>
          </div>
        </van-list>
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
