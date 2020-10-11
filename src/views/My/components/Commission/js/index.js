import Tops from "@/components/Top";

export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 40,
      total:0,
      list: [],
      styleList: ['全部','购物奖励', '服务奖励','分享奖励','推广奖励'],
      ztList: ['全部','未结算', '已结算'],
      loading: false,
      finished: false,
      showPopup: false,
      showDate: false,
      showLx:false,
      showZt:false,
      active1:0,
      active2:0,
      type:'',  //1购物佣金 2推广佣金
      status:'', //0未结算 1已结算
      currentDate: new Date(),
      minDate:new Date(2000, 0, 1),
      startTime:'',
    };
  },
  methods: {
    //箭头回退
    returns(){
      this.$router.go('-1');
    },
    withdraw(orderNo,type,id){
      this.$router.push({path:'/my/withdraw',query:{orderNo:orderNo,type:type,id:id}})
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }
      return value;
    },
    handle(type) {
      this.showPopup = !this.showPopup;
      if (type == 'rq') {
        this.showDate = true;
        this.showLx = false;
        this.showZt = false;
      } else if(type == 'lx'){
        this.showDate = false;
        this.showLx = true;
        this.showZt = false;
      } else if(type == 'zt'){
        this.showDate = false;
        this.showLx = false;
        this.showZt = true;
      }
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        /* for (let i = 0; i < 10; i++) {
           this.list.push(this.list.length + 1);
         }*/

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= this.total) {
          this.finished = true;
        }else{
          this.pageNum += this.pageNum;
          this.getList();
        }
      }, 500);
    },
    getTime(time){
      this.startTime = `${new Date(time).getFullYear()}${new Date(time).getMonth()+1>9?new Date(time).getMonth()+1:"0"+(new Date(time).getMonth()+1)}`;
      this.showPopup = !this.showPopup;
      this.list = [];
      this.getList();
    },
    cancel(){
      this.showPopup = !this.showPopup;
    },
    getList() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        type:this.type==0?'':this.type,  //1购物佣金 2推广佣金
        status:this.status==0?'':this.status-1, //0未结算 1已结算
        startTime:this.startTime,
      }
      this.$http({
        method: 'post',
        url: '/minle/user/settle/findsettle',
        data: data,
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
    },
    //选择类型
    choose(index){
      this.showPopup = !this.showPopup;
      this.type = index;
      this.active1 = index;
      this.list = [];
      this.getList();
    },
    //选择状态
    zt(index){
      this.showPopup = !this.showPopup;
      this.status = index;
      this.active2 = index;
      this.list = [];
      this.getList();
    },
  },
  components: {
    Tops
  },
  created() {
    this.getList();
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
