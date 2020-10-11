import Tops from "@/components/Top";

export default {
  name: "orderconfirm",
  data() {
    return {
      state: true,
      message: '',
      username: '',//联系人
      phone: '',
      address: '',
      showList: true,
      commodityNoList: [],
      commodityNo:[],//商品编号
      orderconfirmdata: [],
      total: 0,//总计
      orderNo: [],//訂單編號
      openid: '',//openid
      provinces: '',//省份
      city: '', //城市
      county: '', //县
      detail: '',//详细地址
      mili: 0,
      showPopup1: false,
      showPopup2: false,
      userml: '0',
      userwallet: '0',
      msg1: '暂无可用',
      msg2: '暂无可用',
      addressLists: [],
      moren: true,
      loading:false,
      newUser:1, //0:新用户  1:老用户
      flag:true, //true 免单用户，false非免单用户
      luckywheel:true,
      num:0,
      scode:'',
      wallet:0,
      center:true,//true开通vip
      you:true,
      morePays:false, //更多支付方式

      commoditySpecification:[],
      mipuNo:'',
      xdtNo:'',
      valueList:'',
      cartNos:[],//购物车编号

      realamount:0,//总共购买的数量
      needPay:0,//应付款
      realPay:0,
      deductionPay:0,
      openmipu:false,//是否開通米铺
      openxdt:false,
      opcode: '',
    }
  },
  components: {
    Tops
  },
  methods: {
    //回退
    returns() {
      this.$router.go(-1)
    },
    finsh1() {
      if (this.userml == '') {
        this.$toast('请选择支付方式')
      } else {
        if (this.userml == '0') {
          this.msg1 = '未使用白米抵扣'
          this.deductionPay = 0;
          this.realPay = this.needPay;
        } else {
          this.msg1 = '立减 -￥' + (this.mili >= this.needPay ? this.needPay : this.mili);
          this.deductionPay = this.mili >= this.needPay ? this.needPay : this.mili;
          this.realPay = this.needPay - this.deductionPay;
          this.msg2="白米不可用"
        }
        this.showPopup1 = !this.showPopup1;
      }
    },
    finsh2() {
      if (this.userwallet == '') {
        this.$toast('请选择支付方式')
      } else {
        if (this.userwallet == '0') {
          this.msg2 = '未使用钱包'
          this.deductionPay = 0;
          this.realPay = this.needPay;
        } else {
          this.msg2 = '立减 -￥' + (this.wallet >= this.needPay ? this.needPay : this.wallet);
          this.deductionPay = this.wallet >= this.needPay ? this.needPay : this.wallet;
          this.realPay = this.needPay - this.deductionPay;
          this.msg1="钱包不可用"
        }
        this.showPopup2 = !this.showPopup2;
      }
    },
    choose1() {
      if(this.newUser!=0 &&  this.userwallet==0 &&  this.mili>0){
        this.showPopup1 = !this.showPopup1;
        this.total = this.needPay;
      }
    },
    //true 免单用户，false非免单用户
    choose2() {
      if(this.newUser!=0  && this.userml==0 && this.wallet>0){
        this.showPopup2 = !this.showPopup2;
        this.total = this.needPay;
      }
    },
    //跳转地址
    toadress() {
      this.$router.push({'path': '/address', query: {'source': 'orderconfirm'}})
    },
    //确认订单
    orderdata() {
      let total = 0;
      for (let index in this.orderconfirmdata) {
        total += this.orderconfirmdata[index].price;
        //派送区新用户享受免单
        if(this.orderconfirmdata[index].commodityTagId !=3){
          this.flag = false;
        }
        if(this.orderconfirmdata[index].commodityTagId ==3){
          this.num = this.num+1;
        }
        if(this.orderconfirmdata[index].commodityTagId !=2){
          this.luckywheel = false;
        }
        // 权益不能使用白米支付
        if(this.orderconfirmdata[index].commodityNo=='58209736471350') {
          this.you =  false;
        }
        if(this.orderconfirmdata[index].commodityNo=='58209736478511') {
          this.you =  false;
        }
        if(this.orderconfirmdata[index].commodityNo=='58209736478512') {
          this.you =  false;
        }
        if(this.orderconfirmdata[index].commodityNo=='58209736478513') {
          this.you =  false;
        }
        if(this.orderconfirmdata[index].commodityNo=='58209736478514') {
          this.you =  false;
        }
        if(this.orderconfirmdata[index].commodityNo=='58209736479000') {
          this.you =  false;
        }
        if(this.orderconfirmdata[index].commodityNo=='58209736479001') {
          this.you =  false;
        }
        if(this.orderconfirmdata[index].commodityNo=='58209736479002') {
          this.you =  false;
        }
        if(this.orderconfirmdata[index].commodityNo=='58209736479003') {
          this.you =  false;
        }
        if(this.orderconfirmdata[index].commodityNo=='58209736479004') {
          this.you =  false;
        }
        if(this.orderconfirmdata[index].commodityNo=='58209736479005') {
          this.you =  false;
        }
        if(this.orderconfirmdata[index].commodityNo=='58209736479006') {
          this.you =  false;
        }
        if(this.orderconfirmdata[index].commodityNo=='58209736479520') {
          this.you =  false;
        }
        if(this.orderconfirmdata[index].commodityNo=='58209736479521') {
          this.you =  false;
        }

      }
      this.total = total;
      this.subtotal = total;
    },
    //立即支付
    onSubmit() {
      if (!this.openxdt) {
        if (this.username == '' || this.phone == "" || this.address == "") {
          this.$toast('请选择或完善联系收货地址');
          return false;
        }
      }
      if(this.newUser==0 && this.num>1){
        this.$toast("免单仅限单件派送商品");
        return false;
      }
      this.loading = true;
      this.$http({
        method: 'post',
        url: '/minle/mall/order/submitOrder',
        data: {
          "commoditySpecification":this.commoditySpecification,
          "consigneeName": this.username,
          "commodityNo": this.commodityNo,
          "phone": this.phone,
          "provinces": this.provinces,
          "city": this.city,
          "county": this.county,
          "detailAddress": this.detail,
          "deduction": this.newUser ==0 && this.flag?2:this.userml == 1 ? 1:this.userwallet == 1?3: this.userml == 0 || this.userwallet == 0 ?0:'', //0 没有抵扣，1米粒,2 首单免单3.钱包抵扣
          "scode":this.scode,
          "mipuNo":this.mipuNo,
          orderType:this.$route.query.type==1?5:''

        }
      })
      .then(res => {
        this.loading = false;
        if (res.data.returnCode == "ERR_0000") {
          this.orderNo = res.data.data;
          this.pay(this.orderNo, this.newUser ==0 && this.flag?0:this.realPay.toFixed(2));

        }
      }).catch(e => {

      })
    },
    //地址管理
    addressList() {
      this.$router.push('/myAdd'); //地址列表
    },
    //返回
    goback() {
      this.$router.go(-1)
    },
    //默认地址
    getMoren() {
      this.$http({
        method: 'post',
        url: '/minle/user/address/default',
        data: {}
      })
        .then(res => {
          if (res.status == 200) {
            this.username = res.data.data.receiverName;
            this.phone = res.data.data.receiverTelephone;
            this.address = res.data.data.provinceName + res.data.data.cityName + res.data.data.regionName + res.data.data.address;
            this.provinces = res.data.data.provinceName;
            this.city = res.data.data.cityName;
            this.county = res.data.data.regionName;
            this.detail = res.data.data.address;
            this.$store.state.addressDefault = res.data.data;
          }
        }).catch(e => {

      })
    },
    //支付（wechat)
    pay(orderNo, realPay) {
      let data = {
        orderNO: orderNo,
        totalPrice: this.realPay,
        opcode: this.opcode,
      };
      this.$http({
        method: 'post',
        url: this.$url.pay,
        data: this.$qs.stringify(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          if (res.status == 200) {
            if (realPay == 0) { //免單支付根據實際支付為0元來判斷
              //购买成功之后需要做的事...
              if(this.openmipu){
                this.$router.push({path: '/my/mipu_home/new/index'});
              }else {
                if (this.openxdt) {
                  this.$router.push({path: '/my/xinditan/Audit'})
                } else {
                  this.$router.push({path: '/order', query: {status: 2}});
                }
              }
            } else {
                WeixinJSBridge.invoke("getBrandWCPayRequest", res.data.data, res => {
                 /* if(this.center){
                    this.$router.push({path: '/my'});
                  }*/
                  if (res.err_msg == "get_brand_wcpay_request:ok") {
                    //购买成功之后需要做的事...
                    if(this.luckywheel){
                      if(this.openmipu){
                        this.$router.push({path: '/my/mipu_home/new/index'});
                      }else{
                        if (this.openxdt) {
                          this.$router.push({path: '/my/xinditan/Audit'})
                        } else {
                          this.$router.push({path: '/luckywheel', query: {orderNo: orderNo}});
                        }
                      }
                    }else{
                      if(this.openmipu){
                        this.$router.push({path: '/my/mipu_home/new/index'});
                      }else {
                        if (this.openxdt) {
                          this.$router.push({path: '/my/xinditan/Audit'})
                        } else {
                          this.$router.push({path: '/order', query: {status: 2}});
                        }
                      }
                    }
                  } else {
                    if(!this.openmipu){
                      if (this.openxdt) {
                        this.$router.push({path: '/my/xinditan/Audit'})
                      } else {
                        this.$router.push({path: '/order', query: {status: 1}});
                      }
                    }
                  }
                });

            }
          }
        }).catch(e => {

      })
    },
    //获取mili，新用户
    getmili() {
      this.$http({
        method: 'post',
        url: '/minle/mall/cart/queryIntegral',
        data: {}
      })
        .then(res => {
          if (res.status == 200) {
            //this.mili = res.data.data.integral;
            this.newUser = res.data.data.freeChange;
            this.wallet = res.data.data.wallet;
          }
        }).catch(e => {

      })
    },
    //更多支付方式
    morePay(){
      this.morePays =true;
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
           this.onSubmit()
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
  },
  mounted() {
    this.getmili();
    this.orderconfirmdata = JSON.parse(this.$route.query.orderconfirmdata);
    //console.log(this.orderconfirmdata);
    if(this.orderconfirmdata.length>0){
      for(let i in this.orderconfirmdata){
        this.mili = this.orderconfirmdata[i].canDeduct;
        this.realamount += this.orderconfirmdata[i].amount;
        this.needPay += this.orderconfirmdata[i].amount * this.orderconfirmdata[i].price;
        this.commodityNo.push(this.orderconfirmdata[i].commodityNo);

        this.commoditySpecification.push({
          "commodityNo": this.orderconfirmdata[i].commodityNo,
          "specificationId": this.orderconfirmdata[i].specificationId,
          "amount": this.orderconfirmdata[i].amount
        });
      }
    }

    this.realPay = this.needPay;

    this.openmipu = this.$route.query.openmipu;
    this.mipuNo = this.$route.query.mipuNo;

    this.openxdt = this.$route.query.openxdt;

    if(this.$route.query.commoditySpecification){

      this.commoditySpecification=this.$route.query.commoditySpecification;
    }

    if (this.$store.getters.getLoaddefault) {
      this.getMoren();
      if(this.$store.getters.getCommodityNoList.length>1){
        this.commodityNoList=this.$store.getters.getCommodityNoList;
      }else{
        this.commodityNoList.push(this.$store.getters.getCommodityNoList[0]);
      }
    } else {
      if(this.$store.getters.getAddressDefalut != "") {
        this.username = this.$store.getters.getAddressDefalut.receiverName;
        this.phone = this.$store.getters.getAddressDefalut.receiverTelephone;
        this.provinces = this.$store.getters.getAddressDefalut.provinceName;
        this.city = this.$store.getters.getAddressDefalut.cityName;
        this.county = this.$store.getters.getAddressDefalut.regionName;
        this.address = this.$store.getters.getAddressDefalut.provinceName + this.$store.getters.getAddressDefalut.cityName + this.$store.getters.getAddressDefalut.regionName + this.$store.getters.getAddressDefalut.address;
        this.detail = this.$store.getters.getAddressDefalut.address;
      }
    }

    this.orderdata();

    this.scode =sessionStorage.getItem('scode') ==null || sessionStorage.getItem('scode') ==undefined?'':sessionStorage.getItem('scode');
    this.center =sessionStorage.getItem('center') ==null || sessionStorage.getItem('center') ==undefined?true:false;


  },
}
