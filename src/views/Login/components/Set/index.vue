<template>
  <div class="set">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">设置密码</div>
    </tops>
    <div class="content">
      <!-- 进度条 -->
      <div class="jdtS">
        <img src="../../image/two.png" alt/>
        <!--<span class="one">验证手机号</span>
        <span class="szmm">设置密码</span>
        <span class="szcg">注册成功</span>-->
      </div>
      <div class="formS">
        <div class="tel1" @click="pwdHandle">
          <input
            :style="{border:yzmicon!==require('../../image/pass1.png')?'1px solid #dee4e4':'1px solid #FF5555'}"
            v-model="fm.pwd"
            :type="password1"
            placeholder="请设置密码"
            maxlength="18"
            ref="passwordFocusStatus" style="font-size:15px;"
          />
          <!--@blur="yzmicon=require('../../image/pass.png');"
          @focus="yzmicon=require('../../image/pass1.png')"-->
          <img :src="yzmicon" alt/>
          <van-icon name="eye-o" size="22px" :class="seepwd?'active':''" @click="seepwdFun" v-if="seepwd"/>
          <van-icon name="closed-eye" size="22px" @click="seepwdFun" v-else/>
        </div>
        <div class="mima" @click="comfirmpwdHandle">
          <input
            :style="{border:yzmicon1!==require('../../image/pass1.png')?'1px solid #dee4e4':'1px solid #FF5555'}"
            v-model="fm.confirmpwd"
            :type="password2"
            placeholder="请确认密码"
            maxlength="18"
            ref="comfirmpasswordFocusStatus" style="font-size:15px;"
          />
          <!--@blur="yzmicon1=require('../../image/pass.png');"
          @focus="yzmicon1=require('../../image/pass1.png')"-->
          <img :src="yzmicon1" alt/>
          <van-icon name="eye-o" size="22px" :class="seecpwd?'active':''" @click="seecpwdFun" v-if="seecpwd"/>
          <van-icon name="closed-eye" size="22px" @click="seecpwdFun" v-else/>
        </div>
        <van-button
          @click="register">立即注册
        </van-button>
        <div class="tl">
          <!--
          <label>
            <van-checkbox v-model="checked" checked-color="#FF5555" shape="square" class="ckbox" icon-size="16px">
              <span>我已阅读并同意<router-link :to="{path: '/protocol', query: { fm: fm }}">《云上米仓商城服务协议》</router-link></span>
            </van-checkbox>
          </label>-->
        </div>
      </div>
      <Support2></Support2>
    </div>
  </div>
</template>
<script>
  import Support2 from "@/components/Support/index2";
  import eventBus from '@/common/js/evenbus';
  import Tops from "@/components/Top";

  var Base64 = require('js-base64').Base64;
  export default {
    data() {
      return {
        fm: {
          username: "",
          pwd: '',
          confirmpwd: '',
        },
        password1: 'password',
        password2: 'password',
        seepwd: false,
        seecpwd: false,
        telicon: require("../../image/user.png"),
        yzmicon: require("../../image/pass.png"),
        yzmicon1: require("../../image/pass.png"),
        checked: true,

      }
    },
    methods: {
      //箭头回退
      returns() {
        this.$router.go(-1)
      },
      telHandle(){
        this.telicon=require('../../image/user1.png');
        this.$refs.telFocusStatus.focus();
        this.yzmicon=require('../../image/pass.png');
        this.yzmicon1=require('../../image/pass.png');
      },
      pwdHandle(){
        this.telicon=require('../../image/user.png');
        this.$refs.passwordFocusStatus.focus();
        this.yzmicon=require('../../image/pass1.png');
        this.yzmicon1=require('../../image/pass.png');
      },
      comfirmpwdHandle(){
        this.telicon=require('../../image/user.png');
        this.$refs.comfirmpasswordFocusStatus.focus();
        this.yzmicon=require('../../image/pass.png');
        this.yzmicon1=require('../../image/pass1.png');
      },
      seepwdFun() {
        this.seepwd = !this.seepwd;
        if (this.seepwd) {
          this.password1 = 'text';
        } else {
          this.password1 = 'password';
        }
      },
      seecpwdFun() {
        this.seecpwd = !this.seecpwd;
        if (this.seecpwd) {
          this.password2 = 'text';
        } else {
          this.password2 = 'password';
        }
      },
      blurusername() {
        this.telicon = require('../../image/user.png');
        this.checkusername();
      },
      //立即注册
      register() {
        if (this.fm.username == "") {
          this.$toast("请输入手机号");
          return false;
        }
        if (this.fm.pwd == "") {
          this.$toast("请设置密码");
          return false;
        }
        if (this.fm.confirmpwd == "") {
          this.$toast("请确认密码");
          return false;
        }
        if (this.fm.pwd != this.fm.confirmpwd) {
          this.$toast('密码与确认密码不相同');
          return false;
        }
      //let reg = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{6,18}$');
       // let reg = new RegExp('^[a-zA-Z0-9_][a-zA-Z0-9_]{6,18}$');
        let reg =new RegExp('^(?=.*\\d)(?=.*[a-zA-Z]).{6,18}$');
        if (!reg.test(this.fm.pwd)) {
          this.$toast("密码必须至少6个字符，以字母开头，同时包含字母和数字。")
          return false;
        }

        if (!this.checked) {
          this.$toast('您尚未勾选同意云上米仓服务协议');
          return false;
        }

        let data = {
          'phone': sessionStorage.getItem('tel'),
          'sign': sessionStorage.getItem('sign'),
          'username': this.fm.username,
          'password': this.fm.pwd,
          'confirm': this.fm.confirmpwd,
          'enable': true,
          'nickname': sessionStorage.getItem('nickname'),
          'sex': sessionStorage.getItem('sex'),
          'avatar': sessionStorage.getItem('headimgurl'),
          'openid': sessionStorage.getItem('openid'),
          'code': sessionStorage.getItem('basecode') == undefined || sessionStorage.getItem('basecode') == null ? sessionStorage.getItem('code') : sessionStorage.getItem('basecode'),
          'birthday': '',
          'source': "kx6HIOFE5xtaK85g3JXfg3Nx0q6lZK3mGOxMzBGGCALOLUbvFPjowQ==" 
        }

        this.$http({
          method: 'post',
          url: this.$url.register,
          data: this.$qs.stringify(data),     //JSON.stringify()   JSON.parse()
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
        })
          .then(res => {
            if (res.status == 200) {
              if (res.data.returnCode == "ERR_0000") {
                localStorage.setItem('env', res.data.data);
                sessionStorage.removeItem('tel')
                sessionStorage.removeItem('sign')
                sessionStorage.removeItem('nickname')
                sessionStorage.removeItem('sex')
                sessionStorage.removeItem('headimgurl')
                sessionStorage.removeItem('openid')
                sessionStorage.removeItem('basecode')
                sessionStorage.removeItem('access_token')
                sessionStorage.removeItem('city')
                sessionStorage.removeItem('country')
                sessionStorage.removeItem('language')
                sessionStorage.removeItem('province')
                sessionStorage.removeItem('scope')
                this.$router.push({path: '/login/success', query: {username: this.fm.username, password: this.fm.pwd}});
              }
              if (res.data.returnCode == 'ERR_0017') {
                this.$toast('验证码已过期，请重新获取');
              }
              if (res.data.returnCode == 'ERR_0018') {
                this.$toast('验证码无效');
              }
            }
          }).catch(e => {

        })
      },
      //检测会员名是否合法，true合法，false不合法
      checkusername() {
        this.$http({
          method: 'post',
          url: this.$url.checkphone + '?username=' + this.username, //检测手机号或者用户名是否存在
          data: {}
        })
          .then(res => {
            //true可用，false不可用
            if (!res.data) {
              this.$toast('会员名已注册');
            }
          }).catch(e => {

        })
      }
    },
    components: {
      Support2, Tops
    },
    created() {
      let that = this;
      eventBus.$on("agree", (val) => {
        that.checked = val.agree;
        that.fm.username = val.fm.username;
        that.fm.pwd = val.fm.pwd;
        that.fm.confirmpwd = val.fm.confirmpwd;
      })
      this.fm.username = sessionStorage.getItem('tel');
    },
  };
</script>
<style lang="less" scope>
  @import './less/index';
</style>

