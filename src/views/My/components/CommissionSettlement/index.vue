<template>
  <div class="CommissionSettlement">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">分享福利</div>
    </tops>
    <div class="qb_img">
      <div class="d1">总福利(元)</div>
      <div class="d2">{{data.sum}}<!--<van-icon name="eye-o" size="16px"/>--></div>
      <van-row class="d3">
        <van-col span="12">
          <div class="d4">已结算（元）</div>
          <div class="d5">{{data.alreadyWithdrawal}}</div>
        </van-col>
        <van-col span="12" @click="tixian">
          <div class="d4">待结算（元）</div>
          <div class="d5">{{data.withdraw}}</div>
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
                <img src="./images/q.png"/>
              </van-col>
              <van-col span="10">
                <p class="type">福利</p>
                <p class="createTime">{{item.createTime==null || item.createTime==undefined?'': item.createTime | formatDate}}</p>
              </van-col>
              <van-col span="9" class="qb_right">
                <p class="amount">{{item.type==1?item.commissionAmount.toFixed(2)  :("+"+item.commissionAmount.toFixed(2)) }}</p>
                <p class="serviceFee" v-if="item.type==1">已结算</p>
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
