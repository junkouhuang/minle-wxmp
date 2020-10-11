<template>
  <div class="login">
    <div class="content" >
      <!--
      <div class="logo">
        <img src="./image/logo3x.png" alt="">
      </div>-->
      <div class="form">
        <p class="tips1">通过密码登录</p>
        <div class="tel" @click="usernameHandle">
          <input
            type="text"
            :style="{border:telicon!==require('./image/user1.png')?'1px solid #dee4e4':'1px solid #FF5555'}"
            v-model.trim="tel"
            placeholder="请输入手机号"
            maxlength="11"
            ref="userFocusStatus" style="font-size:15px;"
          />
          <img :src="telicon" alt/>
        </div>
        <div class="pwd" @click="passwordHandle">
          <input
            :type="password1"
            :style="{border:yzmicon!==require('./image/pass1.png')?'1px solid #dee4e4':'1px solid  #FF5555'}"
            v-model.trim="pwd"
            placeholder="请输入密码"
            maxlength="18"
            ref="passFocusStatus" style="font-size:15px;" 
          />
          <img :src="yzmicon" class="img3"/>
          <div @click="seepwdFun" class="eyes1" v-if="seepwd == true"><img src="./image/e02.png"></div>
          <div @click="seepwdFun" class="eyes" v-if="seepwd == false"><img src="./image/e01.png"></div>
        </div>

        <div class="remember">
          <span>
            <router-link to="/login/captcha" class="capt">验证码登录</router-link>
          </span>
          <router-link to="/login/pwd/verificationphone" class="findbackpwd">找回密码</router-link>
        </div>

        <!--
        <div class="remember" @click="isrememberFun" v-if="isremember">
          <van-icon name="passed" color="#FF5555" size="20px"/>
          <span>自动登录</span>
          <router-link to="/login/pwd/verificationphone" class="findbackpwd">找回密码</router-link>
        </div>

        <div class="remember" @click="isrememberFun" v-else>
          <van-icon name="circle" size="20px" color="#c2c2c2"/>
          <span>自动登录</span>
          <router-link to="/login/pwd/verificationphone" class="findbackpwd">找回密码</router-link>
        </div>
        -->

        <van-button @click="tologin">登录</van-button>
        <a class="zc" @click="toregister">新用户注册</a>
      </div>
    </div>
    <Support></Support>
  </div>
</template>
<script>
  export {default} from './js/login'
</script>
<style lang="less" scope>
  @import './less/login';
</style>
