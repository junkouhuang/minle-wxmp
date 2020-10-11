<template>
    <div class="loginhelp">
      <tops>
        <div slot='left' class="arrow" @click="returns"></div>
        <div slot='center' class="title">登录帮助</div>
      </tops>
      <div class="content">
        <div class="q1">
          <em class="q">Q：</em>
          <span>我的帐户的登录密码忘记了怎么办?</span>
        </div>
        <div class="q2">
          <em class="a">A：</em>
          <span>您可以点击<router-link to="/login/pwd/verificationphone">忘记密码</router-link>，验证手机号码后即可重新设置新的登录密码；</span>
        </div>
        <hr/>
        <div class="q1">
          <em class="q">Q：</em>
          <span>帐号或密码输入多次错误?</span>
        </div>
        <div class="q2">
          <em class="a">A：</em>
          <span>密码8小时内连续输入5次错误，帐号将会被锁定，请8个小时之后再试，或者在公众号上输入”人工客服“联系客服。</span>
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
