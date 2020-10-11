<template>
  <div class="qb">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">钱包</div>
    </tops>
    <div class="qb_imgx">
      <div class="d1">总金额(元)</div>
      <div class="d2">{{totalAmount | money}}</div>
      <van-row class="d3">
        <van-col span="12">
          <div class="d4">冻结（元）</div>
          <div class="d5">{{futureEarnings | money}}</div>
        </van-col>
        <van-col span="12" @click="tixian">
          <div class="d4">可提现（元）</div>
          <div class="d5">{{withdraw | money}}</div>
        </van-col>
        <!--<van-col span="8">
          <div class="d6" @click="$router.push({path:'/my/wallet/extract',query:{useramount:txamount}})" >提现<van-icon name="arrow" size="16px"/></div>
        </van-col>-->
      </van-row>
    </div>
    <div class="qb_nav" @click="$router.push('/my/wallet/list')">
      <span>钱包账单</span>
      <van-icon name="arrow" size="18px"/>
    </div>
    <div class="qb_nav" @click="$router.push('/my/wallet/record')">
      <span>我的提现</span>
      <van-icon name="arrow" size="18px"/>
    </div>
  </div>
</template>

<script>
  export {default} from './js/index'
</script>

<style lang="less" scope>
  @import './less/index';
</style>
