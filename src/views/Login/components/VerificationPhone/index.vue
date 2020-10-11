<template>
  <div class="verification">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">手机验证</div>
    </tops>
    <div class="content">
      <div class="form">
        <p class="tips1">请填写您要找回密码的账号</p>
        <div class="tel2" @click="phoneHandle">
          <input
            type="number"
            :style="{border:telicon!==require('../../image/phone1.png')?'1px solid #dee4e4':'1px solid #FF5555'}"
            v-model="tel"
            placeholder="输入手机号"
            maxlength="11"
            ref="phoneFocusStatus"
            @keyup="keydownphone" style="font-size:15px;"
          />
          <i>
            <img :src="telicon" />
          </i>
          <div>
            <span :class="gray?'tele':'tels'"  @click="gray?checkphone():''">{{msg}}</span>
          </div>
        </div>
        <div class="verificationcode" @click="codeHandle">
          <input
            type="number"
            :style="{border:yzmicon!==require('../../image/yzm1.png')?'1px solid #dee4e4':'1px solid #FF5555'}"
            v-model="code"
            placeholder="输入短信验证码"
            maxlength="6"
            ref="codeFocusStatus"
            :autofocus="autofocus" style="font-size:15px;"
          />
          <i>
            <img :src="yzmicon" alt/>
          </i>
        </div>
        <van-button @click="next" >下一步</van-button>
      </div>
    </div>
    <!--<Support></Support>-->
  </div>
</template>
<script>
  export {default} from './js/index'
</script>
<style lang="less" scope>
  @import './less/index';
</style>
