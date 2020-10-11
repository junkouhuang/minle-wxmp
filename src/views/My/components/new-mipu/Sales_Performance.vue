<template>
  <div class="Sales_Performance">
    <tops>
      <div slot="left" class="arrow" @click="$router.go('-1')"></div>
      <div slot="center" class="title">销售业绩</div>
    </tops>
    <div class="cardx">
      <div class="total_performance">
        <span>￥</span>{{arr.totalSales == null?0:arr.totalSales}}
        <p>总业绩</p>
      </div>
      <div class="withdraw">
        <div class="already">
          <span>￥</span>{{arr.alreadyWithdrawal}}
          <p>已提现</p>
        </div>
        <div class="can">
          <span>￥</span>{{arr.canWithdraw}}
          <p>可提现</p>
        </div>
        <div class="btn1">
          <button @click="withdraw(arr.canWithdraw)">提现</button>
        </div>
      </div>
    </div>
    <div class="orderx">
      <div class="order1">
        <div class="item1">
          <span>{{arr.today}}</span>
          <p>今日订单</p>
        </div>
        <div class="item2">
          <span>{{arr.todaySales}}</span>
          <p>今日订单金额</p>
        </div>
        <div class="item3">
          <span>{{arr.mouth}}</span>
          <p>本月订单</p>
        </div>
      </div>
      <div class="order2">
        <div class="item4">
          <span>{{arr.mouthSales}}</span>
          <p>本月订单金额</p>
        </div>
        <div class="item4">

        </div>
        <div class="item4">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Tops from "@/components/Top";
  export default {
      name: "Sales_Performance",
      data() {
        return {
          arr:[]
        };
      },
      components: {
        Tops
      },
      async created(){
        this.mipuNo = this.$route.query.mipuNo;
        await  this.salesPerformance();
      },
      methods:{
        async salesPerformance(){
          const res = await this.$http({
            method: "post",
            url: "/minle/mall/mipu/salesPerformance",
            data:this.$qs.stringify({mipuNo:this.mipuNo}),
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          });
          this.arr = res.data.data;
        },
        withdraw(amount){
          this.$router.push({path:'/my/wallet/extract', query: {mipuNo: this.mipuNo}})
          sessionStorage.setItem('useramount',amount)
          sessionStorage.setItem('type',2);
        },
      }
  }
</script>

<style scoped lang="less">
  .Sales_Performance {
    .cardx {
      margin: 55px auto 0;
      width: calc(100vw - 20px);
      height: 190px;
      border-radius:13px;
      background: linear-gradient(270deg,#f55,#f55);
      color: #fff;
      box-shadow: 0 0.106667rem 0.16rem 0 rgba(255, 85, 85, 0.3);
      .total_performance {
        padding-top: 29px;
        font-size: 23px;
        text-align: center;
        span {
          font-size: 20px;
        }
        p {
          margin-top: 10px;
          font-size: 15px;
        }
      }
      .withdraw {
        display: flex;
        padding-top: 25px;
        align-items: center;
        .already,.can {
          font-size: 20px;
          flex: 1;
          text-align: center;
          position: relative;
          span {
            font-size: 15px;
          }
          p {
            margin-top: 10px;
            font-size: 13px;
            opacity:0.6;
          }
          &:after{
            content: '';
            width: 1px;
            height:23px ;
            background-color: #FFFFFF;
            position: absolute;
            transform: translate(50%,50%);
            top: 0;
            right: 0;
          }
        }
        .btn1 {
          flex: 1;
          text-align: center;
          button{
            width:50px;
            height: 24px;
            line-height: 24px;
            padding: 2px 5px 2px 5px;
            background:rgba(255,255,255,1);
            opacity:1;
            border-radius:22px;
            color: #ff5555;
            font-size: 12px;
            border: none;
          }
        }
      }
    }
    .orderx {
      margin: 18px auto;
      border-radius:13px;
      height: 187px;
      background-color: #ffffff;
      text-align: center;
      .order1{
        display: flex;
        .item1,.item2 {
          flex: 1;
          padding-top: 27px;
          span {
            color: #333333;
            font-size: 20px;
          }
          p {
            margin-top: 10px;
            font-size: 12px;
            color: #808080;
          }
          &:after{
            content: '';
            width: 1px;
            height:23px ;
            background-color: #FFFFFF;
            position: absolute;
            transform: translate(50%,50%);
            top: 0;
            right: 0;
          }
        }
        .item3{
          flex: 1;
          padding-top: 27px;
          span {
            font-size: 20px;
          }
          p {
            margin-top: 10px;
            font-size: 12px;
            color: #808080;
          }
        }
      }
      .order2{
        padding-top: 36px;
        display: flex;
        .item4{
          flex: 1;
          span {
            font-size: 20px;
          }
          p {
            margin-top: 10px;
            font-size: 12px;
            color: #808080;
          }
        }
      }
    }
  }

</style>
