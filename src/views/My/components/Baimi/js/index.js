import Tops from "@/components/Top";

export default {
  data() {
    return {
      cardNo:'',
      password:''
    };
  },
  methods: {
    //返回箭头
    returns(){
      this.$router.go(-1)
    },
    recharge() {
      let formData = new FormData();
      formData.append('cardNo', this.cardNo);
      formData.append('password', this.password);
      this.$http({
        method: 'post',
        url: '/minle/mall/pointCard/check',
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
        .then(res => {
          if (res.status == 200) {
            // 错误全部返回这个码
            if (res.data.returnCode == "ERR_0014") {
               this.$dialog
                .alert({
                  title: '充值须知',
                  confirmButtonColor: '#FF5555',
                  confirmButtonText: '知道了',
                  message: "鑫泉健康全球一卡通卡号与密码为充值的必备凭证，请提供您的10位数字卡号和6位数字密码，完成返现卡充值",
                })
                .then(() => {
                  // do-nothing
                })
            } else if (res.data.returnCode == "ERR_0000") {
               this.$dialog
                .confirm({
                  title: '充值成功',
                  cancelButtonText: '稍后',
                  confirmButtonColor: '#FF5555',
                  confirmButtonText: '前往购物',
                  message: "恭喜您，鑫泉健康全球一卡通充值成功。您可前往【会员中心】查看白米充值明细。祝您购物愉快~",
                })
                .then(() => {
                  this.reset();
                  this.$router.push('/home')
                })
                .catch(e => {
                  this.reset()
                })
            }
          }
        }).catch(e => {
          // do-nothing
      })
    },
    reset() {
      this.cardNo = ''
      this.password = ''
    }
  },
  components: {
    Tops
  },
  created() {

  },
  activated() {

  },
  mounted(){

  }
};
