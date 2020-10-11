import Tops from "@/components/Top";

export default {
  data() {
    return {
      password:'',
      oldpassword:'',
      conifrmpassword:'',
      seen1:false,
      seen2:false,
      seen3:false,
      type1:'password',
      type2:'password',
      type3:'password'
    };
  },
  methods: {
    //回退
    returns(){
      this.$router.go(-1)
    },
    //密码可视
    seen1Fun(){
      this.seen1 = !this.seen1;
      this.type1 = this.seen1?'text':'password'
    },
    seen2Fun(){
      this.seen2 = !this.seen2;
      this.type2 = this.seen2?'text':'password'
    },
    seen3Fun(){
      this.seen3 = !this.seen3;
      this.type3 = this.seen3?'text':'password'
    },
    //设置密码
    setPwd() {
      if(this.oldpassword == '') {
        this.$toast('请输入原密码');
        return false;
      }
      if(this.password == '') {
        this.$toast('请输入新密码');
        return false;
      }
      let reg = new RegExp('^[a-zA-Z0-9_][a-zA-Z0-9_]{6,18}$');
      if (!reg.test(this.password)) {
        this.$toast("新密码包含6-18位字母数字下划线")
        return false;
      }
      if(this.conifrmpassword == '') {
        this.$toast('请输入确认密码');
        return false;
      }
      if(this.password != this.conifrmpassword){
        this.$toast("两次密码输入不一致")
        return false;
      }
      if(this.password == this.oldpassword){
        this.$toast("新密码不能与原密码不能相同")
        return false;
      }
      this.$http({
        url: '/authorizes/user/passport',
        method: "post",
        data: this.$qs.stringify({
          password: this.password,
          oldPassword: this.oldpassword
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res)
        if (res.data.returnCode == "ERR_0000") {
          this.$toast("修改成功")
          this.$router.go(-1)
        }
      });
    }
  },
  mounted() {

  },
  components: {
    Tops
  }
};
