<template>
  <div class="extractsuccess">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">提现成功</div>
    </tops>
    <div class="ts_content">
      <div class="ts_img">
        <img src="./images/ts.png">
      </div>
      <p class="p1">提现申请成功</p>
      <p class="p2">￥{{amount}}</p>
      <p class="go">请前往" 钱包 - 提现账单 "查看提现明细</p>
      <div class="d0">
        <span class="s1">提现方式</span>
        <span class="s2">微信提现</span>
      </div>
      <div class="d1">
        <span class="s1">提现手续费</span>
        <div class="s2 free" >
          <p>按提现金额收取8%手续费</p><p  class="showTig">手续费已包含交易服务税费</p>
        </div>
      </div>
      <div class="d2">
        提现状态
      </div>
      <div class="ts_status">
        <div class="left">
          <img src="./images/L01.png"/>
        </div>
        <div class="right">
          <div class="top">
            <p>提交申请成功</p>
          </div>
          <div class="bottom">
            <p>待平台审核（预计最快当天到账）</p>
          </div>
        </div>
      </div>
      <div class="dztime">
        <p class="p1">提现说明</p>
        <p class="p3">正常提现到账时间为1~3个工作日，最快当天到帐。</p>
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
