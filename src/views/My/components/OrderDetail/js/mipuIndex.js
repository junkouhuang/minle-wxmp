import Tops from "@/components/Top";

export default {
  data() {
    return {
      data: "",
      orderNo: '',
      mcName: '',
      active: '',
      addressData: [], // 地址
      addressTips: '',
      kfphone:'',
    };
  },
  components: {
    Tops
  },
  mounted() {
    this.orderNo = this.$route.query.orderNo;
    this.active = this.$route.query.active;
    this.mcName = this.$route.query.mcName;
    this.onLoad()
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
  },
  methods: {
    //回退
    returns() {
    //  this.$router.push('/order/' + this.active);
      this.$router.go('-1');
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
      this.$http({
        method: "post",
        url: '/minle/mall/order/queryOrderNo',
        data: this.$qs.stringify({orderNo: this.orderNo}),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res.data.data);
        this.data = res.data.data;
        this.kfphone = 'tel:' + res.data.data.phone;
        this.statusList(res.data.data.expressCom, res.data.data.expressBarcode, res.data.data.phone)
      });
    },
    // 获取快递的状态
    statusList(com, barcode, telephone) {
      if(com==null || barcode==null){
        this.addressTips = '暂无快递物流信息，请尽快安排订单发货，以免顾客久等'
      }else{
        this.$http({
          method: "get",
          url: '/common/express/display',
          params: {
            com:com==null?'':com,
            barcode:barcode==null?'':barcode,
            telephone
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => {
          if (res.data.returnCode == 'ERR_0000') {
            this.addressData = res.data.data
          } else if (res.data.returnCode == 'ERR_0005') {
            this.addressTips = '暂无快递物流信息，请联系咨询客服400-833-7998'
          }
        });
      }
    },
    goNext () {
      let address = this.data.provinces+ this.data.city + this.data.county+ this.data.detailAddress
      this.$router.push( `/orderStatus?expressCom=${this.data.expressCom}&expressBarcode=${this.data.expressBarcode}&phone=${this.data.phone}&address=${address}&expressComName=${this.data.expressComName}&deliveryTime=${this.data.deliveryTime}` )
    }
  }
}
