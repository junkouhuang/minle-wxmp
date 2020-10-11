<template>
    <div class="Verification">
      <tops>
        <div slot='left' class="arrow" @click="returns"></div>
        <div slot='center' class="title">修改手机号码</div>
      </tops>
      <van-field v-model="old" label="当前手机号码" class="old" input-align="right" disabled/>
      <van-field v-model="telphone" label="手机号码" class="telphone"  placeholder="请输入手机号码"/>
      <van-field v-model="code" label="验证码" class="code"  placeholder="请输入验证码">
        <template #button>
          <span class="getcode" @click="getvericode">{{msg}}</span>
        </template>
      </van-field>
      <button @click="next" class="btn" >确认设置</button>
    </div>
</template>

<script>
  import Tops from "@/components/Top";
    export default {
        name: "index",
        data() {
        return {
         old:'',
         telphone:'',
          code:'',
          msg: '获取验证码',
          secodes: 900, //15分钟
          clearInterval: ''
        };
      },
      methods:{
        //箭头返回
        returns(){
          this.$router.go(-1);
        },
        /**
         * 获取手机短信验证码
         */
        getvericode() {
          if(this.telphone == ""){
            this.$toast("请输入手机号码")
            return false;
          }
          this.$http({
            method: 'post',
            url: '/authorizes/security/code' + '?phone=' + this.telphone + '&type=1',
            data: {}
          })
            .then(res => {
              if (res.status == 200) {
                if (res.data.returnCode == 'ERR_0000') {
                  this.clearInterval = setInterval(() => {
                    if (this.secodes == 0) {
                      this.msg = '获取验证码'
                      this.gray = true;
                      this.secodes = 900;
                      clearInterval(this.clearInterval)
                    } else {
                      this.msg = this.secodes-- + '秒后重新获取'
                      this.gray = false;
                    }
                  }, 1000)
                } else if (res.data.returnCode == 'ERR_0016') { //不能重复获取
                  this.$toast('验证码已发送，请勿重复获取');
                } else if (res.data.returnCode == 'ERR_0019') {
                  this.$toast('操作过于频繁，请稍后重试，或使用新的手机号码完成注册');
                }
              }
            }).catch(e => {

          })
        },
        next(){}
      },
      components:{
        Tops
      },
      mounted() {
          this.old = this.$route.query.telphone
        console.log(this.old)
      }
    }
</script>

<style scoped lang="less">
.Verification {
  .old {
    margin-top: 45px;
    input {
      color: #969799!important;
      -webkit-text-fill-color: #969799!important;
    }
  }
  .telphone {
    margin-top: 10px;
  }
.code {
  .getcode {
    color: #FF5555;
  }
}
  .btn {
    height: 47px;
    line-height: 47px;
    background: linear-gradient(270deg, #ec1212, #ff5040);
    border-radius: 30px;
    color: #fff;
    font-size: .48rem;
    box-shadow: 0 0.106667rem 0.16rem 0 rgba(255, 85, 85, 0.3);
    border: 1px solid #FF5555;
    width: calc(100vw - 40px);
    margin: 20px;
  }
}
</style>
