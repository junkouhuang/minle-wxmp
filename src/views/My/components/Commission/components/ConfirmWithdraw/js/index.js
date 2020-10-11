import Tops from "@/components/Top";

export default {
  data() {
    return {
      amount:0,//提现金额
      serviceFee:0,//提现手续费
      showTig:false,
      id:'',
      orderNo: ''
    };
  },
  methods: {
    //箭头回退
    returns(){
      this.$router.go('-2');
    },
    //微信提现
    withdrawWx(){
      var data = [];
      if(this.type==0){
        data = {
          amount: this.amount,
          type:0
        }
      }else if(this.type == 1){
        data = {
          id: this.id,
          amount: this.amount,
          orderNo: this.orderNo,
          type:1
        }
      }else if(this.type==2){
        data = {
          id: this.id,
          amount: this.amount,
          orderNo: this.orderNo,
          type:2
        }
      }else if(this.type==3){
        data = {
          type:3,
          amount: this.amount,
          orderNo: this.orderNo,
          id: this.id,
        }
      }else if(this.type==4){
        data = {
          type:4,
          amount: this.amount,
          orderNo: this.orderNo,
          id: this.id,
        }
      }else if(this.type==5){
        data = {
          amount: this.amount,
          type:5
        }
      }
      this.$http({
        method: 'post',
        url: '/minle/user/changeWithdrawal/withdrawal',
        data: this.$qs.stringify(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          if (res.data.returnCode == "ERR_0000") {
            if(res.data.data === 0){
              this.$toast('您今日提现次数已使用完');
            }else{
              this.$toast('提现成功');
              this.$router.go(-2);
            }
          }
        }).catch(e => {

      })
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
    this.amount = this.$route.query.amount;
    this.serviceFee = this.$route.query.serviceFee;
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
    this.orderNo = this.$route.query.orderNo;
  }
};
