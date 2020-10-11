<template>
  <div class="mili">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">米粒明细</div>
    </tops>
    <div class="m_bar">
      <div class="m_bar_left" @click="handle('date')">
        <span>{{dateTime}}</span>
        <van-icon name="arrow-down"/>
      </div>
      <div class="m_bar_right" @click="handle('mili')">
        <span>{{typeName}}</span>
        <van-icon name="arrow-down"/>
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
          <van-col span="4" class="qb_left">
            <!--赠送米粒-->
            <img src="./images/t053x.png" v-if="item.type == 0"/>
            <!--消费米粒-->
            <img src="./images/t043x.png" v-if="item.type == 1"/>
            <!--返还米粒-->
            <img src="./images/t033x.png" v-if="item.type == 2"/>
            <!--返还米粒-->
            <img src="./images/t05.png" v-if="item.type == 3"/>
          </van-col>
          <van-col span="14">
            <p class="username">{{item.type == 0?'赠送米粒':item.type == 1?'支出米粒':item.type == 2?'返还米粒':item.type == 3?'充值米粒':''}}</p>
            <p class="createTime">{{item.createTime | formatDate}}</p>
          </van-col>  
          <van-col span="6" class="qb_right">
            <p class="amount" :class="item.type == 1?'hs':''">{{(item.type == 0 || item.type == 2 || item.type == 3)?`+` +item.quantity: item.quantity}}</p>
          </van-col>
        </van-row>
        </template>
        <template v-else>
          <van-row class="empty" >
            <img src="./images/ml.png"/>
            <p>巧妇难为无米之炊</p>
            <div><router-link to="/home">快去购物吧</router-link></div>
          </van-row>
        </template>
      </van-list>
      <van-popup
        v-model="showPopup"
        position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          :min-date="minDate"
          :formatter="formatter"
          @confirm="getTime"
          @cancel="cancel"
          v-if="showDate"
        />
        <div class="miliList" v-else>
          <p>请选择类型</p>
          <hr/>
          <div class="m_content">
            <van-row>
              <van-col span="8" v-for="(item,index) in styleList" :key="index" class="col_m">
                <div :class="active1 == index?'m_active':''" @click="choose(index,item)">{{item}}</div>
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
