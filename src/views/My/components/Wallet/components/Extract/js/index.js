import Tops from "@/components/Top";

export default {
  data() {
    return {
      money: [50, 100, 150, 200, 300, 500],
      active: 0,
      useramount: 0,//可提现金额
      chooseamount: 50,
      type: 0,
      mipuNo: '',
    }
  },
  methods: {
    //箭头回退
    returns(){
      this.$router.go(-1);
    },
    choose(index) {
      this.active = index;
      this.chooseamount = this.money[index]
    },
    extractFun() {
      let url = "";
      let data = [];
      if(this.type == 6){
        url="/minle/mall/agentCommissionSettlement/generalizeCommissionSettle";
        data={amount:this.chooseamount}
      }else{
        url="/minle/user/wallet/withdrawal"
        data={ 'amount': this.chooseamount,type:this.type,mipuNo:this.mipuNo}
      }
      if (this.useramount > 0 && this.useramount >= this.chooseamount) {
        this.$http({
          method: 'post',
          //data: this.$qs.stringify({ 'amount': this.chooseamount,type:this.type}),
          url:url,
          data:this.$qs.stringify(data),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
        })
          .then(res => {
            if (res.data.returnCode == "ERR_0000") {
              if(res.data.data === 0){
                this.$toast('未到提现时间 ');
                return false;
              }
              if(res.data.data === 3){
                this.$toast('您尚未绑定银行卡，为不影响您的钱包提现，请前往会员中心完成银行卡设置。');
                return false;
              }
              this.$toast.success('提现成功');
              sessionStorage.setItem('useramount',this.useramount-this.chooseamount)
              this.$router.push({
                path: '/my/wallet/extract/success',
               // path: '/my/confirmwithdraw',
                query: {amount: this.chooseamount}
                //query:{amount:this.chooseamount,serviceFee:res.data.data.serviceFee,type:this.type}
              })
            }
          }).catch(e => {

        })
      } else {
        this.$toast('暂无可提现金额')
      }
    }
  },
  components: {
    Tops
  },
  created() {

  },
  activated() {

  },
  mounted() {
    this.useramount = sessionStorage.getItem('useramount');
    this.type = sessionStorage.getItem('type');
    this.mipuNo = this.$route.query.mipuNo;

  }
};
