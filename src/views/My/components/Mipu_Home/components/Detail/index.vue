<template>
  <div class="detail">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">米铺信息</div>
      <div slot='edior' class="edior" @click="recode">收款记录</div>
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
          <img src="./img/right.png" @click="editor" class="right_icon">
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
      </div>
      <div>
        <span>营业时间：</span>
        {{list.applyMipuHours}}
      </div>
      <div class="address">
        <span>地址：</span>
        {{list.applyMipuCity}}{{list.applyMipuRegion}}{{list.applyMipuAddress}}
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
    <!--图片预览start-->
    <van-image-preview
      v-model="showImagePreview"
      :images="banner"
      :startPosition = "startPosition"
      @change="imagePreviewChange"
    >
      <template v-slot:index>{{ imagePreviewChangeIndex }}/{{banner.length}}</template>
    </van-image-preview>
    <!--图片预览end-->
  </div>
</template>

<script>
  export {default} from './js/index'
</script>
<style lang="less" scope>
  @import './less/index';
</style>
