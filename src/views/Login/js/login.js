import Support from "@/components/Support";

export default {
  data() {
    return {
      tel: "",
      pwd: '',
      seepwd: false,
      password1: 'password',
      telicon: require("../image/user.png"),
      yzmicon: require("../image/pass.png"),
      isremember: true,
      passcode: '',
      scode:'',
      isshow:1,
      shareurl:''
    };
  },
  methods: {
    //手机号码输入框获取焦点
    telfocus(){
      this.telicon=require('../image/user1.png')
      let tel = localStorage.getItem('username');
      if (tel != null || tel == undefined || tel == '') {
        localStorage.removeItem('username')
        localStorage.removeItem('passcode')
        localStorage.removeItem('isremember');
        this.tel = ''
        this.pwd = ''
        this.passcode = ""
        this.seepwd = false;
      }
    },

    usernameHandle(){
      this.telicon=require('../image/user1.png');
      this.$refs.userFocusStatus.focus();
      this.yzmicon=require('../image/pass.png');
    },

    passwordHandle(){
      this.telicon=require('../image/user.png');
      this.$refs.passFocusStatus.focus();
      this.yzmicon=require('../image/pass1.png');
    },

    //密码输入框获取焦点
    pwdfocus() {
      this.yzmicon = require('../image/pass1.png')
      let passcode = localStorage.getItem('passcode');
      if (passcode != undefined) {
        localStorage.removeItem('passcode')
        localStorage.removeItem('isremember');
        this.pwd = ''
        this.passcode = ''
        this.seepwd = false;
      }
    },
    //密码输入框获取失去焦点
    pwdblur() {
      this.yzmicon = require('../image/pass.png')
      let pwd = localStorage.getItem('passcode');
      if (pwd != undefined) {
        this.pwd = localStorage.getItem('passcode')
      }
    },
    //记住密码
    isrememberFun() {
      this.isremember = !this.isremember;
      let isremember = localStorage.getItem('isremember');
      if (isremember) {
        localStorage.removeItem('passcode');
        localStorage.removeItem('username');
        localStorage.removeItem('isremember');
        this.seepwd = false;
        this.pwd =''
      }
    },
    //密碼查看
    seepwdFun() {
      this.seepwd = !this.seepwd;
      if (this.seepwd) {
        this.password1 = 'text';
      } else {
        this.password1 = 'password';
      }
    },
    //注冊
    toregister() {
      
      window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe3f461385e1cd4d6&redirect_uri=https://minle.xinquanjk.com/minlewxmp/inside.html&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect"
    },
    //登录
    tologin() {
      if (this.tel == "") {
        this.$toast('请输入手机号或账号名')
        return false;
      }
      if (this.pwd == "") {
        this.$toast('请输入密码')
        return false;
      }
      if(this.pwd == "000000000000000000000"){
        this.pwd = this.passcode;
      }
      let data = {
        'username': this.tel,
        'password': this.pwd,
        'rookie': this.isremember,
        'passcode': this.passcode
      }
      this.$toast.loading({
        message: '正在登录...',
        forbidClick: true
      });
      this.$http({
        method: 'post',
        url: '/authorize/security/user/passport',
        data: this.$qs.stringify(data)
      })
        .then(res => {
          if (res.status == 200) {
            this.$toast('登录成功')
            localStorage.setItem('token', res.data.data.token.access_token);
            if (this.isremember) {
              localStorage.setItem('username', this.tel)
              localStorage.setItem('passcode', res.data.data.passcode)
              localStorage.setItem('isremember', true)
            } else {
              localStorage.removeItem('username')
              localStorage.removeItem('passcode')
              localStorage.removeItem('isremember')
            }
            if(this.scode!=null && this.isshow==1){
              window.location.href=this.shareurl;
            }else{
              this.$router.push('/home');
            }

          }
        }).catch(e => {

      })
    }
  },
  mounted() {
    let flag = localStorage.getItem('isremember');
    if (flag) {
      this.tel = localStorage.getItem('username');
      this.pwd = "00000000000000000000";
      this.passcode = localStorage.getItem('passcode');
      this.isremember = localStorage.getItem('isremember');
      if (this.tel != undefined) {
        this.seepwd = "-1";
      } else {
        this.seepwd = false;
      }
    }
    this.scode=sessionStorage.getItem('scode');
    this.isshow=sessionStorage.getItem("isshow");
    this.shareurl = sessionStorage.getItem('shareurl')
  },
  components: {
    Support
  },
  watch:{
    tel(newName, oldName) {
      if(newName == ""){
        this.pwd = ""
        this.seepwd = true;
        this.passcode = "";
      }
    },
    pwd(newName, oldName) {
      if(newName == ""){
        this.seepwd = false;
        this.passcode = "";
      }
    }
  }
};
