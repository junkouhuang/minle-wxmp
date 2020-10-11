<template>
  <div class="history">
    <van-row class="searchBox">
      <van-col span="2">
        <div class="arrow" @click="returns"></div>
      </van-col>
      <van-col span="20">
        <!--
        <van-search  shape="round" placeholder="搜索你想要的商品" class="keyword" v-model.trim="word" @search = "search"/>-->

        <div class="van-search" style="background: rgb(255, 255, 255);" @search = "search" >
          <div class="van-search__content van-search__content--round">
            <div class="van-cell van-cell--borderless van-field">
              <div class="van-field__left-icon">
                <i class="iconfont mmc-icon-sousuo" size="16" style="color:#C1C1C1"></i>
              </div>
              <div class="van-cell__value van-cell__value--alone">
                <div class="van-field__body">
                  <input type="search" id="sword" placeholder="搜索你想要的商品" v-model.trim="word"  class="van-field__control" >
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-col>
      <van-col span="2" >
        <span @click="search">搜索</span>
      </van-col>
    </van-row>





    <div class="content1111">
      <div class="history_record" v-if="historyData!=null && historyData.length>0 ">
        <p>搜索历史<img src="./images/delete.png" @click="delStroage"/></p>
        <ul>
          <li v-for="(name,index) in historyData" :key="index" @click="historyChoose(name)">{{name}}</li>
        </ul>
      </div>
      <div class="recommend_goods" v-if="recommendData.length>0">
        <div><span>推荐商品</span></div>
        <ul>
          <li v-for="(item,index) in recommendData" :key="index" @click="recommendChoose(item.name)">{{item.name}}</li>
        </ul>
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
