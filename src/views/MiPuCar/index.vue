<template>
  <div class="car">
    <tops>
      <div slot='left' class="arrow" @click="$router.go('-1')"></div>
      <div slot='center' class="title">我的购物车</div>
      <div slot='edior' class="edior" @click="handleStatus" v-if="list.length>0">{{editor?'编辑':"完成"}}</div>
    </tops>
    <div class="content88">
      <template v-if="list.length>0">
        <van-row class="list" v-for="(item,index) in list" :key="index">
          <van-col span="2">
            <van-checkbox :name="index" v-model="item.check" checked-color="#ff5555"
                          @click="singlecheck(index)"></van-checkbox>
          </van-col>
          <van-col span="5">
            <div :style="{'background-image': `url(${item.titlePicture==null?noimg:`${item.titlePicture}`})`}"
                 class="img"></div>
          </van-col>
          <van-col span="17" class="produ">
            <div class="producename">
              {{item.commodityName}}
            </div>
            <p class="guige" style="color: #ff5555">{{item.specifications}}</p>
            <div class="price_amount">
              <div class="price"> <div class="amount">x{{item.amount}}</div> <span>￥{{item.commodityPrice}}</span></div>

             <!-- <div class="sl">
                <button class="sub">
                  <img src="./images/sub.png" class="image">
                </button>
                <input type="number" :value="item.amount"/>
                <button class="add">
                  <img src="./images/add1.png" class="image">
                </button>
              </div>-->
            </div>


           <div class="price_commodityPrice" v-if="item.originalPrice!=null &&  item.originalPrice!=0">
              <span class="name"></span>&nbsp;
              <em>￥</em>{{item.originalPrice==null?0:item.originalPrice}}
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
          v-if="editor"
        >
          <van-checkbox @click="checkAll" v-model="checked" checked-color="#ff5555" class="checkall">全选</van-checkbox>
        </van-submit-bar>
        <van-submit-bar
          button-text="删除"
          class="btn"
          round
          @submit="delcar"
          v-else
        >
          <van-checkbox @click="checkAll" v-model="checked" checked-color="#ff5555" class="checkall">全选</van-checkbox>
        </van-submit-bar>
      </template>
      <div v-else class="noimg">
        <van-row>
          <van-col span="24">
            <img src="./images/car.png" class="nogoods"/>
            <p>购物车空空~</p>
            <div class="odiv"><router-link to="/home">去购物吧</router-link></div>
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
