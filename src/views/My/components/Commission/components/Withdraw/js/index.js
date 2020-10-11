import Tops from "@/components/Top";

export default {
  data() {
    return {
      limit:0, //每日限制提现次数
      count:0,  //今天已提现次数
      amount:0, //提现金额
      orderNo:'', // 订单编号
      type:'',//1购物奖励2.推广奖励
      show:false,
      freeOrders:0, //享受x 次派送免单特权特权
      totalCount:0, //您已经派送免单x次
      id:0,
      amountWithdraw:0,
      totalAmount:0,
    };
  },
  methods: {
    //箭头回退
    returns(){
      this.$router.go('-1');
    },
    clickHandle(){
      this.show = !this.show;
    },
    next(){
      if(!this.show) {
        this.$toast("请选择提现金额");
        return false;
      }
      if(this.amount<1) {
        this.$toast("可提现金额不能小于0");
        return false;
      }
      var data = [];
      let url = '';
      if(this.type == 1){
        url='/minle/user/changeWithdrawal/withdrawalShow'
        data = {
          type:1,
          orderNo: this.orderNo,
        }
      }else if(this.type==2){
        url='/minle/user/changeWithdrawal/withdrawalShow'
        data = {
          orderNo: this.orderNo,
          type:2
        }
      }else if(this.type==3){
        url='/minle/user/changeWithdrawal/withdrawalShow'
        data = {
          type:3,
          orderNo: this.orderNo,
        }
      }else if(this.type==4){
        url='/minle/user/changeWithdrawal/withdrawalShow'
        data = {
          type:4,
          id: this.id,
        }
      }else if(this.type==5){
        url='/minle/user/changeWithdrawal/withdrawalShow'
        data = {
          id: this.id,
          type:5
        }
      }
      this.$http({
        method: 'post',
        url: url,
        data: this.$qs.stringify(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          if (res.data.returnCode == "ERR_0000") {
            //0表示未到提现时间,返回1表示该月已经提现,返回2表示该笔订单提现次数已满(推广提现)
            //0表示今天提现次数已满，返回true表示提现成功(购物提现)
            if(res.data.data === 3){
              this.$toast('您尚未绑定银行卡 ');
              return false;
            }
            if(this.type==1){
              if(Object.is(res.data.data,0)){
                this.$toast("今天提现次数已满");
                return false;
              }else{
                this.withdrawX(res.data.data.amount)
              }
            }else if(this.type==2){
              if(Object.is(res.data.data,0)){
                this.$toast("未到提现时间");
              }else if(Object.is(res.data.data,1)){
                this.$toast("该月已经提现")
              }else if(Object.is(res.data.data,2)){
                this.$toast("该笔订单提现次数已满");
              }else{
                this.withdrawX(res.data.data.amount)
              }
            }else if(this.type==3){
             if(Object.is(res.data.data,1)){
                this.$toast("该月已经提现");
              }else if(Object.is(res.data.data,2)){
                this.$toast("该笔订单提现次数已满");
              }else{
                this.withdrawX(res.data.data.amount)
              }
            }else if(this.type==4){
              if(Object.is(res.data.data,1)){
                this.$toast("该月已经提现");
              }else if(Object.is(res.data.data,2)){
                this.$toast("该笔订单提现次数已满");
              }else{
                this.withdrawX(res.data.data.amount)
              }
            }else if(this.type==5){
              if(Object.is(res.data.data,6)){
                this.$toast("15日前可提现一次，当月15日之后的提现金额将自动放入下月15日前累加提现。");//已过每月提现时间
              }else if(Object.is(res.data.data,4)){
                this.$toast("本月已经提现");
              }else if(Object.is(res.data.data,5)){
                this.$toast("提现次数已满");
              }else{
                this.withdrawX(res.data.data.amount)
              }
            }
          }
        }).catch(e => {

      })
    },
    getList() {
      let url = '';
      if(this.type == 1){
        var data =[];
        url = "/minle/user/settle/drawalShow";
         data = {
          orderNo: this.orderNo,
        }
      }else if(this.type == 2){
        url="/minle/user/settle/generalizeShow"
         data = {
          orderNo: this.orderNo,
          type:2
        }
      }else if(this.type == 3){
        url="/minle/user/settle/generalizeShow"
        data = {
          orderNo: this.orderNo,
          type:3
        }
      }else if(this.type == 4){
        url="/minle/user/settle/promotionRewards"
        data = {
          id: this.id
        }
      }else if(this.type == 5){
        url="/minle/user/changeWithdrawal/withdrawalShow"
        data = {
          amount: this.amount,
          type:5
        }
      }
      this.$http({
        method: 'post',
        url: url,
        data: this.$qs.stringify(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          if (res.data.returnCode == "ERR_0000") {
           this.limit= res.data.data.limit;
            this.count= res.data.data.count;
            this.totalCount = res.data.data.totalCount;
            this.freeOrders = res.data.data.freeOrders;
            this.amount= res.data.data.amount;
            this.amountWithdraw = res.data.data.amountWithdraw;
            this.totalAmount = res.data.data.totalAmount;
          }
        }).catch(e => {

      })
    },
    withdrawX(amount){
      var data = [];
      if(this.type==0){
        data = {
          amount: amount,
          type:0
        }
      }else if(this.type == 1){
        data = {
          id: this.id,
          amount: amount,
          orderNo: this.orderNo,
          type:1
        }
      }else if(this.type==2){
        data = {
          id: this.id,
          amount: amount,
          orderNo: this.orderNo,
          type:2
        }
      }else if(this.type==3){
        data = {
          type:3,
          amount: amount,
          orderNo: this.orderNo,
          id: this.id,
        }
      }else if(this.type==4){
        data = {
          type:4,
          amount: amount,
          orderNo: this.orderNo,
          id: this.id,
        }
      }else if(this.type==5){
        data = {
          amount: amount,
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
              this.$router.push({path:'/my/finsh',query:{amount:amount}})
            }
          }
        }).catch(e => {

      })
    },
  },
  components: {
    Tops
  },
  created() {
    alert(this.$route.query.type);
    this.orderNo = this.$route.query.orderNo;
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
    this.amount = this.$route.query.amount;
    this.getList();
  }
};
