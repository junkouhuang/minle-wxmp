import Tops from "@/components/Top";
import Vue from 'vue'
Vue.filter('formatDate',function(value){
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
})
export default {
  data() {
    return {
      list:[],
      mipuNo:'',
      totalAmount:"",
      showImagePreview:false, //是否显示图片预览
      imagePreviewChangeIndex:1,//图片预览下标
      startPosition:0, //图片预览起始位置
      banner: [],
      collage:false
    }
  },
  methods: {
    /**
     * 回退
     */
    returns() {
      this.$router.go('-1');
    },
    /**
     * 详情
     */
    detail(mipuNo){
      this.$http({
        method: 'post',
        url: '/minle/mall/mipu/showDetails',
        data:this.$qs.stringify({mipuNo:mipuNo}),
      })
        .then(res => {
          if(res.data.returnCode=="ERR_0000"){
            let dat = res.data.data;
            let arr = new Array();
            arr = dat.applyMipuPictures.split(',');
            dat.applyMipuPictures = arr;
            let tag = new Array();
            tag = dat.applyMipuTags.split(',');
            dat.applyMipuTags = tag;
            this.list = dat;
          }
        }).catch(e => {
      })
    },
    /**
     * 收藏
     */
    collageFun(){
      this.$http({
        method: 'post',
        url: '/minle/user/commodity/storeMipu',
        data:this.$qs.stringify({mipuNo:this.mipuNo}),
      })
        .then(res => {
          if(res.data.returnCode=="ERR_0000"){
            this.collageList(1);
          }
        }).catch(e => {
      })
    },
    /**
     * 收藏列表
     */
    collageList(type){
      this.$http({
        method: 'post',
        url: '/minle/user/commodity/validate',
        data:this.$qs.stringify({mipuNo:this.mipuNo}),
      })
        .then(res => {
          if(res.data){
            if(type==1){
            this.$toast("已收藏");
            }
          }
          this.collage = res.data;
        }).catch(e => {
      })
    },
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
          this.loading = false;
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
                this.$router.push('/my/mipu_record');
              }
            });
          }
        }).catch(e => {

      })
    },
    /**
     * 交易记录
     */
    recode(){
      this.$router.push({'path': '/my/mipu_record', query: {'mipuNo': this.mipuNo}})
    },
    /**
     * 米鋪圖片瀏覽
     */
    showImagePreviewHandle(){
      this.showImagePreview = true;
    },
    /**
     * 图片预览切换
     */
    imagePreviewChange(index){
      this.imagePreviewChangeIndex = index+1;
    },
  },
  mounted() {
    this.detail(this.$route.query.mipuNo);
    this.mipuNo = this.$route.query.mipuNo;
    this.collageList(2);
    this.banner = this.$store.getters.getMipuList;
  },
  components: {
    Tops
  }
};
