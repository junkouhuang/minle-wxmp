<template>
  <div class="commission">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">我的奖励</div>
    </tops>
    <div class="m_bar">
      <div class="m_bar_left" @click="handle('rq')">
        <span>日期</span>
        <van-icon name="arrow-down"/>
      </div>
      <div class="m_bar_center" @click="handle('lx')">
        <span>类型</span>
        <van-icon name="arrow-down"/>
      </div>
      <div class="m_bar_right" @click="handle('zt')">
        <span>结算状态</span>
        <van-icon name="arrow-down"/>
      </div>
    </div>
    <div class="m_list">
      <template v-if="list.length>0">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad">
          <van-row v-for="(item,index) in list"
                   class="qb_row"
                   :key="index">
            <van-col span="5" class="qb_left">
              <!--购物-->
              <img src="./images/gw.png" v-if="item.type == 1"/>
              <!--服务-->
              <img src="./images/fu.png" v-if="item.type == 2"/>
              <!--分享-->
              <img src="./images/xiang.png" v-if="item.type == 3"/>
              <!--推广-->
              <img src="./images/tg.png" v-if="item.type == 4"/>
              <!--购物分享奖-->
              <!--<img src="./images/fan.png" v-if="item.type == 5"/>-->
            </van-col>
            <van-col span="13">
              <p class="username">{{item.type == 1?'购物奖励':item.type ==2?'服务奖励':item.type==3?'分享奖励':item.type==4?'推广奖励':item.type==5?'购物分享':item.type==6?'VIP奖励':item.type==7?'米铺奖励':''}}
                <span v-if="item.type == 1 && item.settleMode == 0" class="specification">当日结算</span>
                <span v-if="item.type == 2 && item.settleMode == 1" class="specification">分期结算</span>
                <span v-if="item.type == 3 && item.settleMode == 0" class="specification">当日结算</span>
                <span v-if="item.type == 4 && item.settleMode == 0" class="specification">当日结算</span>
                <span v-if="item.type == 5 && item.settleMode == 1" class="specification">分期结算</span>
              </p>
              <p class="createTime">{{item.createTime | formatDate}}</p>
            </van-col>
            <van-col span="6" class="qb_right">
              <p class="amount">+{{item.amount}}</p>
              <span v-if="item.status==0 && item.freezeStatus==1" class="tx" @click="withdraw(item.orderNo,item.type == 1?1:item.type == 2?2:item.type == 3?3:item.type == 4?4:item.type == 5?5:'',item.id)">提现</span>
              <span v-if="item.status==0 && item.freezeStatus==0" class="finsh">冻结</span>
              <span v-if="item.status==1" class="finsh">已结算</span>
            </van-col>
          </van-row>
      </van-list>
      </template>
      <template v-else>
        <van-row class="empty" >
          <img src="./images/noimg.png"/>
          <p>奖励暂无数据</p>
          <!--<div><router-link to="/home">去购物吧</router-link></div>-->
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
        <div class="miliList" v-if="showLx">
          <p>请选择类型</p>
          <hr/>
          <div class="m_content">
            <van-row>
              <van-col span="8" v-for="(item,index) in styleList" :key="index" class="col_m">
                <div :class="active1 == index?'m_active':''" @click="choose(index)">{{item}}</div>
              </van-col>
            </van-row>
          </div>
        </div>
        <div class="miliList" v-if="showZt">
          <p>请选择奖励状态</p>
          <hr/>
          <div class="m_content">
            <van-row>
              <van-col span="8" v-for="(item,index) in ztList" :key="index" class="col_m">
                <div :class="active2 == index?'m_active':''" @click="zt(index)">{{item}}</div>
              </van-col>
            </van-row>
          </div>
        </div>
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
