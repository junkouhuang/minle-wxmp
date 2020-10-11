<template>
  <div class="extractsuccess">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">确认提现</div>
    </tops>
    <div class="ts_content">
      <div class="p2">￥{{amount}}<span>手续费{{serviceFee}}元</span></div>
      <div class="wx"  @click="withdrawWx">微信提现</div>
      <p class="go">请前往“钱包”查看提现账单记录</p>
      <div class="d0">
        <span class="s1">提现方式</span>
        <span class="s2">微信提现</span>
      </div>
      <div class="d1">
        <span class="s1">提现手续费</span>
        <div class="s2 free">
          <p>按提现金额收取8%手续费</p><p  class="showTig">手续费已包含交易服务税费</p>
        </div>
      </div>
      <div class="dztime">
        <p class="p1">提现说明</p>
        <p class="p3">支持微信零钱提现，实时到账。如未收到帐款，请在公众号联系客 服办理提现业务。</p>
      </div>
    </div>
  </div>
</template>

<script>
  export {default} from './js/index'
</script>
<style lang="less" scope>
  @import './less/index';
</style>
