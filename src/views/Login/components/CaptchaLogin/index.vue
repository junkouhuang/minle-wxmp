<template>
  <div class="verificationCp">
    <div class="contentCp">
      <!--
      <div class="logo">
        <img src="./images/logo3x.png" alt="">
      </div>-->
      <div class="formCp">
        <p class="tips1">通过验证码登录</p>
        <div class="tel2" @click="phoneHandle">
          <input
            type="number"
            :style="{border:telicon!==require('../../image/phone1.png')?'1px solid #dee4e4':'1px solid #FF5555  '}"
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
            :style="{border:yzmicon!==require('../../image/yzm1.png')?'1px solid #dee4e4':'1px solid #FF5555  '}"
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

        <div class="remember">
          <span>
            <router-link to="/login" class="capt">密码登录</router-link>
          </span>
          <!--
          <router-link to="/login/pwd/verificationphone" class="findbackpwd">找回密码</router-link>-->
        </div>

        <van-button @click="next" >登录</van-button>
        
        <a class="zc" @click="toregister">新用户注册</a>
      </div>
    </div>
    <Support></Support>
  </div>
</template>
<script>
  export {default} from './js/index'
</script>
<style lang="less" scope>
  @import './less/index';
</style>
