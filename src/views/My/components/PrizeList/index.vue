<template>
  <div class="mili">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">奖金明细</div>
    </tops>
    <div class="m_bar">
      <div class="m_bar_left">
        <span>奖项</span>
      </div>
      <div class="m_bar_center">
        <span>奖金</span>
      </div>
      <div class="m_bar_right">
        <span>时间</span>
      </div>
    </div>
    <div class="m_list">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <template v-if="list.length>0">
          <van-row v-for="item in list"
                   class="qb_row"
                   :key="item">
            <van-col span="5" class="qb_left">
              <img src="./images/rmb.png"/>
            </van-col>
            <van-col span="13">
              <p class="username">{{item.prizeName}}</p>
              <p class="createTime">{{item.createTime | formatDate}}</p>
            </van-col>
            <van-col span="6" class="qb_right">
              <p class="amount">+{{item.prizeAmount}}</p>
            </van-col>
          </van-row>
        </template>
        <template v-else>
          <van-row class="empty">
            <img src="./images/noimg.png"/>
            <p>暂无数据</p>
            <div>
              <router-link to="/home">去购物吧</router-link>
            </div>
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
        <div class="miliList" v-else>
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
