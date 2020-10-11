import Tops from "@/components/Top";

export default {
  data() {
    return {
      startTime: '',
      pageNum: 1,
      pageSize: 40,
      total:0,
      data:[],
      list:[],
      showDate:false,
      showPopup:false,
      minDate: new Date(2000, 0, 1),
      currentDate: new Date(),
      type:'',// 0:消费福利 1:每日福利 2:倒米
      styleList: ['全部','奖励福利', '每日福利','倒缸'],
      active1:0,
      navBarFixed:false,
      loading: false,
      finished: false,
    };
  },
  components: {
    Tops
  },
  filters: {
    //格式化时间戳
    formatDate: function (value,type) {
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
      var t='';
      if(type==1){
        t = Y + '-' + m + '-' + d;
      }else{
        t = Y + '-' + m + '-' + d + ' ' + H + ':' + i ;
      }
      return t;
    }
  },
  created() {
    this.sumRewards();
    this.getList();

  },
  methods: {
    //箭头回退
    returns() {
      this.$router.go('-1');
    },

    //获取总收益
    sumRewards() {
      this.$http({
        method: 'post',
        url: "/minle/user/shoppingRewards/sumRewards",
        data: {}
      })
        .then(res => {
          if (res.data.returnCode == "ERR_0000") {
            this.data = res.data.data;
          }
        })
    },

    //列表数据
    getList() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      let data = {
        startTime: this.startTime,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        type:this.type==0?'':this.type-1
      }
      this.$http({
        method: 'post',
        url: "/minle/user/shoppingRewards/shoppingRecord",
        data: data
      })
        .then(res => {
          this.$toast.clear();
          if (res.data.returnCode == "ERR_0000") {
            if(res.data.data.list.length>0){
              this.list = this.list.concat(res.data.data.list);
              this.total = res.data.data.total;
            }else{
              this.list = [];
              this.total = 0;
            }
          }
        })

    },

    /**
     * 显示时间
     */
    handle(t){
      this.showPopup = !this.showPopup;
      if(t=="date"){
        this.showDate = true;
      }else{
        this.showDate = false;
      }
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

    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }
      return value;
    },

    choose(index){
      this.showPopup = !this.showPopup;
      this.type = index;
      this.active1 = index;
      this.list = [];
      this.getList();
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
    withdraw(can){
      if(!can) return false;
      this.$router.push({path:'/my/wallet/extract'})
      sessionStorage.setItem('useramount',this.data.withdraw)
      sessionStorage.setItem('type',1);
    },
  },
  mounted() {
    //this.num = this.$route.query.num;
    // 事件监听滚动条
    window.addEventListener('scroll', this.watchScroll);
  }
};
