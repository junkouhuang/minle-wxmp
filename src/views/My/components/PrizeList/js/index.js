import Tops from "@/components/Top";

export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 40,
      total:0,
      list: [],
      styleList: ['全部','赠送米粒', '支出米粒', '返还米粒'],
      loading: false,
      finished: false,
      showPopup: false,
      showDate: false,
      type:'',//0：赠送米粒 1：消费米粒 2：返回米粒
      currentDate: new Date(),
      active1:0
    };
  },
  methods: {
    //箭头回退
    returns(){
      this.$router.push('/my');
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }
      return value;
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
      this.startTime = `${new Date(time).getFullYear()}${new Date(time).getMonth()+1}`;
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
      this.$http({
        method: 'post',
        url: '/minle/mall/lottery/findLotteryPrize',
        data: {
          "pageNum": this.pageNum,
          "pageSize": this.pageSize,
        }
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
    choose(index){
      this.showPopup = !this.showPopup;
      this.type = index;
      this.active1 = index;
      this.list = [];
      this.getList();
    },
  },
  components: {
    Tops
  },
  created() {
    this.getList()
  },
  activated() {

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
