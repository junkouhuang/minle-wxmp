<template>
  <div class="detail">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">米铺信息</div>
      <!--<div slot='edior' class="edior" @click="recode">交易记录</div>-->
    </tops>
    <div class="applyMipuCover" :style="{backgroundImage: 'url(' + list.applyMipuCover + ')' }">
      <div class="content">
        <div class="top">
        <div :style="{backgroundImage: 'url(' + list.applyMipuCover + ')' }" class="bgImG"/>
        <div class="right">
          <p class="applyMipuName">{{list.applyMipuName}}</p>
          <div class="tigs">
            <span v-for="(item,index) in list.applyMipuTags" :key="index">{{item}}</span>
          </div>
          <div class="collage" @click="collageFun" v-if="!collage"><img src="./img/collage.png">收藏</div>
          <div class="collage" @click="collageFun" v-else><img src="./img/xin.png">已收藏</div>
        </div>
        </div>
        <p class="applyMipuDescribe">{{list.applyMipuDescribe}}</p>
      </div>
    </div>
    <div class="tie">
      <div>
        <span>店长：</span>
        {{list.applyAuthRealName}}
      </div>
      <div>
        <span>电话：</span>
        {{list.applyMipuTelephone}}
        <a :href="'tel:' + list.applyMipuTelephone">
        <img src="./img/phone.png">
        </a>
      </div>
      <div>
        <span>营业时间：</span>
        {{list.applyMipuHours}}
      </div>
      <div>
        <span>地址：</span>
        {{list.applyMipuProvince}}{{list.applyMipuCity}}{{list.applyMipuRegion}}{{list.applyMipuAddress}}
        <img src="./img/car.png">
      </div>
    </div>
    <div class="imgList">
      <p>米铺照片</p>
      <div class="list">
        <van-row gutter="10">
          <van-col span="8" v-for="(item,index) in list.applyMipuPictures" :key="index">
            <div class="img" :style="{backgroundImage: 'url(' + item + ')' }" @click="showImagePreviewHandle"></div>
          </van-col>
        </van-row>
      </div>
    </div>
    <p>&nbsp;</p>
    <!--图片预览start-->
    <van-image-preview
      v-model="showImagePreview"
      :images="banner"
      :startPosition = "startPosition"
      @change="imagePreviewChange"
    >
      <template v-slot:index>{{ imagePreviewChangeIndex }}/{{banner.length}}</template>
    </van-image-preview>
    <div class="pay">
      <p>支付金额</p>
      <div  class="inpu">
        <span>￥</span>
        <input placeholder="请输入支付金额" type="number" v-model.tirm="totalAmount"/>
      </div>
      <button @click="next" class="btn">确认支付</button>
    </div>
  </div>
</template>

<script>
  export {default} from './js/index'
</script>
<style lang="less" scope>
  @import './less/index';
</style>
