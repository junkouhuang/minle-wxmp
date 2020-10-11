<template>
  <div class="loginhelp">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">注册帮助</div>
    </tops>
    <div class="content">
      <div class="q1">
        <em class="q">Q：</em>
        <span>密码格式?</span>
      </div>
      <div class="q2">
        <em class="a">A：</em>
        <span>密码由6~18位的数字加字母组成。</span>
      </div>
      <hr/>
      <div class="q1">
        <em class="q">Q：</em>
        <span>提示参数错误？</span>
      </div>
      <div class="q2">
        <em class="a">A：</em>
        <span>通过推荐码进入注册界面，报参数错误请返 回公众号首页联系”人工客服“。</span>
      </div>
      <hr/>
      <div class="q1">
        <em class="q">Q：</em>
        <span>收不到验证码？</span>
      </div>
      <div class="q2">
        <em class="a">A：</em>
        <span>不能实时收到手机验证码可能是由于信号或 短信供应商等问题引起有所延迟，且通常短信验证码会实时发送到您手机。</span>
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
