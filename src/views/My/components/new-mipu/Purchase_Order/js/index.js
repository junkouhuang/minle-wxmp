import Tops from "@/components/Top";

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      total: 0,
      pageNum: 1,
      pageSize: 7,
      status:0,
      active:0, //订单态状 0-待支付 1-待发货(已付款) 2-待收货(已发货) 3-确认收货(已完成) 4-订单取消 5-申请退换货 6-同意退换货 7-拒绝退换货

      luckywheel:true,
      opcode: '',
    };
  },
  methods: {
    //箭头回退
    returns() {
      this.$router.push({path:'/my/mipu_home/new/mipu_details',query:{mipuNo:this.$route.query.mipuNo}});
    },
    //当前激活的标签改变时触发
    tabChange(index) {
      this.list = [];
      this.pageNum = 1;
      this.finished = false;
      this.loading = false;
      this.status = index;
      this.active = index;
      this.getdata();
      this.$router.push({"path": "/my/mipu_home/new/purchase_order/index", query: {status: index,mipuNo:this.$route.query.mipuNo}});
    },
    //订单详情
    detail(item) {
      this.$router.push({path: '/orderDetail', query: {orderNo: item.orderNo, active: item.status}});
    },
    //加载更多
    onLoad() {
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;
        if (this.list.length >= this.total) {
          this.finished = true;
        } else {
          this.pageNum += 1;
          this.getdata();
        }
      },500)
    },
    //确定收货
    confirmsh(item, index) {
      this.$dialog
        .confirm({
          confirmButtonColor: '#FF5555',
          message: "确认收货，完成订单交易？"
        })
        .then(() => {
          this.$http({
            method: "post",
            url: '/minle/mall/order/confirmReceipt',
            data: this.$qs.stringify({orderNo: item.orderNo}),
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
    cancel(item, index) {
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
            data: this.$qs.stringify({orderNo: item.orderNo}),
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
    //支付
    pay(item) {
      let data = {
        orderNO: item.orderNo,
        totalPrice: item.realpay,
        opcode: this.opcode
      };
      for(let x  of item.orderDetailDO){
        if(x.commodity_type!=2){
          this.luckywheel = false;
        }
      }
      this.$http({
        method: "post",
        url: this.$url.wxpay,
        data: this.$qs.stringify(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        WeixinJSBridge.invoke("getBrandWCPayRequest", res.data.data, res => {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            //购买成功之后需要做的事...
            if(this.luckywheel){
              this.$router.push({path: '/luckywheel', query: {orderNo: item.orderNo}});
            }else{
              this.active = 2;
              this.status = 2;
              this.getdata();
            }
          }
        });
      });
    },
    //获取列表数据
    getdata() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.$http({
        url: this.$url.queryUserOrderWholesaleMarket,
        method: "post",
        data: {
          status: this.status == 4 ? 4 : this.status == 0 ? "" : this.status - 1,
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }
      }).then(res => {
        this.$toast.clear();
        if (res.data.returnCode == "ERR_0000") {
          this.list = this.list.concat(res.data.data.list);
          this.total = res.data.data.total;
        }
      });
    },
    //删除订单
    deletes(item, index) {
      this.$dialog
        .confirm({
          confirmButtonColor: '#FF5555',
          message: "确认删除订单，数据不可恢复？"
        })
        .then(() => {
          this.$http({
            method: "post",
            url: '/minle/mall/order/pseudoDelete',
            data: this.$qs.stringify({orderNo: item.orderNo}),
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(res => {
            if (res.data.returnCode == "ERR_0000") {
              this.$toast.success('订单删除成功');
              this.list.splice(index, 1)
            }
          });
        })
        .catch(() => {
        });
    },
    validate(item){
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
           this.pay(item)
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
  created(){
    this.getUserInfo()
  },
  mounted() {
    this.status = this.$route.query.status;
    this.active = this.$route.query.status;
    this.getdata();
  },
  components: {
    Tops
  }
};
