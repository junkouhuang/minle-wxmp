import Tops from "@/components/Top";
var Base64 = require('js-base64').Base64;
export default {
  name: "share",
  data() {
    return {
      commodityNo: '',
      bannerPicture: '',
      price:0,
      name:'',
      scode:'',
      code:'',
      appId:'',
      timestamp:'',
      nonceStr:'',
      signature:'',
      isshow:0
    }
  },
  components: {Tops},
  methods: {
    //箭头回退
    returns(){
      this.$router.go(-1);
    },
    //详情接口
    getDetailt() {
      let arr = {commodityNo: this.commodityNo}
      this.$http({
        method: 'post',
        url: '/minle/mall/commodity/preview',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: this.$qs.stringify(arr)
      })
        .then(res => {
          if (res.status == 200) {
            this.bannerPicture = res.data.data.bannerPicture;
            this.price = res.data.data.price;
            this.name = res.data.data.name;
            this.wxInit();
          }
        }).catch(e => {
      })
    },
    //自定义分享模板
    wxInit() {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
        appId: this.appId, // 必填，公众号的唯一标识
        timestamp: this.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.nonceStr, // 必填，生成签名的随机串
        signature: this.signature,// 必填，签名，见附录1
        jsApiList: [
          "updateAppMessageShareData",//自定义“分享给朋友”及“分享到QQ”按钮的分享内容
          "updateTimelineShareData",//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
        ]
      });
      sessionStorage.setItem('share_name',this.name);
      sessionStorage.setItem('share_img',this.bannerPicture);
      wx.ready(function (name1) {
        wx.updateAppMessageShareData({
          title: sessionStorage.getItem('share_name'), // 分享标题
          desc: sessionStorage.getItem('share_name'), // 分享描述
          link: 'https://minle.xinquanjk.com/minlewxmp/?#'+location.href.split('#')[1].split('&isshow')[0]+'&isshow=1', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: sessionStorage.getItem('share_img'), // 分享图标
          success: () => {

          },
          cancel: function() {
            // 用户取消分享后执行的回调函数

          }
        })
        wx.updateTimelineShareData({
          title: sessionStorage.getItem('share_name'), // 分享标题
          desc: sessionStorage.getItem('share_name'), // 分享描述
          link:  'https://minle.xinquanjk.com/minlewxmp/?#'+location.href.split('#')[1].split('&isshow')[0]+'&isshow=1', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl:  sessionStorage.getItem('share_img'), // 分享图标(不能赋相对路径，一定要是绝对路径)
          success: () => {

          },
          cancel: function() {
            // 用户取消分享后执行的回调函数

          }
        })
      })
    },
    //立即购买
    buynow() {
      let commodityNoList = [];
      commodityNoList.push(this.commodityNo)
      sessionStorage.N0 = JSON.stringify(commodityNoList);
      this.$router.push({'path': '/orderconfirm', query: {commodityNo: commodityNoList}}) //this.$route.query.commodityNo
      this.$store.state.loaddefault = true;
      this.$store.state.commodityNoList = commodityNoList;
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r !== null) return r[2]
      return null
    }
  },
  mounted() {
   this.isshow = this.$route.query.isshow;
   this.commodityNo = this.$route.query.commodityNo;
   this.appId= this.$route.query.appId;
   this.timestamp= this.$route.query.timestamp;
   this.nonceStr= this.$route.query.nonceStr;
   this.signature= this.$route.query.signature;
   this.getDetailt();
   sessionStorage.setItem('scode',decodeURIComponent(location.href.split('#')[1].split('scode=')[1].split('&code')[0]));
   sessionStorage.setItem('code',decodeURIComponent(location.href.split('#')[1].split('&code=')[1].split('&appId')[0]));
   sessionStorage.setItem("isshow",this.$route.query.isshow)
    sessionStorage.setItem("shareurl",location.href);
   console.log(location.href)

  },
}





