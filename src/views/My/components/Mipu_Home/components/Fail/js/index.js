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
  var t = Y + '年' + m + '月' + d + '日';
  return t;
})
export default {
  data() {
    return {
      list:[],
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
     * 重新上传图片
     */
    next(){
      this.$router.push('/my/mipu_open')
    },
    /**
     * 交易记录
     */
    recode(){
      this.$router.push({'path': '/my/mipu_record', query: {'mipuNo': this.mipuNo}})
    },
  },
  mounted() {
    this.list = this.$store.getters.getMipuList;
  },
  components: {
    Tops
  }
};
