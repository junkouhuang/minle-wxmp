<template>
  <div class="record">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">提现账单</div>
    </tops>
    <div class="m_bar"  :class="navBarFixed == true ? 'navBarWrap' :''" >
      <div class="m_bar_left" @click="handle('date')">
        <span>{{date}}</span>
        <van-icon name="arrow-down"/>
      </div>
      <div class="m_bar_center">
        <span>总收入￥{{totalAmount | money}}</span>
      </div>
      <div class="m_bar_right">
        <span>本月收入￥{{monthAmount | money}}</span>
      </div>
    </div>
    <div class="m_list">
     <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text=""
        @load="onLoad"
      >
        <template v-if="list.length>0">
          <van-row v-for="(item,index) in list"
                   class="qb_row"
                   :key="index">
            <van-col span="5" class="qb_left">
              <img src="./images/qgreen.png" v-if="item.type == 0"/>
              <img src="./images/mimancang.png" v-if="item.type == 1"/>
              <img src="./images/midian.png" v-if="item.type == 2"/>
            </van-col>
            <van-col span="10">
              <p class="username" v-if="item.type == 0">钱包-单次提现</p>
              <p class="username" v-if="item.type == 1">米米缸-福利提现</p>
              <p class="username" v-if="item.type == 2">米铺-结算提现</p>
              <p class="createTime">{{item.createTime | formatDate}}</p>
            </van-col>
            <van-col span="9" class="qb_right">
              <p class="amount">￥{{(item.amount+item.serviceFee).toFixed(2) | money}}</p>
              <p class="amount1">提现手续费 ￥{{item.serviceFee}}</p>
              <p class="serviceFee" :class="item.status == 0?'hs':''">{{item.status == 0?'提现处理中':item.status == 1?'交易完成':''}}</p>
            </van-col>
          </van-row>
        </template>
        <template v-else>
          <van-row class="empty" >
            <img src="./images/noimg.png"/>
            <p>暂无数据</p>
            <div><router-link to="/home">快去购物吧</router-link></div>
          </van-row>
        </template>
      </van-list>
      <van-popup
        v-model="showPopup"
        position="bottom"
      >
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          :min-date="minDate"
          :formatter="formatter"
          @confirm="getTime"
          @cancel="cancel"
          v-if="showDate"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
  export {default} from './js/index'
</script>

<style lang="less" scope>
  @import './less/index';
</style>
