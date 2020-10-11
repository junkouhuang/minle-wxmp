<template>
  <div class="migang">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">米米缸</div>
    </tops>
    <div class="mg_img">
      <div class="zsy">
        <span>总福利（元）</span>
        <img src=""/>
      </div>
      <p class="amount">{{data.sum.toFixed(2) | money}}</p>
      <div class="sy">
        <div class="left">
          <p>昨日福利（元）</p>
          <p>{{data.dailyEarnings.toFixed(2) | money}}</p>
        </div>
        <div class="right">
          <p>已倒缸（元）</p>
          <p>{{data.alreadyWithdrawal!=null?data.alreadyWithdrawal.toFixed(2):0 | money}}</p>
        </div>
      </div>
    </div>
    <div class="usable">
      <p>可用福利（元）<span>{{data.withdraw | money}}</span></p>
      
      <div class="withdraw">
        <div class="tx " :class="{'active':data.canWithdraw}" @click="withdraw(data.canWithdraw)" >倒缸</div>
        <span class="txt">每月最后一日提现</span>
      </div>
      <!--      
      <div class="withdraw">
        <div class="tx " :class="{'active':true}" @click="withdraw(true)" >倒缸</div>
        <span class="txt">倒缸最快当日到账</span>
      </div>-->
    </div>
    <div class="style " :class="navBarFixed == true ? 'navBarWrap' :''" >
      <div class="type" @click="handle('type')">
        <span>全部</span>
        <van-icon name="arrow-down"/>
      </div>
      <div class="date" @click="handle('date')">
        <span>日期</span>
        <van-icon name="arrow-down"/>
      </div>
    </div>
    <div class="content_">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <template v-if="list.length>0">
          <van-row v-for="item in list"
                   class="list1"
                   :key="index">
            <van-col span="24" class="qb_left">
              <div class="top">
                <div>{{item.type==0?'奖励福利':item.type==1?'每日福利':item.type==2?'倒缸':''}}
                  <!--
                  <span class="tag" v-if="item.source == 1">{{item.source == 1?'药都荟':''}}</span>
                  <span class="tag" v-if="item.source == 2">{{item.source == 2?'米满仓':''}}</span>
                  <span class="tag" v-if="item.source == 3">{{item.source == 3?'鑫红地摊车':''}}</span>
                  <span class="tag" v-if="item.source == 3">{{item.source == 4?'鑫红店':''}}</span>
                  <span class="tag" v-if="item.source == 3">{{item.source == 5?'智能终端':''}}</span>
                  -->
                </div>
                <span>{{item.type!=2?'+'+(item.amount   )  :item.amount   }}</span>
              </div>
              <div class="bottom">
                <span>{{item.createTime | formatDate(item.type)}}</span>
                <span>{{item.principal}}</span>
              </div>
            </van-col>
          </van-row>
        </template>
      </van-list>
    </div>
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
</template>

<script>
  export {default} from './js/index'
</script>

<style lang="less" scope>
  @import './less/index';
</style>
