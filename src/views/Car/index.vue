<template>
  <div class="car">
    <tops>
      <div slot='left' class="total" v-if="list.length>0" >共{{list.length}}件商品</div>
      <div slot='edior' class="edior" @click="handleStatus" v-if="list.length>0">
        <span v-if="editor"><img src="./images/editor.png" style="width:24px;vertical-align:middle;"/></span>
        <span v-else>完成</span>
      </div>
    </tops>
    <div class="content88">
      <template v-if="list.length>0">
        <van-row class="list" v-for="(item,index) in list" :key="index">
          <van-col span="2">
            <van-checkbox :name="index" v-model="item.check" checked-color="#FF5555"
                          @click="singlecheck(index)"></van-checkbox>
          </van-col>
          <van-col span="5">
            <img v-if="item.titlePicture" :src="item.titlePicture" class="img"/>
            <img v-else :src="noimg" class="img"/>
          </van-col>
          <van-col span="17" class="produ">
            <div class="producename">{{item.commodityName}}</div>
            <div class="guige">
              <span>{{item.specifications}}</span>
              <span class="sent" v-if="item.discount">送{{item.discount}}米粒</span>
            </div>
            <div class="price">
              <div>￥{{item.commodityPrice}} 
              <!--<span class="price_commodityPrice" v-if="item.originalPrice!=null"><em>￥</em>{{item.originalPrice}}</span>-->
              </div>
              <span class="amount">x {{item.amount}}</span>
            </div>
          </van-col>

        </van-row>
        <van-submit-bar
          :price="total*100"
          button-text="提交订单"
          :loading="loading"
          class="btn"
          round
          @submit="submitcar"
          v-if="editor" label="应付款"
        >
          <van-checkbox @click="checkAll" v-model="checked" checked-color="#FF5555" class="checkall">全选</van-checkbox>
        </van-submit-bar>
        <van-submit-bar
          button-text="删除"
          class="btn"
          round
          @submit="delcar"
          v-else
        >
          <van-checkbox @click="checkAll" v-model="checked" checked-color="#FF5555" class="checkall">全选</van-checkbox>
        </van-submit-bar>
      </template>
      <div v-else class="noimg">
        <van-row>
          <van-col span="24">
            <img src="./images/car2x.png" class="nogoods"/>
            <p>暂无数据</p>
            <div class="odiv"><router-link to="/home">快去购物吧</router-link></div>
          </van-col>
        </van-row>
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
