export default {
  name: "my",
  data() {
    return {
      userinfo: "",
      item: [
        {
          icon: require("../icon/waitpay2x.png"),
          text: "待付款",
          num: 0,
          status: 1,
        },
        {
          icon: require("../icon/waitdelivery2x.png"),
          text: "待发货",
          num: 0,
          status: 2,
        },
        {
          icon: require("../icon/waitreceiver2x.png"),
          text: "待收货",
          num: 0,
          status: 3,
        },
        {
          icon: require("../icon/refundHuo2x.png"),
          text: "退款/换货",
          num: 0,
          status: 4,
        }
      ],
      my0: [/*
        {
          icon:require("../icon/gang.png"),
          text: "米米缸",
          path: "/my/migang"
        },
        {
          icon:require("../icon/fuli2x.png"),
          text: "分享福利",
          path: "/my/commissionSettlement"
        },
        {
          icon:require("../icon/z.png"),
          text: "会员管理",
          path: "/my/myvip"
        },
        {
          icon:require("../icon/proxyapply2x.png"),
          text: "代理申请",
          path: "/my/dlapplay"
        },
        {
          icon:require("../icon/bankcode2x.png"),
          text: "银行卡",
          path: "/my/card"
        },*/
        ],
      my1: [
/*        {
          icon:require("../icon/m01.png"),
          text: "分享二维码",
          path: "/qrCODE"
        },*/
        {
          icon:require("../icon/car2x.png"),
          text: "购物车",
          path: "/car"
        },
        {
          icon:require("../icon/store2x.png"),
          text: "收藏商品",
          path: "/follow"
        },
        {
          icon:require("../icon/footer2x.png"),
          text: "我的足迹",
          path: "/footprint"
        },
        {
          icon:require("../icon/address2x.png"),
          text: "收货地址",
          path: "/address"
        },/*
        {
          icon:require("../icon/setting22x.png"),
          text: "设置",
          path: "/my/set"
        },*/
      ],
      username: '',//账号名
      qrcodeImg:''
    }
  },
  methods: {
    /**
     *
     点击【我的米铺】有三个状态：
     0:等待审核  1:通过审核   2:审核失败  false:开通店铺（自定义）
     */
    verification(){
      this.$http({
        method: 'post',
        url: '/minle/mall/mipu/show',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          //this.$router.push( '/my/mipu_open/fllow')
          if(res.data.data){
            if(res.data.data.list.length>0){
              this.$router.push('/my/mipu_home/new/index');
            }
          }else{
            //跳转开通流程
            this.$router.push( '/my/mipu_open/fllow')
          }
        }).catch(e => {

      })
    },
    /**
     * 米铺
     */
    mipu(){
      this.verification();
    },
    //分享二维码
    qrcode(){
      let flag = this.userinfo.level!==1 && this.userinfo.level!==2 && this.userinfo.level!==3 && this.userinfo.level!==4;
      if(flag){
        this.$dialog.confirm({
          title: '',
          message: '您尚未开通VIP无法分享二维码，快去开通会员获取更多粉丝吧。',
          confirmButtonText:'开通会员（VIP）',
          cancelButtonText:'取消',
          confirmButtonColor: '#FF5555',
        }).then(() => {
          this.$router.push('/my/myvip/open');
        }).catch(() => {
        });
      }else{
        this.code();
      }
    },
    code(){
      this.$http({
        method: 'post',
        url:'/authorizes/user/code',
        data: this.$qs.stringify({
          source: "kx6HIOFE5xtaK85g3JXfg3Nx0q6lZK3mGOxMzBGGCALOLUbvFPjowQ=="
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == "ERR_0021") {
              this.qrcode();
              //this.$router.push('/my/myvip/open');
            } else if (res.data.returnCode == "ERR_0000") {
              //localStorage.setItem('qrcodeImg', res.data.data)
              this.share(res.data.data);
            }
          }
        }).catch(e => {

      })
    },
    //订单详情
    xqmFun() {
      this.$router.push('/my/mili')
    },
    prizelist(){
      this.$router.push('/my/prizelist')
    },
    fansList() {
      this.$router.push('/my/myvip')
    },
    //开通vip会员
    openvip(){
      this.$router.push('/my/myvip/open');
      //this.$router.push('/my/mymichu/activate');
      sessionStorage.setItem('center',false)
    },
    //退出登录
    loginout() {
      this.$dialog.confirm({
        title: '',
        message: '您是否确定退出系统'
      }).then(() => {
        this.$http({
          method: 'delete',
          url: this.$url.loginout + '?access_token=' + localStorage.getItem('token'),
          data: {}
        })
          .then(res => {
            if (res.status == 200) {
              this.$router.push('/home');
              localStorage.removeItem('token');
              sessionStorage.removeItem('isshow');
            }
          }).catch(e => {

        })
      }).catch(() => {
      });
    },
    //订单切换
    orderHandle(status) {
      if (status == 4) {
        this.$router.push({"path": "/replacement", query: {status: 5}});
      } else {
        this.$router.push({"path": "/order", query: {status: status}});
      }
    },
    myClick(type){
      if(type == "/qrCODE"){
        this.code();
      }else if(type == "/my/myvip"){
        this.$router.push({
          path: '/my/myvip',
          query: {status:0}
        })
      }else{
        this.$router.push({
          path: type
        })
      }
    },
    //分享
    share(qrcode){
      let url = encodeURIComponent(location.href.split('#')[0]); //获取锚点之前的链接
      this.$http({
        method: 'get',
        url: '/common/wxmp/minle/share?url='+url,
      })
        .then(res => {
          if (res.status == 200) {
            this.$router.push({
              path: '/qrCODE',
              query: {
                qrcode:qrcode,
                commodityNo:this.commodityNo,
                appId:res.data.data.appId,
                timestamp:res.data.data.timestamp,
                nonceStr:res.data.data.nonceStr,
                signature:res.data.data.signature,
                isshow:0
              }
            })

          }
        }).catch(e => {

      })
    },
    //获取用户
    getuserinfo() {
      this.$http({
        method: 'post',
        url: '/authorizes/user/detail',
        data: this.$qs.stringify({
          source: "kx6HIOFE5xtaK85g3JXfg3Nx0q6lZK3mGOxMzBGGCALOLUbvFPjowQ=="
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          if (res.status == 200) {
            this.userinfo = res.data.data;
          }
        }).catch(e => {

      })
    },
    //或取订单
    getdata(status) {
      this.loading = true;
      this.$http({
        url: this.$url.userOrder,
        method: "post",
        data: {
          status: status === 1 ? 0 : status === 2 ? 1 : status === 3 ? 2 : 5
        }
      }).then(res => {
        if (res.data.returnCode == "ERR_0000") {
          for (let i in this.item) {

            if (status === this.item[i].status) {
              this.item[i].num = res.data.data.total;
            }
          }
        }
      });
    },
    //钱包明细
    walletFun() {
      this.$router.push({
        path: '/my/wallet',
        query: {'totalamount': this.userinfo.wallet == null || this.userinfo.wallet == undefined || this.userinfo.wallet == '' ? 0 : this.userinfo.wallet}
      })
    },
    navHandle(path){
      this.$router.push(path);
    },
    myvip(){
      this.$router.push({path:"/my/myvip", query: {status:0}});
    }
  },
  //获取登录用户名
  created() {
    this.getdata(1);
    this.getdata(2);
    this.getdata(3);
    this.getdata(5);
    this.getuserinfo();
  }
}

import Vue from 'vue'

Vue.filter('money', function(val) {
  val = val.toString().replace(/\$|\,/g,'');
  if(isNaN(val)) {
    val = "0";
  }
  let sign = (val == (val = Math.abs(val)));
  val = Math.floor(val*100+0.50000000001);
  let cents = val%100;
  val = Math.floor(val/100).toString();
  if(cents<10) {
    cents = "0" + cents
  }
  for (var i = 0; i < Math.floor((val.length-(1+i))/3); i++) {
    val = val.substring(0,val.length-(4*i+3))+',' + val.substring(val.length-(4*i+3));
  }

  return (((sign)?'':'-') + val + '.' + cents);
})
