<template>
  <div class="loginhelp">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">提现帮助</div>
    </tops>
    <div class="content">
      <div class="q1">
        <em class="q">Q：</em>
        <span>如何提现？</span>
      </div>
      <div class="q2">
        <em class="a">A：</em>
        <span>打开微信公众号点击会员中心>我的钱包>选择提现金额>点击提现按钮后>显示提现成功>返回公众号首页输入“人工客服”>按照人工客服提示，提供相关资料，以便核查>等待到账。</span>
      </div>
      <hr/>
      <div class="q1">
        <em class="q">Q：</em>
        <span>到账时间？</span>
      </div>
      <div class="q2">
        <em class="a">A：</em>
        <span>提现到账时间为1~3个工作日，最快当天到账。</span>
      </div>
      <hr/>
    </div>
  </div>
</template>

<script>
  export {default} from './js/index'
</script>
<style lang="less" scope>
  @import './less/index';
</style>
