<template>
  <div class="content">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">找回密码</div>
    </tops>
    <div class="next">
      <van-cell-group>
        <van-field
          label-class="abc"
          v-model="tel"
          rows="1"
          autosize
          label="手机号码"
          type="number"
          placeholder="请输入手机号码"
        />
      </van-cell-group>
      <div class="btnsq">
        <van-cell-group>
          <van-field v-model.trim="sms" center clearable label="验证码" :maxlength="6" placeholder="请输入验证码">
            <van-button
              slot="button"
              size="small"
              round
              plain
              :type="dx==false?'info':'default'"
              @click="yzms"
            >{{yzm}}{{dx?'s后重新获取':''}}</van-button>
          </van-field>
        </van-cell-group>
        <!-- <button class="btn">发送验证码</button> -->
      </div>
      <div class="btnsq">
        <van-cell-group>
          <van-field
            v-model="newpass"
            center
            clearable
            label="新的密码"
            type="password"
            :maxlength="20"
            :minlength="6"
            placeholder="请输入6-20位,包含字母和数字"
          >
            <!-- <van-button slot="button" size="small" round plain type="info">发送验证码</van-button> -->
          </van-field>
        </van-cell-group>
        <!-- <button class="btn">发送验证码</button> -->
      </div>
      <div class="login">
        <!-- <button>登录</button> -->
        <van-button  class="btn" type="info" @click="login">登录</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { request } from "@/api/request";
import Tops from "@/components/Top";
export default {
  data() {
    return {
      disabled1: true,
      yzm: "获取验证码",
      sms: "",
      newpass: "",
      tel: "",
      dx: false
    };
  },
  watch:{
    tel(e){
      if(e.length>11){
        this.tel=e.slice(0,11)
      }
    }
  },
  methods: {
    //箭头回退
    returns(){
      this.$router.go(-1);
    },
    login() {

      if ( this.newpass == null || this.newpass.length < 6||this.newpass.length>20) {
        return  this.$toast('密码长度应为6-20');
      }
      var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
      if (!reg.test(this.newpass)) return this.$toast('错误');
      request(
        "post",
        this.$url.modify,
        { passWord: this.newpass, smsCode: this.sms, userName: this.tel },
        res => {
          if (res.data.meta.code == 200) {
            this.$toast("密码修改成功");
            setTimeout(() => {
              this.$router.push("/home");
              this.tel='';
              this.newpass='';
              this.sms=''
            }, 2000);
          }else{
                this.$toast(res.data.meta.message);
          }
        }
      );
    },
    yzms() {
      if (this.tel === "") return false;

      if (this.yzm === "获取验证码") {
        request("get", this.$url.yzm, { phone: this.tel, type: 2 }, res => {
          if (res.data.meta.code == "200") {
            this.$toast("验证码发送成功");
            this.dx = true;
            this.yzm = 90;
            let a = setInterval(() => {
              --this.yzm;
              if (this.yzm <= 0) {
                this.yzm = "获取验证码";
                this.dx = false;
                clearInterval(a);
              }
            }, 1000);
          } else {
            this.$toast(res.data.meta.message);
          }
        });
      } else {
        return;
      }
    }
  },
  components: {
    Tops
  }
};
</script>
<style lang="less" scoped>
.content {
  background: #f4f4f5;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 1.1736rem;
  right: 0;
  right: 0;
  .next {
    margin-top: 0.32rem;
    .btnsq {
      position: relative;
    }
  }
}
.abc {
  font-size: 0.426667rem;
}
.login {
  margin-top: 0.746667rem;
  padding: 0 1.0667rem;
  .btn {
    background: linear-gradient(270deg, #4373ea, #439dea);
    color: #fff;
    width: 100%;
    border-width: 0;
    border-radius: 1.06667rem;
    font-size: 0.48rem;
    outline: 0;
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 0.373333rem;
    padding-right: 0.373333rem;
    box-sizing: border-box;
    font-size: 0.48rem;
    text-align: center;
    text-decoration: none;
    color: #fff;
    line-height: 2.33333333;
    // border-radius: .133333rem;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-shadow: 0 0.106667rem 0.16rem 0 rgba(67, 115, 234, 0.3);
    overflow: hidden;
    -webkit-appearance: none;
  }
}
</style>
