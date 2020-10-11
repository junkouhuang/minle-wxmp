<template>
  <div class="Sales_Order">
    <tops>
      <div slot='left' class="arrow" @click="$router.go('-1')"></div>
      <div slot='center' class="title">销售订单</div>
    </tops>
    <div class="m_bar">
      <div class="m_bar_left" @click="handle('date')">
        <span>销量：{{list.length>0?list.length:0}}单</span>
      </div>
      <div class="m_bar_right" @click="handle('date')">
        <span>{{dateTime}}</span>
        <van-icon name="arrow-down"/>
      </div>
    </div>
    <div class="m_list">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <template v-if="list.length>0">
          <van-row v-for="(item,index) in list" class="qb_row" :key="index">
            <div style="margin-top:8px;">
              <van-row class="order">
                <p @click="detail(item)">
                  订单号：{{item.orderNo}}
                  <span class="right" v-if="item.status == 0">待客人付款</span>
                  <span class="qr" v-if="item.status == 1">待安排发货</span>
                  <span class="rith" v-if="item.status == 2">待确认收货</span>
                  <span class="right" v-if="item.status == 3">已完成</span>
                  <span class="right" v-if="item.status == 4">订单取消</span>
                </p>
              </van-row>
              <van-row v-for="(list,i) in item.orderDetail" class="orderDetailDO" :key="i">
                  <van-col span="5" class="qb_left">
                    <img :src="list.title_picture"/>
                  </van-col>
                  <van-col span="15">
                    <p class="username">{{list.name}}我们的台加的发挥设计费哈双方都我按时付款几哈沙发发发的发顺丰打发大水交换机安徽交换机卡换句话交换机按时发股份<span class="amount">￥{{list.single_total_amount}}</span></p>
                    <p class="createTime">{{list.specifications}}</p>
                  </van-col>
                  <van-col span="4">
                    <p class="amount" style="height:20px;line-height:20px;font-size:14px;">￥{{list.single_total_amount}}</p>
                    <p class="qb_right" style="height:20px; line-height:20px;font-size:14px;">x{{list.amount}}</p>
                  </van-col>
              </van-row>
              <van-row>
                <p class="orderNo"><span class="date">日期：{{item.createTime | formatDate}}</span>订单金额&nbsp;<span class="amount"><em>￥</em>{{item.totalAmount}}</span></p>
              </van-row>
              <van-row>
                <div class="end" v-if="item.status==0">
                  <div class="btm">
                    <div class="qx" @click="cancelOrder(item.orderNo)">订单取消</div>
                  </div>
                </div>
                <div class="end" v-if="item.status==1">
                  <div class="btm">
                    <div class="fh" @click="confirmDelivery(item.orderNo)">确认发货</div>
                  </div>
                </div>
              </van-row>
            </div>
        </van-row>
        </template>
        <template v-else>
          <van-row class="empty" >
            <img src="./img/noimg2x.png"/>
            <p>暂无数据</p>
          </van-row>
        </template>
      </van-list>
      <van-popup
        v-model="showPopup"
        position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          :min-date="minDate"
          :formatter="formatter"
          @confirm="getTime"
          @cancel="cancel"
          v-if="showDate"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
  import Tops from "@/components/Top";
  export default {
    data() {
      return {
        pageNum: 1,
        pageSize: 40,
        total:0,
        list: [],
        loading: false,
        finished: false,
        showPopup: false,
        showDate: false,
        mipuNo:'',
        mcName:'',
        currentDate: new Date(),
        minDate: new Date(2000, 0, 1),
        active1:0,
        dateTime:'日期',
        typeName:'类型'
      };
    },
    methods: {
      //箭头回退
      returns(){
        this.$router.go('-1');
      },
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        }
        return value;
      },
      handle(type) {
        this.showPopup = !this.showPopup;
        if (type == 'date') {
          this.showDate = true;
        } else {
          this.showDate = false;
        }
      },
      //订单详情
      detail(item) {
        this.$router.push({path: '/mipuOrderDetail', query: {orderNo: item.orderNo, mcName: this.mcName,active: item.status}});
      },
      //确认发货
      confirmDelivery(orderNo) {
        this.$router.push({path: '/my/mipu_home/new/confirm_delivery', query: {orderNo: orderNo}});
      },
      //订单取消
      cancelOrder(orderNo) {
        this.$dialog
          .confirm({
            title: "取消订单",
            message: "订单取消后，订单状态将无法撤回，顾客支付金额将原路退回，确定取消？"
          })
          .then(() => {
            this.$toast.loading({
              message: '订单取消中...',
              forbidClick: true
            });
            // TODO
            //this.$toast.success('取消订单功能暂未开放，谢谢您的使用!');
            //return false;
            this.$http({
              method: "post",
              url: '/minle/mall/order/revert',
              data: this.$qs.stringify({order: orderNo}),
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(res => {
              if (res.data.returnCode == "ERR_0000") {
                this.$toast.success('订单已取消');
                this.getList();
              }
            });
          })
          .catch(() => {
            // do nothing.
          });
      },
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          /* for (let i = 0; i < 10; i++) {
             this.list.push(this.list.length + 1);
           }*/

          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= this.total) {
            this.finished = true;
          }else{
            this.pageNum += this.pageNum;
            this.getList();
          }
        }, 500);
      },
      getTime(time){
        this.startTime = `${new Date(time).getFullYear()}${new Date(time).getMonth()+1>9?new Date(time).getMonth()+1:"0"+(new Date(time).getMonth()+1)}`;
        this.showPopup = !this.showPopup;
        this.dateTime = `${new Date(time).getFullYear()}年`+`${new Date(time).getMonth()+1}月`;
        this.list = [];
        this.getList();
      },
      cancel(){
        this.showPopup = !this.showPopup;
      },
      getList() {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
        });
        let data = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          mipuNo:this.mipuNo,
          startTime:this.startTime
        }
        this.$http({
          method: 'post',
          url: '/minle/mall/mipu/salesOrderList',
          data: this.$qs.stringify(data)
        })
          .then(res => {
            this.$toast.clear();
            if (res.status == 200) {
              if(res.data.data.list.length>0){
                this.list = this.list.concat(res.data.data.list);
                this.total = res.data.data.total;
              }else{
                this.list = [];
                this.total = 0;
              }
            }
          }).catch(e => {

        })
      },
      choose(index,name){
        this.showPopup = !this.showPopup;
        this.type = index;
        this.active1 = index;
        this.typeName = name;
        this.list = [];
        this.getList();
      },
    },
    components: {
      Tops
    },
    created() {
      console.log(this.$route.query)
      this.mipuNo = this.$route.query.mipuNo;
      this.mcName = this.$route.query.mcName;
      this.getList()
    },
    filters: {
      //格式化时间戳
      formatDate: function (value) {
        var date = new Date(value);
        var Y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var H = date.getHours();
        var i = date.getMinutes();
        var s = date.getSeconds();
        if (m < 10) {
          m = '0' + m;
        }
        if (d < 10) {
          d = '0' + d;
        }
        if (H < 10) {
          H = '0' + H;
        }
        if (i < 10) {
          i = '0' + i;
        }
        if (s < 10) {
          s = '0' + s;
        }
        var t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s;
        return t;
      }
    }
  };
</script>

<style scoped lang="less">
  .Sales_Order {
    .m_bar {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-color: #ffffff;
      position: fixed;
      top: 1.1736rem;
      z-index: 1;

      .m_bar_left {
        width: 50%;
        float: right;
        text-align: right;
        span {
          color: #1A1A1A;
          font-size: 14px;
          padding-right: 15px;
          margin: 19px 2px 18px 18px;
        }
      }
      .m_bar_right {
        width: 50%;
        float: left;

        span {
          color: #1A1A1A;
          font-size: 14px;
          margin: 19px 2px 18px 18px;
        }
      }
    }

    .m_list {
      margin-top: 2.6rem;

      .qb_row {
        background-color: #ffffff;
        position: relative;
        padding: 0;

        .order {
          color: #727272;
          font-size: 13px;
          height: 40px;
          line-height: 40px;
          padding: 0;
          position: relative;

          p{
            padding-left:15px;
          }

          .right {
            float:right;
            color: #333333;
            text-align: right;
            padding-right:10px;
          }

          .qr {
            float:right;
            color: #FF7A00;
            text-align: right;
            padding-right:10px;
          }
        }

        .orderDetailDO {
          margin-bottom: 20px;
          padding-bottom: 5px;
          margin-left:10px;
          margin-right: 10px;
          border-bottom: 0.026667rem solid #F7F7F7;

          .qb_left {
            text-align: center;

            img {
              width: 60px;
              height: 60px;
              margin-left: 5px;
              margin-right: 10px;
              border-radius: 0.106667rem;
            }
          }

        .username {
          color: #333333;
          font-size: 14px;
          margin-left:5px;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 1.013333rem;
          display: -webkit-box;
          line-height: 0.533333rem;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          white-space: normal;
          height: auto;
          padding-right:3px;
        }

        .amount{
          color: #333333;
          float:right;
          padding-right:6px;
          text-align: right;
        }

        .single_total_amount {
          color: #727272;
          height:20px;
          font-size: 13px;
          margin: 0 11px 0 25px;
          line-height: 20px;
        }

        .createTime {
          height:20px;
          line-height:20px;
          margin: 5px 0px 0px 25px;
          color: #727272;
          font-size: 12px;
        }
        .qb_right {
          float:right;
          padding-right:10px;
          text-align: right;
          color: #727272;
          .amount {
            color: #FF4141;
            font-size: 17px;
            margin: 0 auto 0.4rem;
          }

          .hs {
            color: #333333;
          }

          .dj {
            font-size: 13px;
            color: #858585FF;
          }
        }

        }

        .orderNo{
          color: #333333;
          text-align: right;
          padding-right:10px;
          font-size: 13px;
          margin: 0 0 10px 15px;
          .date{
            color: #333333;
            float:left;
            font-size: 13px;
            text-align: left;
            padding-left: 0px;
          }
          .amount {
            float:right;
            color: #333;
            font-size: 16px;
            margin-left: 0px;
            margin-bottom: 0px;
            line-height:10px;

            em {
              font-size:12px;
              font-style:normal;
            }

          }
          span {
            color: #1A1A1A;
          }
        }


        .end {
          // padding: 0 10px;
          position: relative;
          font-size: 14px;
          color: #333;
          height: 48px;
          line-height: 48px;

          .btm {
            font-size: 13px;
            height: 2rem;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: end;
            -ms-flex-pack: end;
            -webkit-justify-content: flex-end;
            justify-content: flex-end;
            height: 100%;
            float: right;

            .sh {
              margin: 0.266667rem 0 0.266667rem 0.266667rem;
              border-radius: 0.533333rem;
              height: 0.746667rem;
              line-height: 0.72rem;
              padding: 0 0.32rem;
              background: transparent;
              color: #ff5555;
              border: 0.026667rem solid #ff5555;
            }

            .qx {
              margin: 10px 10px 10px 10px;
              border-radius: 20px;
              height: 28px;
              line-height: 27px;
              padding: 0 12px;
              color: #858585;
              border: 1px solid #858585;
            }

            .fh {
              margin: 10px 10px 10px 10px;
              border-radius: 20px;
              height: 28px;
              line-height: 27px;

              // font-size: 0.65rem
              padding: 0 12px;

              background: transparent;
              color: #FF7A00;
              border: 1px solid #FF7A00;
            }
          }
        }

      }

      .empty {
        text-align: center;
        margin-top: 200px;

        img {
          width: 105px;
        }

        p {
          margin:28px auto 37px;
          color: #615F60FF;
          font-size: 14px;
        }

        div{
          margin: auto;
          width: 109px;
          height: 30px;
          line-height: 30px;
          color: #ffffff;
          background: -webkit-linear-gradient(right, #ec1212, #ff5040);
          background: linear-gradient(270deg, #ec1212, #ff5040);
          border-radius: 0.8rem;
          font-size: 14px;
          box-shadow: 0 0.106667rem 0.16rem 0 rgba(255, 85, 85, 0.3);
          border: 0.026667rem solid #FF5555;
          margin-top: 0.72rem;

          a {
            color: #ffffff;
          }

        }
      }

      .miliList {
        background-color: #FAF8F9;
        text-align: center;

        p {
          font-size: 16px;
          padding: 16px 0;
        }

        hr {
          background-color: #F2F2F2;
          border: none;
          height: 1px;
        }

        .m_content {
          padding: 30px 10px;

          .col_m {
            div {
              background-color: #f5f5f5;
              padding: 10px 20px;
              font-size: 14px;
              margin: 5px;
              color: #666666;
              border:none;
              border-radius: 30px;
            }

            .m_active {
              color: #ff5555;
              background-color: rgba(255,85,85,.1);
              border:none;
            }
          }
        }
      }
    }
  }
</style>
