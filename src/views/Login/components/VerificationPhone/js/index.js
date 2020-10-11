//import Support from "@/components/Support";
import Tops from "@/components/Top";

export default {
  data() {
    return {
      tel: "",
      code: "",
      telicon: require("../images/phone.png"),
      yzmicon: require("../images/yzm.png"),
      gray: false,
      msg: '获取验证码',
      secodes: 90, //1.5分钟
      clearInterval: '',
      can: false,
      autofocus:false
    };
  },
  methods: {
    //箭头回退
    returns() {
      this.$router.go(-1)
    },
    phoneHandle() {
      this.telicon = require('../../../image/phone1.png');
      this.$refs.phoneFocusStatus.focus();
      this.yzmicon = require('../../../image/yzm.png');
    },
    codeHandle() {
      this.telicon = require('../../../image/phone.png');
      this.$refs.codeFocusStatus.focus();
      this.yzmicon = require('../../../image/yzm1.png');
    },
    keydownphone() {
      if (this.tel.length == 11) {
        if (!(/^1[3456789]\d{9}$/.test(this.tel))) {
          this.$toast('手机号码格式不正确')
        } else {
          this.gray = true;
        }
      } else {
        this.gray = false;
      }
    },
    //手机文本输入框失焦
    blurphone() {
      this.telicon = require('../images/phone.png');
    },
    //下一步
    next() {
      if (this.tel == '') {
        this.$toast('请输入手机号');
        return false;
      }
      if (this.code == '') {
        this.$toast('请输入短信验证码');
        return false;
      }
      let reg = /^1[3,5,6,7,8,9]\d{9}$/;

      if (!(/^1[3456789]\d{9}$/.test(this.tel))) {
        this.$toast("请输入正确的手机号码");
        return false;
      }
      if (this.code.length!=6) {
        this.$toast("请输入6位有效验证码");
        return false;
      }
      this.$http({
        method: 'post',
        url: this.$url.verify + '?phone=' + this.tel + '&code=' + this.code,  //18211557064   708353
        data: {}
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == "ERR_0000") {
              sessionStorage.setItem('sign', res.data.data) //缓存短信签名
              sessionStorage.setItem('tel', this.tel) //缓存手机号码
              this.$router.push('/login/pwd/reset')
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
        url: this.$url.getcode + '?phone=' + this.tel + '&type=1',
        data: {}
      })
        .then(res => {
          if (res.status == 200) {
            this.autofocus = true;
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
                  clearInterval(this.secodes)
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
  },
  components: {
    Tops
  }
};
