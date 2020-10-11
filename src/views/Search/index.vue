<template>
  <div class="search">
    <div :class="navBarFixed == true ? 'navBarWrap' :''">
      <!--搜索框start-->
      <van-row class="searchBox">
        <van-col span="2">
          <div class="arrow1" @click="back"></div>
        </van-col>
        <van-col span="20">
          <!--<van-search placeholder="搜索你想要的商品" shape="round" @search="goSearch" v-model.trim="keyword"/>-->
          <!-- <div class="search_" @search="goSearch">
             <img src="./images/search.png"/>
             <input placeholder="搜索你想要的商品" type="search"  v-model.trim="keyword">
           </div>
           
          <van-search placeholder="搜索你想要的商品" shape="round" class="keyword" style= "background-color: #F7F7F7;" @click="$router.push('/history')" disabled v-model="keyword"/>-->

          <div class="van-search" style="background: rgb(255, 255, 255);" @click="$router.push({'path': '/history', query: {'word': keyword}})" >
            <div class="van-search__content van-search__content--round">
              <div class="van-cell van-cell--borderless van-field">
                <div class="van-field__left-icon">
                  <i class="iconfont mmc-icon-sousuo" size="16" style="color:#C1C1C1"></i>
                </div>
                <div class="van-cell__value van-cell__value--alone">
                  <div class="van-field__body">
                    <input type="search" disabled="disabled" placeholder="搜索你想要的商品" class="van-field__control" v-model="keyword">
                  </div>
                </div>
              </div>
            </div>
          </div>

        </van-col>
        <van-col span="2">
          <img src="./images/q012x.png" @click="switchs" v-if="swit" class="sw" style="width:25px;"/>
          <img src="./images/q022x.png" @click="switchs" v-else class="sw" style="width:25px;"/>
        </van-col>
      </van-row>
      <!--搜索框end-->
      <!--选项卡start-->
      <div class="tabs">
        <div class="item" @click="handleBar(1)" :class="active===1?'active':''">
          <div class="synthesize">
            <span>综合</span>
            <div class="arrow">
              <img src="./images/down2.png" class="down" />
            </div>
          </div>
        </div>
        <div class="item" >
          <div class="price" @click.stop="handleBar(2)" :class="ispx==-1?'':ispx===true?'asc':'dsc'">
            <span>销量</span>
            <div class="arrows">
              <img src="./images/default.png" class="default" v-if="ispx=='-1'"/>
              <img src="./images/pull.png" class="pull" v-if="ispx==true"/>
              <img src="./images/down.png" class="down" v-if="ispx==false"/>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="price" @click.stop="handleBar(3)" :class="isSort==-1?'':isSort===true?'asc':'dsc'">
            <span>价格</span>
            <div class="arrows">
              <img src="./images/default.png" class="default" v-if="isSort=='-1'"/>
              <img src="./images/pull.png" class="pull" v-if="isSort==true"/>
              <img src="./images/down.png" class="down" v-if="isSort==false"/>
              <!--<van-icon name="play" class="up"/>
              <van-icon name="play" class="down"/>-->
            </div>
          </div>
        </div>
        <div class="item sx" @click="handleBar(4)">
          <span>筛选</span>
          <!--<i class="iconfont icon-shaixuan"></i>-->
          <img src="./images/screen.png" />
        </div>
        <van-popup
          v-model="showSx"
          position="right"
          :style="{ width:'80%',height: '100%' }"
        >
          <div class="sx_fixed">
            <div class="tip">商品标签</div>
            <div class="m_content">
              <van-row>
                <van-col span="8" class="col_m">
                  <div :class="hotindex == -1?'m_active':''" @click="labelSearch('',-1)">全部</div>
                </van-col>
                <van-col span="8" v-for="(item,index) in hotgoodlist" :key="index" class="col_m">
                  <div :class="hotindex == index?'m_active':''" @click="labelSearch(item.id,index)">{{item.tagName}}
                  </div>
                </van-col>
              </van-row>
            </div>
            <div class="classify">商品品类</div>
            <div class="m_content">
              <van-row>
                <van-col span="8" class="col_m">
                  <div :class="active1 == -1?'m_active':''" @click="choose('',-1)">全部</div>
                </van-col>
                <van-col span="8" v-for="(item,index) in classifyList" :key="index" class="col_m">
                  <div :class="active1 == index?'m_active':''" @click="choose(item.id,index)">{{item.typeName}}</div>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-popup>
        <div>
        </div>
      </div>
      <!--选项卡end-->
    </div>
    <!-- 列表start-->
    <div v-if="SearchList.length>0" class="content">
      <van-list
        v-model="loading"
        :immediate-check="false"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        v-if="swit"
      >
        <van-row class="m_0" gutter="15">
          <van-col span="12" v-for="(item,index) in SearchList" :key="index" style="margin:7px 0">
            <div class="item">
              <van-image lazy-load :src="item.titlePicture==''?noimg:`${item.titlePicture}`" class="c_icon" @click="detail(item)"/>
              <div class="goodsName">
                <van-tag color="#FF5555" v-if="item.source==0">民乐优品</van-tag>
                <van-tag color="#FC353A" v-if="item.source==2">京东商品</van-tag>
                <van-tag color="#FFB701" v-if="item.source==6">淘宝商品</van-tag>
                <van-tag color="#FF0032" v-if="item.source==7">天猫商品</van-tag>
                {{item.name}}
              </div>
              <div class="sale1">月销&nbsp;{{item.sales==null?0:item.sales}} 笔</div>
              <div class="sellPrice">
                <span><em>￥</em>{{item.price}}</span>
                <div class="sent" v-if="item.discount">
                  <span>送{{item.discount}}米粒</span>
                </div>
              </div>
              <div class="price_commodityPrice" v-if="item.originalPrice!=null &&  item.originalPrice!=0">
                <span class="name">价格：&nbsp;<span>
                    <em>￥</em>{{item.originalPrice==null?0:item.originalPrice}}</span></span>&nbsp;
                <span class="shopping-cart" @click="gocar($event,item)"/>
              </div>
              
            </div>
          </van-col>
        </van-row>
      </van-list>
      <van-list
        v-model="loading"
        :immediate-check="false"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        v-else
      >
        <van-row>
          <van-col span="24" v-for="(item,index) in SearchList" :key="index" >
            <div class="item" style="margin:7px ">
              <van-row>
                <van-col span="8">
                  <van-image lazy-load :src="item.titlePicture==''?noimg:`${item.titlePicture}`" class="c_icon" @click="detail(item)"/>
                </van-col>
                <van-col span="16" class="item_right">
                  <div class="goodsName">
                    <van-tag color="#FF5555" v-if="item.source==0">民乐优品</van-tag>
                    <van-tag color="#FC353A" v-if="item.source==2">京东商品</van-tag>
                    <van-tag color="#FFB701" v-if="item.source==6">淘宝商品</van-tag>
                    <van-tag color="#FF0032" v-if="item.source==7">天猫商品</van-tag>
                    {{item.name}}
                  </div>
                  <div class="sale1">月销&nbsp;{{item.sales==null?0:item.sales}} 笔</div>
                  <div class="tag" v-if="item.commodityStandardList.length!=0 && item.commodityTagId==3"><span>{{item.commodityStandardList[0].standardName}}</span>
                  </div>
                  <div class="sellPrice">
                    <span><em>￥</em>{{item.price}}</span>
                    <div class="sent" v-if="item.discount">
                      <span>送{{item.discount}}米粒</span>
                    </div>
                    
                  </div>
                  <div class="price_commodityPrice" v-if="item.originalPrice!=null &&  item.originalPrice!=0">
                    <span class="name">价格：&nbsp;<span>
                    <em>￥</em>{{item.originalPrice==null?0:item.originalPrice}}</span></span>&nbsp;
                    <span class="shopping-cart" @click="gocar($event,item)"/>
                  </div>
                </van-col>
              </van-row>
            </div>
          </van-col>
        </van-row>
      </van-list>
    </div>
    <div class="no" v-else>
      <img src="./images/noimg.png" alt/>
      <p class="text">暂无数据</p>
      <!--<div class="oDiv">
        <router-link to="/home">去购物</router-link>
      </div>-->
    </div>
    <!--列表end-->
  </div>
</template>

<script>
  export {default} from './js/index'
</script>

<style lang="less" scoped>
  @import './less/index';
</style>

<style>
  .van-grid-item__content {
    padding: 0;
  }
</style>
