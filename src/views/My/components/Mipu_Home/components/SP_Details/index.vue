<template>
  <div class="detail">
    <div class="arrow" @click="$router.go(-1)"></div>
    <!-- 选项卡start -->
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab title="商品">
        <div class="content">
          <!-- 轮播图start-->
          <div class="swipe">
            <van-swipe @change="bannerImgChange">
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
                {{ProductDetail.name}}
              </div>
              <!--<a class="share">
                <i class="iconfont icon-fenxiang"></i>
                分享
              </a>-->
            </div>
            <div class="fui-cell02">
              <div class="fui-price">
                <em>￥</em> {{ProductDetail.price}}
              </div>
              <div class="fui-originalPrice">
                <span class="inventory"> 库存：{{ProductDetail.inventory!=null?ProductDetail.inventory:0}}</span>&nbsp;
                <span> 销量：{{ProductDetail.sales}}件</span>
              </div>
            </div>
            <div class="fui-cell03" @click="specHandle">
              <p class="p1">商品规格</p>
              <div class="p2" >
                <span :style="{color:alreadySel != ''?'#909090':''}">{{alreadySel == ""?'选择商品规格':"已选："+alreadySel}}</span>
                <img src="./images/right.png">
              </div>
            </div>
            <div v-html="ProductDetail.detail" class="pdetail">

            </div>
          </div>
          <div class="blank"></div>
        </div>
      </van-tab>
      <van-tab title="规格参数"  v-if="skuGroups!=null">
        <van-cell-group v-for="(c,index) in ProductDetail.commoditySpecList" :key="index">
          <van-cell :title="c.specName" :value="c.specValue"/>
        </van-cell-group>
        <div class="blank"></div>
      </van-tab>
    </van-tabs>
    <!-- 选项卡end -->
    <van-popup v-model="showSpecPopup" class="showSpecPopup" closeable round  position="bottom" :style="{ maxHeight: '70%' }">
      <van-row>
        <van-col span="6">
          <img :src="selPicture" class="titlePicture"/>
        </van-col>
        <van-col span="18">
          <p class="name">{{ProductDetail.name}}</p>
          <p class="alreadySel" v-if="alreadySel">已选：{{alreadySel == ""?'组合':alreadySel}}</p>
          <p class="price"><span>￥</span>{{selPrice}}</p>
        </van-col>
      </van-row>
      <van-row class="sp_style"  v-for="(item,index) in skuGroups" :key="index">
        <p class="mc" >{{item.attributeName}}</p>
        <div class="style_list">
          <span v-for="(val,i) in item.list" :key="i"  :class="val['flag']?val['isActive']?'active':'can':''"  @click="findNextValue(index,i,val,val.level,val.attributeValue)">{{val.attributeValue}}</span>
        </div>
      </van-row>
      <div class="buy_num">
        <span class="mc">数量</span>
        <div class="sl">
          <button class="sub" @click="sub1">
            <img src="./images/sub.png">
          </button>
          <input type="number" value="1"/>
          <button class="add" @click="add1">
            <img src="./images/add1.png">
          </button>
        </div>
      </div>
      <!-- 底部导航start -->
      <van-goods-action>
        <van-goods-action-icon @click="collect" v-if="iscollect" class="collet">
          <van-icon name="like" solt="icon" color="#ff5555" size="20px"/>
          收藏
        </van-goods-action-icon>
        <van-goods-action-icon @click="collect" v-else class="collet">
          <van-icon name="like-o" solt="icon" size="20px"/>
          收藏
        </van-goods-action-icon>
        <van-goods-action-icon>
          <van-icon name="cart-o" solt="icon" size="20px" v-if="caramount>0" @click="tocarHandle"><span class="dot">{{caramount}}</span>
          </van-icon>
          <van-icon name="cart-o" solt="icon" size="20px" v-else @click="tocarHandle"/>
          购物车
        </van-goods-action-icon>
        <van-goods-action-button type="warning" text="加入购物车" @click="addCar"/>
        <van-goods-action-button type="danger" text="立即购买" @click="buynow"/>
      </van-goods-action>
      <!-- 底部导航end -->
    </van-popup>
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
      <van-goods-action-icon @click="collect" v-if="iscollect" class="collet">
        <van-icon name="like" solt="icon" color="#ff5555" size="20px"/>
        收藏
      </van-goods-action-icon>
      <van-goods-action-icon @click="collect" v-else class="collet">
        <van-icon name="like-o" solt="icon" size="20px"/>
        收藏
      </van-goods-action-icon>
      <van-goods-action-icon>
        <van-icon name="cart-o" solt="icon" size="20px" v-if="caramount>0" @click="tocarHandle"><span class="dot">{{caramount}}</span>
        </van-icon>
        <van-icon name="cart-o" solt="icon" size="20px" v-else @click="tocarHandle"/>
        购物车
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

<style lang="less">
  .van-tabs__wrap {
    background-color: #ffffff;

    .van-tabs__nav {
      width: 80%;
      margin: auto;
    }
  }
</style>
<style lang="less">
  .wrap-sku {
    .product-box {
      width: 1200px;
      display: block;
      margin: 0 auto;
    }
    .product-content {
      margin-bottom: 100px;
    }
    .product-delcom {
      color: #323232;
      font-size: 26px;
      border-bottom: 1px solid #EEEEEE;
      padding: 30px 0;
    }
    .product-footerlist {
      margin-top: 10px;
    }
    .product-footerlist li {
      border: 1px solid #606060;
      border-radius: 5px;
      color: #606060;
      text-align: center;
      padding: 4px 8px;
      font-size: 14px;
      float: left;
      margin-right: 20px;
      cursor: pointer;
    }
    .product-footerlist li.productActive {
      background-color: #1A1A29;
      color: #fff;
      border: 1px solid #1A1A29;
    }
    .product-footerlist li.noneActive {
      background-color: #ccc;
      opacity: 0.4;
      color: #000;
      pointer-events: none;
    }
    .product-footer {
      background-color: #1A1A29;
      text-align: center;
    }
    .product-footer a {
      color: #fff;
      text-decoration: none;
      height: 88px;
      line-height: 88px;
      font-size: 28px;
    }
    .price{
      font-size: 30px;
      height: 60px;
      line-height: 60px;
    }
  }
</style>
