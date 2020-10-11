<template>
  <div class="payment-page">
    <tops>
      <div slot="left" class="arrow" @click="$router.go('-1')"></div>
      <div slot="center" class="title">线上收款</div>
    </tops>
    <div class="payment-number">
      <p class="title">支付金额</p>
      <div class="input-money">
        <p>￥</p>
        <input type="number" placeholder="请输入支付金额" v-model.trim='totalAmount'/>
      </div>
    </div>

    <div class="next-botton" @click="next">确认支付</div>
  </div>
</template>
<script>
import Tops from "@/components/Top";
export default {
  data() {
    return {
        totalAmount:'',
        mipuNo:''
    };
  },
  components: {
    Tops
  },
  created(){
     this.mipuNo = this.$route.query.mipuNo
  },
  methods:{
      /**
     * 确认支付
     */
    next(){
      if(this.totalAmount == ""){
        this.$toast("支付金额不能为空");
      }else{
        this.submitOrder();
      }
    },
    submitOrder(){
      this.$http({
        method: 'post',
        url: '/minle/mall/order/submitOrder',
        data: {
          "deduction":"0",
          "mipuNo":this.mipuNo,
          "orderType":"2",
          "totalAmount":this.totalAmount
        }
      })
        .then(res => {
          if (res.data.returnCode == "ERR_0000") {
            if(res.data.data==0){
              this.$toast("分享人用户信息被篡改");
            }else{
              this.orderNo = res.data.data;
              this.pay(this.orderNo,this.totalAmount );
            }
          }
        }).catch(e => {

      })
    },
    pay(orderNo, totalAmount) {
      let data = {
        orderNO: orderNo,
        totalPrice: totalAmount
      };
      this.$http({
        method: 'post',
        url: '/minle/mall/order/pay',
        data: this.$qs.stringify(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          if (res.status == 200) {
            WeixinJSBridge.invoke("getBrandWCPayRequest", res.data.data, res => {
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                //购买成功之后需要做的事...
                //this.$router.push('/my/mipu_record');
                this.$toast("付款成功");
              }
            });
          }
        }).catch(e => {

      })
    },
  }
};
</script>
<style lang="less">
.payment-page {
  box-sizing: border-box;
  padding-top: 45px;
  .payment-number {
    // height: 105px;
    background-color: #fff;
    box-sizing: border-box;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom:35px;
    .title {
      font-size: 15px;
      color: #333;
    }
    .input-money {
      display: flex;
      align-items: center;
      margin-top: 30px;
      p {
        font-size: 20px;
        color: #333333;
      }
      input {
        border: none;
        font-size: 20px;
        color: #333;
        margin-left: 7px;
        &::placeholder {
          color: #d9d8d8;
        }
      }
    }
  }
  .next-botton {
    width: 345px;
    height: 40px;
    background: linear-gradient(270deg,#f55,#f55);
    border-radius: 23px;
    margin-left:15px;
    margin-top:90px;
    text-align:center;
    line-height:38px;
    color:#fff;
    font-size:16px;
  }
}
</style>
