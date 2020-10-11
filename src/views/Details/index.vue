<template>
  <div class="detail">
    <tops>
      <div slot='left' class="arrow" @click="back"></div>
      <div slot='center' class="title">商品详情</div>
    </tops>

    <div class="content99999">
      <!-- 轮播图start-->
      <div class="swipeD">
        <van-swipe @change="bannerImgChange" indicator-color="white">
          <van-swipe-item v-for="(banner,index) in banner" :key="index">
            <img v-lazy="banner" style="width: 100%" @click="showImagePreviewHandle"/>
            <div class="custom-indicator" slot="indicator">
              {{ 1 }}/1
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 轮播图end -->
      <div class="fui">
        <div class="fui-cell01">
          <div class="fui-name">
            <span class="micoyp" v-if="ProductDetail.source==0">民乐优品</span>
            <span class="jd" v-if="ProductDetail.source==2">京东商品</span>
            <span class="taobao" v-if="ProductDetail.source==6">淘宝商品</span>
            <span class="tmall" v-if="ProductDetail.source==7">天猫商品</span>
            {{ProductDetail.name}}
          </div>
        </div>
        <div class="fui-cell02">
          <div class="fui-price">
            <em>￥</em> {{ProductDetail.price}}
          </div>
          <div class="fui-originalPrice" v-if="ProductDetail.originalPrice!=null &&  ProductDetail.originalPrice!=0">{{type==1?'建议零售':'价格'}}：
            <span :class="[type==1?'':'name']">&nbsp;
            <em>￥</em>{{ProductDetail.originalPrice==null?0:ProductDetail.originalPrice}}
            </span>
            <span v-if="ProductDetail.price" style="margin-left:10px;border:1px solid #FF5555;font-size:12px;color:#FF5555;padding-left:3px;padding-right:3px;border-radius:4px;">优惠促销</span>
            <span v-if="ProductDetail.commodityStandardList" style="margin-left:10px;border:1px solid #FF5555;font-size:12px;color:#FF5555;padding-left:3px;padding-right:3px;border-radius:4px;">{{ProductDetail.commodityStandardList[0].standardName}}</span>
          </div>
          <div class="mili" v-if="ProductDetail.discount">
            <span>送{{ProductDetail.discount}}米粒</span>
          </div>

        </div>
        <div class="fui-cell03">
          <div class="fui-express">
            快递：免运费
          </div>
          <div class="fui-sell">
            月销 {{ProductDetail.sales}} 笔
          </div>
          <div class="fui-sku">
            库存：{{ProductDetail.inventory}}件
          </div>
        </div>

        <div class="fui-cell04-ext">
          <!-- bar start -->
          <van-row class="bar">
            <van-col span="6">
              <img src="./images/bb.png"/>
              <span>品质保障</span>
            </van-col>
            <van-col span="6">
              <img src="./images/bb.png"/>
              <span>特惠低价</span>
            </van-col>
            <van-col span="6">
              <img src="./images/bb.png"/>
              <span>闪电发货</span>
            </van-col>
            <van-col span="6">
              <img src="./images/bb.png"/>
              <span>极速退款</span>
            </van-col>
          </van-row>
          <!-- bar end -->
        </div>

        <div class="fui-cell04" @click="specHandle"  >
          <p class="p1">
            <span class="sp">商品规格</span>
            <span class="p2">{{alreadySel == ""?'':alreadySel+"&nbsp; , "}}&nbsp;{{selNum}}件</span>
            <span class="p3"><img src="./images/right.png"></span>
          </p>
        </div>
        <div class="fui-cell05">
          <p class="p1">
            <span class="sp">商品详情</span>
            </span>
          </p>
          <div v-html="ProductDetail.detail" class="pdetail"> </div>
        </div>

      </div>
      <div class="blank"></div>
    </div>

    <!-- 规格弹层start -->
    <van-popup v-model="showSpecPopup" class="showSpecPopup" closeable close-icon="close" round  position="bottom" :style="{height: '70%'}">
      <van-sticky :offset-top="10">
      <van-row class="spinfo">
        <van-col span="6">
          <img :src="selPicture" class="titlePicture"/>
        </van-col>
        <van-col span="18">
          <p class="name">{{ProductDetail.name}}</p>
          <p class="alreadySel" v-if="alreadySel">已选：{{alreadySel == ""?'':alreadySel+"&nbsp; , "}}&nbsp;{{selNum}}件</p>
          <p class="price"><em>￥</em><span class="spc">{{selPrice}}</span><span class="ins">库存：{{alreadyInventory > 0 ? alreadyInventory : ProductDetail.inventory}}件</span>
</p>
        </van-col>
      </van-row>
      </van-sticky>
      <van-row class="buy_spec" v-if="skuGroups.length > 0">
        <span class="mc">规格</span>
      </van-row>
      <van-row class="sp_style" >
          <span  v-for="(item,index) in skuGroups" :key="index" class="list" :class="item['flag']?'active':''"  @click="selGuige(item,index)">{{item.skuList}}</span>
      </van-row>
      <div class="buy_num">
        <span class="mc">数量</span>
        <div class="sl">
          <button class="sub" @click="sub1">
            <img src="./images/sub.png">
          </button>
          <input type="number" :value="selNum" @input="getNum"/>
          <button class="add" @click="add1">
            <img src="./images/add1.png">
          </button>
        </div>
      </div>
      <van-goods-action class="btn_style">
        <van-goods-action-button class="btn_car" type="warning" text="加入购物车" @click="addCar"/>
        <van-goods-action-button class="btn_buy" type="danger" text="立即购买" @click="buynow"/>
      </van-goods-action>
    </van-popup>
    <!-- 规格弹层end -->
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
    <!-- 底部导航start -->
    <van-goods-action>
      <van-goods-action-icon v-if="iscollect" :icon="require('./images/fos.png')" @click="collect">
        <div class="collet">
          <span>收藏</span>
        </div>
      </van-goods-action-icon>
       <van-goods-action-icon v-else :icon="require('./images/ufos.png')" @click="collect">
        <div class="collet">
          <span>收藏</span>
        </div>
      </van-goods-action-icon>
      <van-goods-action-icon :icon="require('./images/car.png')" @click="tocar">
        <div class="car_o">
          <span class="tip" v-if="caramount>0">{{caramount}}</span>
          <span>购物车</span>
        </div>
      </van-goods-action-icon>

      <van-goods-action-button type="warning" text="加入购物车" @click="addCar"/>
      <van-goods-action-button type="danger" text="立即购买" @click="buynow"/>
    </van-goods-action>
    <!-- 底部导航end -->
  </div>
</template>

<script>
  export {default} from './js/index'
</script>

<style lang="less" scoped>
  @import './less/index';
</style>


