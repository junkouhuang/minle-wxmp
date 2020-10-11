<template>
  <div class="collet">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">我的收藏</div>
      <div slot='edior' class="edior" @click="state=!state" v-if="arr.length>0">
        <span v-if="state"><img src="./images/editor.png" style="width:24px;vertical-align:middle;"/></span>
        <span v-else>完成</span>
      </div>
    </tops>
    
    <!-- 有商品 -->
    <div class="content677" v-if="arr.length>0">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul>
          <li v-for="(item,index) in arr" :key="index">
            <div class="time">{{item.createTime | formatDate}}</div>
            <div class="clear">
              <van-checkbox
                class="check"
                v-model="item.check"
                @click="singlecheck(index)"
                checked-color="#FF5555"
                v-if="!state"
              ></van-checkbox>
              <div class="img"  @click="toDetail(item)">
                <img :src="item.titlePicture" alt/>
              </div>
              <div class="text"  @click="toDetail(item)">
                <p class="commodityName">{{item.commodityName}}</p>
                <p class="price">
                  <span><em>￥</em>{{item.price == null?0:item.price}}</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </van-list>
      <van-submit-bar
        button-text="刪除"
        :loading="loading"
        class="btn"
        round
        @submit="del"
        v-if="!state"
      >
        <van-checkbox @click="checkAll" v-model="checked" checked-color="#FF5555"  class="checkall">全选</van-checkbox>
      </van-submit-bar>
    </div>
    <!-- 有商品end -->
    <!-- 无商品 -->
    <div v-else>
      <div class="content">
        <img src="./images/noimg.png" alt="">
        <p>暂无收藏</p>
        <div class="oDiv">
          <router-link to="/home">快去逛逛吧</router-link>
        </div>
      </div>
    </div>
    <!-- 无商品end -->
    </div>
  </div>
</template>

<script>
  export {default} from './js/index'
</script>
<style lang="less" scope>
  @import './less/index';
</style>
