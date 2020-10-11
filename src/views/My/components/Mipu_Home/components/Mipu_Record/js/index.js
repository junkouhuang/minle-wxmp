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

export default {
  data() {
    return {
      active:1,
      pageNum:1,
      pageSize:10,
      pages:'',
      arr:[],
      finished:false,
      loading:false,
      mipuNo:'',
      immediate_check:false, //是否在初始化时立即执行滚动位置检查
      show:0
    };
  },
  methods: {
    /**
     * 箭头回退
     */
    returns() {
      this.$router.back(-1);
    },
    /**
     * 交易记录
     */
    record(){
      //传分页参数和米铺编号,显示收益记录
      //交易记录 传分页参数,显示消费记录,
      //1:收款记录  2:消费记录
      let arr = new Array();
      if(this.active == 1){
        arr = {pageNum: this.pageNum,pageSize:this.pageSize,mipuNo:this.mipuNo}
      }else{
        arr = {pageNum: this.pageNum,pageSize:this.pageSize}
      }
      this.$http({
        method: 'post',
        url: '/minle/mall/mipu/tradingRecord',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: this.$qs.stringify(arr)
      })
        .then(res => {
          this.$toast.clear();
          if (res.status == 200) {
            if(res.data.data.pages>0){
              this.pages = res.data.data.pages;
              this.show = 1;
              this.arr = this.arr.concat(res.data.data.list);
              this.pages = res.data.data.pages;
            }else{
              this.show = 2;
            }
          }
        }).catch(e => {
      })
    },
    /**
     * tab切换
     */
    change(e){
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.active = e;
      this.pageNum=1;
      this.finished = false;//true:沒有更多數據了
      this.loading = false;//将 loading 设置为 true，表示处于加载状态
      this.arr = [];
      this.record(this.mipuNo)
    },
    /**
     * 上拉加载更多
     */
    onLoad(){
      let that = this;
      // 异步更新数据
      setTimeout(() => {
        // 加载状态结束
        that.loading = false;
        // 数据全部加载完成
        that.pageNum = ++that.pageNum;
        if (that.pageNum > that.pages) {
          that.finished = true;
        } else {
          that.record();
        }
      }, 2000);
    },

  },
  mounted() {
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    this.mipuNo = this.$route.query.mipuNo;
    this.record();
  },
  components: {
    Tops
  }
};
