import Tops from "@/components/Top";

export default {
  data() {
    return {
      data: "",
      orderNo: '',
      active: '',
      addressData: [], // 地址
      addressTips: '',
      opcode: '',
    };
  },
  components: {
    Tops
  },
  mounted() {
    this.orderNo = this.$route.query.orderNo;
    this.active = this.$route.query.active;
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
    zf() {
      let data = {
        orderNO: this.data.orderNo,
        totalPrice: this.data.realpay,
        opcode: this.opcode
      };

      this.$http({
        method: "post",
        url: this.$url.wxpay,

        data: this.$qs.stringify(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (data.totalPrice > 0) {
          WeixinJSBridge.invoke("getBrandWCPayRequest", res.data.data, ret => {
            if (ret.err_msg == "get_brand_wcpay_request:ok") {
              //购买成功之后需要做的事...
              this.$toast.success('购买成功');
            } //
          });
        }
      });
    },
    //确定收货
    sh() {
      this.$dialog
        .confirm({
          confirmButtonColor: '#FF5555',
          message: "确认收货，完成订单交易？"
        })
        .then(() => {
          this.$http({
            method: "post",
            url: '/minle/mall/order/confirmReceipt',
            data: this.$qs.stringify({orderNo: this.data.orderNo}),
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(res => {
            this.list.splice(index, 1)
          });
        })
        .catch(() => {
        });
    },
    //取消订单
    xq() {
      this.$dialog
        .confirm({
          confirmButtonColor: '#FF5555',
          message: "确认取消该订单，支付金额原路退回？"
        })
        .then(() => {
          this.$toast.loading({
            message: '取消中...',
            forbidClick: true
          });
          this.$http({
            method: "post",
            url: this.$url.deletOrder,
            data: this.$qs.stringify({orderNo: this.data.orderNo}),
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(res => {
            if (res.data.returnCode == "ERR_0000") {
              this.$toast.success('已取消');
              if(this.active == 1){
                this.list.splice(index, 1)
              }else{
                this.list = [];
                this.getdata();
              }

            }
          });
        })
        .catch(() => {
          // on cancel
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

        this.statusList(res.data.data.expressCom, res.data.data.expressBarcode, res.data.data.phone)
      });
    },
    // 获取快递的状态
    statusList(com, barcode, telephone) {
      if(com==null || barcode==null){
        this.addressTips = '暂未查询到快递物流信息，详情联系客服电话'
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
            this.addressTips = '暂未查询到快递物流信息，详情联系客服电话'
          }
        });
      }
    },
    goNext () {
      let address = this.data.provinces+ this.data.city + this.data.county+ this.data.detailAddress
      this.$router.push( `/orderStatus?expressCom=${this.data.expressCom}&expressBarcode=${this.data.expressBarcode}&phone=${this.data.phone}&address=${address}&expressComName=${this.data.expressComName}&deliveryTime=${this.data.deliveryTime}` )
    },
    validate(){
      let formData = new FormData();
      formData.append('source', 'kx6HIOFE5xtaK85g3JXfg3Nx0q6lZK3mGOxMzBGGCALOLUbvFPjowQ==');
      this.$http({
        method: 'post',
        url: '/authorizes/user/wx/validate',
        data: formData
      })
      .then(res => {
        if (res.data.returnCode == 'ERR_0000') {
          this.opcode = res.data.data
          this.zf()
        } else if (res.data.returnCode == 'ERR_0005') {
           sessionStorage.setItem('callbacks', window.location.href);
           window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd2e08a066f9a7f0c&redirect_uri=https://uat.xinquanjk.com/minlewxmp/payment.html&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect"
        }
      }).catch(e => {
        // do-nothing.
      })
    },
    //获取微信用户信息
    getUserInfo() {
       let formData = new FormData();
        formData.append('source', 'kx6HIOFE5xtaK85g3JXfg3Nx0q6lZK3mGOxMzBGGCALOLUbvFPjowQ==');
        this.$http({
          method: 'post',
          url: '/authorizes/user/wx/validate',
          data: formData
        })
        .then(res => {
          if (res.data.returnCode == 'ERR_0005') {
            let access_token = sessionStorage.getItem('access_token');
            let openid = sessionStorage.getItem('openid');
            if (openid == null || openid == '' || openid == undefined) {
              return;
            }
            this.$http({
              method: 'get',
              url: this.$url.wxuserinfo + "?token=" + access_token + "&openid=" + openid,
              data: {}
            })
            .then(res => {
              if (res.data.returnCode == 'ERR_0000') {
                let formData = new FormData();
                formData.append('source', 'kx6HIOFE5xtaK85g3JXfg3Nx0q6lZK3mGOxMzBGGCALOLUbvFPjowQ==');
                formData.append('openid', JSON.parse(res.data.data).openid)
                formData.append('nickname', JSON.parse(res.data.data).nickname)
                formData.append('avatar', JSON.parse(res.data.data).headimgurl)
                formData.append('sex', JSON.parse(res.data.data).sex == undefined ? 1 : JSON.parse(res.data.data).sex)
                if (JSON.parse(res.data.data).openid == '' || JSON.parse(res.data.data).openid == null || JSON.parse(res.data.data).openid == undefined || JSON.parse(res.data.data).openid == 'undefined') {
                  return false;
                }
                this.$http({
                  method: 'post',
                  url: '/authorizes/user/wx/upgrade',
                  data: formData
                })
                .then(res => {
                  if (res.data.returnCode == 'ERR_0000') {
                    this.opcode = JSON.parse(res.data.data).openid
                  }
                }).catch(e => {
                  // do-nothing.
                })

              }
            }).catch(e => {

            })
          } else if(res.data.returnCode == 'ERR_0000') {
            this.opcode = res.data.data;
          }
        }).catch(e => {
          // do-nothing.
        })
    }

  },
  created() {
    this.getUserInfo()
  }
}
