<template>
  <div class="Mipu_Record">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">收款记录</div>
    </tops>
    <div class="nav">
      <!--<van-tabs v-model="active" @change="change" sticky>-->
        <!--<van-tab title="收款记录" name="1">-->
          <div class="content" v-if="show == 1">
            <van-list
              v-model="loading"
              :finished="finished"
              :immediate-check="immediate_check"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <van-cell v-for="(item,index) in arr" :key="index" >
                <van-row>
                  <van-col span="5">
                    <p><div class="left"><img :src="item.avatar"/></div></p>
                  </van-col>
                  <van-col span="13">
                    <p class="userName">{{item.userName}}</p>
                    <p class="timePayment">{{item.timePayment | formatDate}}</p>
                  </van-col>
                  <van-col class="money" span="6">
                    <p>+{{item.realpay | money}}</p>
                  </van-col>
                </van-row>
              </van-cell>
            </van-list>
          </div>
          <!-- 有商品end -->
          <!-- 无商品 -->
          <div v-if="show == 2">
            <div class="content">
              <div class="divs">
                <img src="./img/noimg.png" alt="">
                <p>暂无数据</p>
                <!--<div class="oDiv">
                  <router-link to="/home">去购物</router-link>
                </div>-->
              </div>
            </div>
          </div>
        <!--</van-tab>-->
        <!--
        <van-tab title="消费记录" name="2">
          <div class="content" v-if="show == 1">
            <van-list
              v-model="loading"
              :finished="finished"
              :immediate-check="immediate_check"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <van-cell v-for="(item,index) in arr" :key="index" >
                <van-row>
                  <van-col span="18">
                    <p>{{item.mipuName}}</p>
                    <p class="timePayment">{{item.timePayment | formatDate}}</p>
                  </van-col>
                  <van-col span="6">
                    <p class="totalamount">+{{item.realpay}}</p>
                  </van-col>
                </van-row>
              </van-cell>
            </van-list>
          </div>
          &lt;!&ndash; 有商品end &ndash;&gt;
          &lt;!&ndash; 无商品 &ndash;&gt;
          <div v-if="show == 2">
            <div class="content">
              <div class="divs">
                <img src="./img/noimg.png" alt="">
                <p>暂无数据</p>
                &lt;!&ndash;<div class="oDiv">
                  <router-link to="/home">去购物</router-link>
                </div>&ndash;&gt;
              </div>
            </div>
          </div>
        </van-tab>
        -->
      <!--</van-tabs>-->
    </div>
  </div>
</template>

<script>
  export {default} from './js/index'
</script>
<style lang="less" scope>
  @import './less/index';
</style>
