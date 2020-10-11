<template>
  <div class="home">
  <!--
    <van-search shape="round" disabled placeholder="搜索你想要的商品" 
    left-icon="mmc-icon-sousuo" 
    right-icon="scan" @click-right-icon="scan">
    </van-search>-->

    <div class="van-search" style="background: rgb(255, 255, 255);" @click="toHistory" >
      <div class="van-search__content van-search__content--round">
        <div class="van-cell van-cell--borderless van-field">
          <div class="van-field__left-icon">
            <i class="iconfont mmc-icon-sousuo" size="16" style="color:#C1C1C1"></i>
          </div>
          <div class="van-cell__value van-cell__value--alone">
            <div class="van-field__body">
              <input type="search" disabled="disabled" placeholder="搜索你想要的商品" class="van-field__control" >
              <div class="van-field__right-icon" @click="scan">
                <i class="iconfont mmc-icon-saomiaoshibie" style="color:#FF5555" @click="scan"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content1111">
      <div class="classfyShot" >        
        <div v-for="(item,index) in classifyList2" :key="index" >
          <a target="_self" v-if="index==0" :class="index==0?'cur':''"  @click="$router.push({'path':'/classify',query:{'id':item.id,'index':index,'pageNum':0}})" style="display:block;width:50px">
           {{item.typeName}}
          </a>
          <a target="_self" v-else @click="$router.push({'path':'/classify',query:{'id':item.id,'index':index,'pageNum':0}})" style="display:block;width:80px">
           {{item.typeName}}
          </a>
        </div>
      </div>
      <div class="classfyBtn" @click="$router.push({'path':'/classify'})">          
        <span>
          <img src="./images/classfy.png">
        </span>
      </div>
    </div>

    <div class="list-content" id="list-content">
      <van-pull-refresh v-model="isLoading" class="h_scroll" @refresh="onRefresh">
      
        <!--轮播图start-->
        <div class="swipe1">
          <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in SwipeImg" :key="index">
              <a target="_self" :href="item.url">
                <img :src="item.picture" class="img"/>
              </a>
            </van-swipe-item>
          </van-swipe>
        </div>

        <div class="tet">
          <van-swipe indicator-color="white" @change="onChange" :class="{'mutiline':classifyList.length>5}">
            <van-swipe-item v-for="(len,inx) in length" :key="inx">
              <div class="c_item" v-for="(child,index) in classifyList" :key="index">                           
                <a target="_self" :href="child.categoryUrl">
                  <img :src="child.iconfont" class="c_img" />
                  <span>{{child.categoryName}}</span>
                </a>
              </div>
            </van-swipe-item>
          </van-swipe>
          
        </div>
        <div class="adv" >
          <van-swipe  :autoplay="4000">
            <van-swipe-item v-for="(item,index) in advList" :key="index">
              <a target="_self" :href="item.url" class="2">
                <img :src="item.picture" />
              </a>
            </van-swipe-item>
          </van-swipe>
        </div>

        <!-- 优选区start -->
        <div class="you">
          <div class="h_3"><!--云仓优品-->
            
          </div>
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad">
            <van-row class="h_row">
              <van-col span="12" v-for="(hot,index) in ProductList_you" :key="index" class="h_item">               
                <van-image lazy-load :src="hot.titlePicture==''?noimg:`${hot.titlePicture}`" class="c_icon" @click="detail(hot)"/>
                <div class="hotName"><div class="fui-name">{{hot.name}}</div></div>
                <!--  
                <div class="hotsale">
                  <span class="sale">月销:&nbsp;{{hot.sales==null?0:hot.sales}}笔</span>
                </div>-->
                <div class="hotprice">
                  <span><em>￥</em>{{hot.price}} </span>
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
