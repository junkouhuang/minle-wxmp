<template>
  <div class="withdraw">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">提现</div>
    </tops>
    <div class="sub">

      <span class="title" v-if="type==5">累计可提现金额</span>
      <span class="title" v-else>提现金额</span>
      <span class="num" v-if="type==1">您享有<i class="i1">{{freeOrders}}</i>次派送免单特权,</span>
      <span class="num" v-if="type==1">您已经派送免单<i class="i1">{{totalCount}}</i>次,</span>
      <span class="num" v-if="type==1">还可派送免单<i class="i1">{{freeOrders-totalCount}}</i>次,</span>
      <span class="num" v-if="type==1">每日限制提现<i class="i1">{{limit}}</i>次,今日您已提现<i class="i2">{{count}}</i>次。</span>
      <span class="num" v-if="type==2">服务奖励分四期仅限每月月底进行提现,你的服务奖励<i class="i1">{{totalAmount}}</i>元,已提现<i class="i1">{{amountWithdraw}}</i>元,还可提现<i class="i2">{{totalAmount-amountWithdraw}}</i>元。</span>
      <span class="num" v-if="type==5" style="color: #FF5555;">购物分享奖分为12个月提现，每月15日前可提现一次，当月15日之后的提现金额将自动放入下月15日前累加提现。</span>
    </div>

    <div class="amount" @click="clickHandle" ><span :class="{'active':show}">{{amount}}元</span></div>
    <van-button @click="next">提现</van-button>
  </div>
</template>

<script>
  export {default} from './js/index'
</script>

<style lang="less" scope>
  @import './less/index';
</style>
