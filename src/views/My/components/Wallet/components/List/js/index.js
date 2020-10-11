import Tops from "@/components/Top";

export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 40,
      total: 0,
      list: [],
      loading: false,
      upFinished: false,
      showPopup: false,
      tip:'',
      active1:0,
      active2:0,
      lxList:['全部', '分享福利','钱包提现','购物奖励','钱包支付','钱包退款','米铺奖励','推广奖励'],
      ztList:['全部','冻结', '解冻'],
      showDate: false,
      showLx:false,
      showZt:false,
      type:'',//0:推广收益 1现金提现
      status:'',//0:冻结，1：解冻
      currentDate: new Date(),
      minDate:new Date(2000, 0, 1),
      startTime:'',
      lx:'',
      showData:false,
      navBarFixed:false,
    };
  },
  mounted() {
    //this.num = this.$route.query.num;
    // 事件监听滚动条
    window.addEventListener('scroll', this.watchScroll);
  },
  methods: {
    //箭头回退
    returns(){
      this.$router.go('-1');
    },
    //实现导航栏吸顶效果
    watchScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //  当滚动超过 366 时，实现吸顶效果
      if (scrollTop > 50) {
        this.navBarFixed = true
      } else {
        this.navBarFixed = false
      }
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }
      return value;
    },
    getTime(time){
      this.startTime = `${new Date(time).getFullYear()}${new Date(time).getMonth()+1>9?new Date(time).getMonth()+1:"0"+(new Date(time).getMonth()+1)}`;
     // this.startTime = `${new Date(time).getFullYear()}${new Date(time).getMonth()+1}`;
      this.showPopup = !this.showPopup;
      this.list = [];
      this.getList();
    },
    cancel(){
      this.showPopup = !this.showPopup;
    },
    choose(index){
      this.showPopup = !this.showPopup;
      if(this.lx == 'lx'){
        this.type = index;
        this.active1 = index;
      }else{
        this.status = index;
        this.active2 = index;
      }
      this.list = [];
      this.getList();
    },
    handle(type) {
      this.showPopup = !this.showPopup;
      this.lx = type;
      if(type == 'rq'){
        this.showData = true;
        this.showLx = false;
        this.showZt = false;
      }else if(type == 'lx'){
        this.showData = false;
        this.showLx = true;
        this.showZt = false;
        this.tip = '选择交易类型';
      }else if(type == 'zt'){
        this.showData = false;
        this.showLx = false;
        this.showZt = true;
        this.tip = '选择交易状态';
      }
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= this.total) {
          this.upFinished = true;
        }else{
          this.pageNum += this.pageNum;
          this.getList();
        }
      }, 500);
    },
    getList() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        type: this.type== 0?'': this.type==6 || this.type==7?this.type: this.type-1,
        status:this.status== 0?'':this.status-1,
        startTime:this.startTime
      }
      this.$http({
        method: 'post',
        url: '/minle/user/wallet/findWallet',
        data: this.$qs.stringify(data)
      })
        .then(res => {
          this.$toast.clear();
          if (res.status == 200) {
            if(res.data.data.list.length>0){
              this.list = this.list.concat(res.data.data.list);
              this.total = res.data.data.total;
            }else{
              this.list = [];
              this.total = 0;
            }
          }
        }).catch(e => {

      })
    }
  },
  components: {
    Tops
  },
  created() {
    this.getList()
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
  }
};
