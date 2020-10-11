<template>
  <div class="mili">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">钱包</div>
    </tops>
    <div class="m_barw"  :class="navBarFixed == true ? 'navBarWrap' :''" >
      <div class="m_bar_left" @click="handle('rq')">
        <span>日期</span>
        <van-icon name="arrow-down"/>
      </div>
      <div class="m_bar_center" @click="handle('lx')">
        <span>类型</span>
        <van-icon name="arrow-down"/>
      </div>
      <div class="m_bar_right" @click="handle('zt')">
        <span>交易状态</span>
        <van-icon name="arrow-down"/>
      </div>
    </div>
    <div class="m_listw">
      <van-list
        v-model="loading"
        :finished="upFinished"
        :immediate-check="false"
        finished-text=""
        @load="onLoad"
      >
        <template v-if="list.length>0">
          <van-row v-for="(item,index) in list"
                   class="qb_roww"
                   :key="index">            
            <van-col span="14">
              <p class="username">{{item.type == 0?'分享福利':item.type == 1?'钱包提现':item.type == 2?'购物奖励':item.type == 3?'钱包支付':item.type == 4?'钱包退款':item.type == 6?'米铺奖励': item.type == 7? '推广奖励': ""}}</p>
              <p class="createTime">{{item.createTime | formatDate}}</p>
            </van-col>
            <van-col span="10" class="qb_right">
            <p class="amount">{{item.type == 0 || item.type == 2 || item.type == 4 || item.type == 6 ?`+` +(item.amount ):  (item.amount  )}}</p>
            <p v-if="item.type == 0 && item.status == 0" class="dj">冻结(不可提现)</p>
          </van-col>
        </van-row>
        </template>
        <template v-else>
          <van-row class="empty" >
            <img src="./images/qb.png"/>
            <p>钱包暂无数据</p>
            <div><router-link to="/home">快去购物吧</router-link></div>
          </van-row>
        </template>
      </van-list>
      <van-popup
        v-model="showPopup"
        position="bottom"
        class="wpop"
      >
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          :min-date="minDate"
          :formatter="formatter"
          @confirm="getTime"
          @cancel="cancel"
          v-if="showData"
        />
        <div class="miliList" v-if="showLx">
          <p>{{tip}}</p>
          <hr/>
          <div class="m_content">
            <van-row>
              <van-col span="8" v-for="(item,index) in lxList" :key="index" class="col_m">
                <div :class="active1 == index?'m_active':''" @click="choose(index)">{{item}}</div>
              </van-col>
            </van-row>
          </div>
        </div>
        <div class="miliList" v-if="showZt">
          <p>{{tip}}</p>
          <hr/>
          <div class="m_content">
            <van-row>
              <van-col span="8" v-for="(item,index) in ztList" :key="index" class="col_m">
                <div :class="active2 == index?'m_active':''" @click="choose(index)">{{item}}</div>
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
