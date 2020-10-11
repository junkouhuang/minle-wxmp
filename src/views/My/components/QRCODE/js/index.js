import Tops from "@/components/Top";

export default {
  data() {
    return {
      qrcodeImg:'',
      img: "",
      isshow:0,
      appId:'',
      timestamp:'',
      nonceStr:'',
      signature:'',
    }
  },
  components: {
    Tops
  },
  mounted() {
    //this.barcode();
    /*
    if(localStorage.getItem('qrcodeImg')!=undefined){
      this.qrcodeImg = localStorage.getItem('qrcodeImg');
    }else{
      this.qrcodeImg = decodeURIComponent(location.href.split('&qrcodeImg=')[1]);
    }*/
    this.qrcodeImg = this.$route.query.qrcode;
    this.isshow = this.$route.query.isshow;
    this.appId= this.$route.query.appId;
    this.timestamp= this.$route.query.timestamp;
    this.nonceStr= this.$route.query.nonceStr;
    this.signature= this.$route.query.signature;
    this.wxInit();
  },
  methods: {
    //分享二维码
    returns(){
      this.$router.push({path:'/my'})
    },
    //获取二维码
    wxInit(res) {
      var _this = this;
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
      localStorage.setItem('barcodeimg',this.img)
      wx.ready(function (name1) {
        wx.updateAppMessageShareData({
          title: "分享二维码", // 分享标题
          desc: "分享注册有好礼，还在等什么，赶快行动吧~", // 分享描述
          link: 'https://uat.xinquanjk.com/minlewxmp/?#'+location.href.split('#')[1].split('&')[0]+"&isshow=1&qrcodeImg="+_this.qrcodeImg, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: localStorage.getItem('barcodeimg'), // 分享图标
          success: () => {

          },
          cancel: function() {
            // 用户取消分享后执行的回调函数

          }
        })
        wx.updateTimelineShareData({
          title: "分享二维码", // 分享标题
          desc: "分享注册有好礼，还在等什么，赶快行动吧~", // 分享描述
          link: 'https://uat.xinquanjk.com/minlewxmp/?#'+location.href.split('#')[1].split('&')[0]+"&isshow=1&qrcodeImg="+_this.qrcodeImg, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl:  localStorage.getItem('barcodeimg'), // 分享图标(不能赋相对路径，一定要是绝对路径)
          success: () => {

          },
          cancel: function() {
            // 用户取消分享后执行的回调函数

          }
        })
      })
    }
  }
};
