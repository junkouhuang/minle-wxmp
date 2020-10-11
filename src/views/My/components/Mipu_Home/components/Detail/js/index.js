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
     * 交易记录
     */
    recode(){
      this.$router.push({'path': '/my/mipu_record', query: {'mipuNo': this.mipuNo}})
    },
    /**
     * 编辑信息
     */
    editor(){
      this.$router.push({'path': '/my/mipu_home/editorInfo', query: {'list': this.list}})
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
    /**
     *
     点击【我的米铺】有三个状态：
     0:等待审核  1:通过审核   2:审核失败  false:开通店铺（自定义）
     */
    show(){
      this.$http({
        method: 'post',
        url: '/minle/mall/mipu/show',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          if(res.data.data!=null){
            if(res.data.data.applyStatus == 1){
              //跳转到自己的米铺详情
              let dat =  res.data.data;
              let arr = new Array();
              arr = dat.applyMipuPictures.split(',');
              dat.applyMipuPictures = arr;
              let tag = new Array();
              tag = dat.applyMipuTags.split(',');
              dat.applyMipuTags = tag;
              this.list = dat;
              this.banner = dat.applyMipuPictures;
              this.mipuNo = dat.mipuNo;
            }
          }
        }).catch(e => {
      })
    },
  },
  mounted() {
    this.show();
  },
  components: {
    Tops
  }
};
