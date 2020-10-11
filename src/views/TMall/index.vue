<template>
  <div class="tmhome">
    <!--
    <van-search shape="round" disabled placeholder="搜索你想要的商品" @click="toHistory"></van-search>
    -->

    <div class="van-search" style="background: rgb(255, 255, 255);" @click="toHistory" >
      <div class="van-search__content van-search__content--round">
        <div class="van-cell van-cell--borderless van-field">
          <div class="van-field__left-icon">
            <i class="iconfont mmc-icon-sousuo" size="16" style="color:#C1C1C1"></i>
          </div>
          <div class="van-cell__value van-cell__value--alone">
            <div class="van-field__body">
              <input type="search" disabled="disabled" placeholder="搜索你想要的商品" class="van-field__control" >
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="list-content" id="list-content">
      <van-pull-refresh v-model="isLoading" class="h_scroll" @refresh="onRefresh">
        <!--轮播图start-->
        <div class="swipe">
          <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in SwipeImg" :key="index">
              <a target="_self" :href="item.url">
                <img :src="item.picture" class="img"/>
              </a>
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- 分类start-->
        <div class="h_classify"  v-if="len>0">
           <van-swipe indicator-color="white" @change="onChange">
             <van-swipe-item v-for="(len,inx) in len" :key="inx">
               <div class="c_item" v-for="(child,index) in classifyList" :key="index">
                 <img :src="child.picture" class="c_img" v-if="child.picture != '' && child.picture !=null" @click="$router.push({'path':'/classify',query:{'id':child.id,'index':index,'pageNum':pageNum2}})"/>
                 <img src="./icon/default.png" class="c_img" v-else @click="$router.push({'path':'/classify',query:{'id':child.id,'index':index,'pageNum':pageNum2}})"/>
                 <span>{{child.typeName}}</span>
               </div>
             </van-swipe-item>
           </van-swipe>
         </div>

        <div class="adv" v-if="advList.length > 0">
          <van-swipe  :autoplay="4000">
            <van-swipe-item v-for="(item,index) in advList" :key="index">
              <a target="_self" :href="item.url" class="2">
                <img :src="item.picture" />
              </a>
            </van-swipe-item>
          </van-swipe>
        </div>
         
        <div class="you">
          <div class="h_3"><!--天猫优选-->
            <div class="h_bj"></div>
          </div>
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad">
            <van-row class="h_row">
              <van-col span="8" v-for="(hot,index) in ProductList_you" :key="index" class="h_item">
                <!--<img v-lazy="hot.titlePicture==''?noimg:`${hot.titlePicture}`" class="h_icon" @click="detail(hot)"/>-->
                <van-image lazy-load :src="hot.titlePicture==''?noimg:`${hot.titlePicture}`" class="c_icon" @click="detail(hot)"/>
                <div class="hotName"><div class=" fui-name">{{hot.name}}</div></div>
                <!--  
                <div class="hotsale">
                  <span class="sale">销量:&nbsp;{{hot.sales==null?0:hot.sales}}件</span>
                </div>-->
                <div class="hotprice">
                  <span><em>￥</em>{{hot.price}}</span>
                  <div class="sent" v-if="hot.discount"><span>送{{hot.discount}}米粒</span></div>
                </div>
                <div class="originalPrice" v-if="hot.originalPrice!=null &&  hot.originalPrice!=0">
                  <span class="name">
                  价格：<span>
                    <em>￥</em>{{hot.originalPrice==null?0:hot.originalPrice}}</span>
                  </span>&nbsp;
                  <span class="shopping-cart" @click="gocar($event,hot)"></span>
                </div>
              </van-col>
            </van-row>
          </van-list>
        </div>
       
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
  export {default} from './js/index'
</script>

<style lang="less" scope>
  @import './less/index';
</style>
