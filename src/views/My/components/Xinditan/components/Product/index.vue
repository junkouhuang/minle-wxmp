<template>
  <div class="phome">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">在线选品</div>
      <!--<div slot='edior' class="edior" @click="editHandle">{{!editshow? '编辑': '取消'}}</div>-->
    </tops>

    <div class="van-search" style="background: rgb(255, 255, 255);"  :class="navBarFixed == true ? 'navBarWrap' :''" >
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
                  <div class="pr"><em>￥</em>{{hot.price}}</div>

                  <div class="chose" v-if="editshow">
                    <van-checkbox :name="hot.commodityNo" v-model="hot.check" checked-color="#FF5555" ></van-checkbox>
                  </div>
                </div>

              </van-col>
            </van-row>
          </van-list>
        </div>

      </van-pull-refresh>
    </div>
    <button class="delete" @click="chooseHandle" v-if="editshow">确认选品</button>
  </div>
</template>

<script>
  export {default} from './js/index'
</script>

<style lang="less" scope>
  @import './less/index';
</style>
