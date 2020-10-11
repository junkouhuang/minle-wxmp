import Support from "@/components/Support";
import Tops from "@/components/Top";

export default {
  data() {
    return {
      password1:'password',
      password2:'password',
      pwd:'',
      confirmpwd:'',
      seepwd:false,
      seeconfirmpwd:false,
      telicon1: require("../images/pass.png"),
      telicon2: require("../images/pass.png"),
    };
  },
  methods: {
    //箭头回退
    returns(){
      this.$router.go(-1);
    },
    passwordHandle(){
      this.telicon1=require('../../../image/pass1.png');
      this.$refs.passwordFocusStatus.focus();
      this.telicon2=require('../../../image/pass.png');
    },
    comfirmpasswordHandle(){
      this.telicon1=require('../../../image/pass.png');
      this.$refs.comfirmpasswordFocusStatus.focus();
      this.telicon2=require('../../../image/pass1.png');
    },
    seepwdFun(type){
      this.seepwd = !this.seepwd;
      if(type == 1){
        this.password1 = 'text';
      }else{
        this.password1 = 'password';
      }
    },
    seeconfirmpwdFun(type){
      this.seeconfirmpwd = !this.seeconfirmpwd;
      if(type == 1){
        this.password2 = 'text';
      }else{
        this.password2 = 'password';
      }
    },
    //设置新密码
    setNew(){
      if(this.pwd == "" ){
        this.$toast("请输入新的密码");
        return  false;
      }
      let reg =new RegExp('^(?=.*\\d)(?=.*[a-zA-Z]).{6,18}$');
      if (!reg.test(this.pwd)) {
        this.$toast("新密码必须至少6个字符，同时包含字母和数字")
        return false;
      }
      if(this.confirmpwd == ""){
        this.$toast("确认密码不能为空");
        return  false;
      }
      if(this.confirmpwd != this.pwd){
        this.$toast("两次密码输入不一致");
        return  false;
      }
      this.$http({
        method: 'post',
        url: '/authorizes/user/passport/forget' ,  
        data: this.$qs.stringify({
          'phone':sessionStorage.getItem('tel'),
          'password':this.pwd,
          'confirm':this.confirmpwd,
          'sign':sessionStorage.getItem('sign')
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
        .then(res => {
          if (res.status == 200) {
            this.$toast("设置密码成功")
            this.$router.push('/login')
          }
        }).catch(e => {

      })
    },
  },
  components: {
    Support,
    Tops
  },
};
