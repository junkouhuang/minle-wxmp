import Tops from "@/components/Top";

export default {
  data() {
    return {

    };
  },
  methods: {
    //箭头回退
    returns(){
      this.$router.go('-1');
    },
    userData() {
      this.$router.push('/userdata')
    },
    account(){
      this.$router.push('/account')
    },
    realNameAuth(){
      this.$router.push('/my/real_name/index')
    },
    serviceProtocol(){
      this.$router.push('/protocol/user/service')
    },
    userDataPolicy(){
      this.$router.push('/protocol/user/policy')
    },
    serviceDesc(){
      this.$router.push('/protocol/service/description')
    },
    feedback() {
      this.$router.push('/feedback')
    },
    //退出登录
    loginout() {
      this.$dialog.confirm({
        title: '',
        message: '确认退出登录'
      }).then(() => {
        this.$http({
          method: 'delete',
          url: this.$url.loginout + '?access_token=' + localStorage.getItem('token'),
          data: {}
        })
          .then(res => {
            if (res.status == 200) {
              this.$router.push('/home');
              localStorage.removeItem('token');
              sessionStorage.removeItem('isshow');
            }
          }).catch(e => {

        })
      }).catch(() => {
      });
    },
  },
  components: {
    Tops
  }
};
