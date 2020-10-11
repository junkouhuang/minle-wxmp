<template>
  <div class="SalesPerformance">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">销售业绩</div>
    </tops>
    <div class="qb_img">
      <div class="d1">总业绩(元)</div>
      <div class="d2">{{data.amount==null?0:data.amount | money}}<!--<van-icon name="eye-o" size="16px"/>--></div>
      <van-row class="d3">
        <van-col span="8">
          <div class="d4">本期业绩（元）</div>
          <div class="d5">{{data.weekPerformance==null?0:data.weekPerformance  | money}}</div>
        </van-col>
        <van-col span="8" @click="tixian">
          <div class="d4">昨日业绩（元）</div>
          <div class="d5">{{data.yesterdaysPerformance==null?0:data.yesterdaysPerformance  | money}}</div>
        </van-col>
        <van-col span="8" @click="tixian">
          <div class="d4">今日业绩（元）</div>
          <div class="d5">{{data.todayPerformance==null?0:data.todayPerformance  | money}}</div>
        </van-col>
        <!--<van-col span="8">
          <div class="d6" @click="$router.push({path:'/my/wallet/extract',query:{useramount:txamount}})" >提现<van-icon name="arrow" size="16px"/></div>
        </van-col>-->
      </van-row>
    </div>
    <div class="m_bar">
      <div class="m_bar_left" @click="handle('date')">
        <span>{{date}}</span>
        <van-icon name="arrow-down"/>
      </div>
     <!-- <div class="m_bar_center">
        <span>总收入￥{{totalAmount | money}}</span>
      </div>
      <div class="m_bar_right">
        <span>本月收入￥{{monthAmount | money}}</span>
      </div>-->
    </div>
    <div class="m_list">
      <template v-if="list.length>0">
       <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad"
        >
            <van-row v-for="(item,index) in list"
                     class="qb_row"
                     :key="index">
              <van-col span="5" class="qb_left">
                <img src="./images/sale.png"/>
              </van-col>
              <van-col span="19">
                <van-col span="24" class="top">
                  <p class="createTime">{{item.createTime | formatDate}}</p>
                  <p class="amount">+{{item.amount }}</p>
                </van-col>
                <van-col span="24" class="bottom" v-if="index == indx && can" @click="detailHandle(-1)">
                  <p class="type">查看销售明细</p>
                  <van-icon name="arrow-up"  />
                </van-col>
                <van-col span="24" class="bottom" v-else @click="detailHandle(index)">
                  <p class="type">查看销售明细</p>
                  <van-icon name="arrow-down"  />
                </van-col>
              </van-col>
              <van-col span="24"  v-if="index == indx">
                <van-row class="detail">
                  <van-col span="5"></van-col>
                  <van-col span="10" class="name">品名：{{item.detail.name}}</van-col>
                  <van-col span="9">供货价：{{item.detail.costPrice}}</van-col>
                </van-row>
              </van-col>
            </van-row>
        </van-list>
      </template>
      <template v-else>
        <van-row class="empty" >
          <img src="./images/noimg.png"/>
          <p>暂无数据</p>
        </van-row>
      </template>
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
