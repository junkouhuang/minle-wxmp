<template>
  <div class="verification">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">手机验证</div>
    </tops>
    <div class="content">
      <!-- 进度条 -->
      <div class="jdtV">
        <img src="../../image/one.png" alt/>
        <!--<span class="one">验证手机号</span>
        <span class="szmm">设置密码</span>
        <span class="szcg">注册成功</span>-->
      </div>
      <div class="formV">
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
          <!--@blur="telicon=require('../../image/phone.png');"
          @focus="telicon=require('../../image/phone1.png')"-->
          <i>
            <img :src="telicon" />
          </i>
        </div>
        <div class="verificationcode" @click="codeHandle">
          <input
            type="number"
            :style="{border:yzmicon!==require('../../image/yzm1.png')?'1px solid #dee4e4':'1px solid #FF5555'}"
            v-model="code"
            placeholder="输入验证码"
            ref="codeFocusStatus"
            maxlength="6" style="font-size: 15px;"
          />
          <!--@blur="yzmicon=require('../../image/yzm.png');"
          @focus="yzmicon=require('../../image/yzm1.png')"-->
          <i>
            <img :src="yzmicon" alt/>
          </i>
          <span :class="gray?'tele':'tels'" class="vericode" @click="gray?checkphone():''">{{msg}}</span>
        </div>
        <van-button @click="verify">验证</van-button>
        <!--<a class="dl" @click="tologin">去登录</a>-->
      </div>
    </div>
    <Support2></Support2>
  </div>
</template>
<script>
  import Support2 from "@/components/Support/index2";
  import Tops from "@/components/Top";

  export default {
    data() {
      return {
        tel: "",
        code: "",
        telicon: require("../../image/phone.png"),
        yzmicon: require("../../image/yzm.png"),
        gray: false,
        msg: '获取验证码',
        secodes: 90, //1.5分钟
        clearInterval: ''
      };
    },
    methods: {
      //箭头回退
      returns() {
        this.$router.go(-1)
      },
      //去登录
      tologin(){
        this.$router.push('/login')
      },
      phoneHandle(){
        this.telicon=require('../../image/phone1.png');
        this.$refs.phoneFocusStatus.focus();
        this.yzmicon=require('../../image/yzm.png');
      },
      codeHandle(){
        this.telicon=require('../../image/phone.png');
        this.$refs.codeFocusStatus.focus();
        this.yzmicon=require('../../image/yzm1.png');
      },
      //手机存在与否
      keydownphone() {
        if (this.tel.length > 10) {
          if (!(/^1[3456789]\d{9}$/.test(this.tel))) {
            this.$toast('请输入正确的手机号')
          }else{
            this.gray = true;
          }
        } else {
          this.gray = false;
        }

      },
      //手机文本输入框失焦
      blurphone() {
        this.telicon = require('../../image/phone.png');
      },
      //获取手机短信验证码
      getvericode() {
        this.$http({
          method: 'post',
          url: this.$url.getcode + '?phone=' + this.tel + '&type=0',
          data: {}
        })
          .then(res => {
            if (res.status == 200) {
              if (res.data.returnCode == 'ERR_0000') {
                this.$toast('验证码已发送');
                this.clearInterval = setInterval(() => {
                  if (this.secodes == 0) {
                    this.msg = '获取验证码'
                    this.gray = true;
                    this.secodes = 90;
                    clearInterval(this.secodes)
                  } else {
                    this.msg = this.secodes-- + 's 重新获取'
                    this.gray = false;
                  }
                }, 1000)
              } else if (res.data.returnCode == 'ERR_0016') { //不能重复获取
                this.$toast('验证码已发送，请勿重复获取');
              } else if (res.data.returnCode == 'ERR_0019') {
                this.$toast('获取验证码太频繁，请稍后再试');
              }
            }
          }).catch(e => {

        })
      },
      //验证
      verify() {
        if(this.tel == ''){
          this.$toast('请输入手机号');
          return false;
        }
        if(this.code == '')
        {
          this.$toast('请输入短信验证码');
          return false;
        }
        if (!(/^1[3456789]\d{9}$/.test(this.tel))) {
          this.$toast("请输入正确的手机号码");
          return false;
        }
        this.$http({
          method: 'post',
          url: this.$url.verify + '?phone=' + this.tel + '&code=' + this.code,  
          data: {}
        })
          .then(res => {
            if (res.status == 200) {
              if (res.data.returnCode == "ERR_0000") {
                sessionStorage.setItem('sign', res.data.data) //缓存短信签名
                sessionStorage.setItem('tel', this.tel) //缓存手机号码
                this.$router.push('/login/set')
              }
              if (res.data.returnCode == 'ERR_0017') {
                this.$toast('验证码已过期，请重新获取');
              }
              if (res.data.returnCode == 'ERR_0018') {
                this.$toast('验证码错误');
              }
            }
          }).catch(e => {

        })
      },
      //检测手机号码是否合法，true合法，false不合法
      checkphone() {
        this.$http({
          method: 'post',
          url: this.$url.checkphone + '?username=' + this.tel,
          data: {}
        })
          .then(res => {
            this.gray = res.data
            if(this.gray){
              this.getvericode();
            }else{
              this.msg = '获取验证码'
              this.gray = true;
              this.secodes = 900;
              clearInterval(this.clearInterval)
              this.$toast("该手机号已注册");
            }
          }).catch(e => {

        })
      },
      //获取微信用户信息
      getUserInfo() {
        let access_token = sessionStorage.getItem('access_token');
        let openid = sessionStorage.getItem('openid');

        this.$http({
          method: 'get',
          url: this.$url.wxuserinfo + "?token=" + access_token + "&openid=" + openid,
          data: {

          }
        })
          .then(res => {
            if (res.status == 200) {
              sessionStorage.setItem('country', JSON.parse(res.data.data).country)
              sessionStorage.setItem('province', JSON.parse(res.data.data).province)
              sessionStorage.setItem('city', JSON.parse(res.data.data).city)
              sessionStorage.setItem('openid', JSON.parse(res.data.data).openid)
              sessionStorage.setItem('sex', JSON.parse(res.data.data).sex)
              sessionStorage.setItem('nickname', JSON.parse(res.data.data).nickname)
              sessionStorage.setItem('headimgurl', JSON.parse(res.data.data).headimgurl)
              sessionStorage.setItem('language', JSON.parse(res.data.data).language)

            }
          }).catch(e => {

        })
      }
    },
    components: {
      Support2, Tops
    },
    mounted() {
      this.getUserInfo();
    },

  };
</script>
<style lang="less" scope>
  @import './less/index';
</style>
