<template>
  <div class="pshome">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">批发商城</div>
    </tops>

    <div class="van-search" style="background: #f7f7f7!important;margin-top: 45px;"  :class="navBarFixed == true ? 'navBarWrap' :''" >
      <div class="van-search__content van-search__content--round">
        <div class="van-cell van-cell--borderless van-field">
          <div class="van-field__left-icon">
            <i class="iconfont mmc-icon-sousuo" size="16" style="color:#C1C1C1"></i>
          </div>
          <div class="van-cell__value van-cell__value--alone">
            <div class="van-field__body">
              <input type="search" placeholder="搜索你想要的选品" class="van-field__control" v-model="keyword" >
            </div>
          </div>
        </div>
      </div>
      <div class="word" @click="search">搜索</div>
    </div>

    <div class="list-content" id="list-content">
      <van-pull-refresh v-model="isLoading" class="h_scroll" @refresh="onRefresh">
        <div class="you">
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad">
            <van-row class="h_row">
              <van-col span="8" v-for="(hot,index) in ProductList_you" :key="index" class="h_item">

                <van-image lazy-load :src="hot.titlePicture==''?noimg:`${hot.titlePicture}`" class="c_icon" @click="detail(hot)"/>
                <div class="hotName">
                  <div class="fui-name">{{hot.name}}</div>
                </div>

                <div class="hotprice">
                  <span><em>￥</em>{{hot.wholesalePrice==null?0:hot.wholesalePrice}} </span>
<!--                  <div class="sent" v-if="hot.discount"><span>送{{hot.discount}}米粒</span></div>-->
                </div>
                <div class="originalPrice" v-if="hot.wholesalePrice!=null &&  hot.wholesalePrice!=0">
                  <span class="name">
                  建议零售：<span>
                    <em>￥</em>{{hot.price==null?0:hot.price}}</span>
                  </span>&nbsp;
                  <span class="shopping-cart" @click="gocar($event,hot)"></span>
                </div>

              </van-col>
            </van-row>
          </van-list>
        </div>

      </van-pull-refresh>
    </div>
    <div class="car">
      <div class="shop-card" @click="handleGoCard">
        <img class="car-img" src="../img/car.png" alt="" />
        <div v-if="shopNumber" class="angle-sign">{{ shopNumber }}</div>
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
