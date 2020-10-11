import Tops from "@/components/Top";

export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 40,
      total:0,
      list: [],
      styleList: ['全部','赠送米粒', '支出米粒', '返还米粒', '充值米粒'],
      loading: false,
      finished: false,
      showPopup: false,
      showDate: false,
      type:'',//0：赠送米粒 1：消费米粒 2：返回米粒  3: 充值米粒
      currentDate: new Date(),
      minDate: new Date(2000, 0, 1),
      active1:0,
      dateTime:'日期',
      typeName:'类型'
    };
  },
  methods: {
    //箭头回退
    returns(){
      this.$router.go('-1');
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
      if (type == 'date') {
        this.showDate = true;
      } else {
        this.showDate = false;
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
      this.dateTime = `${new Date(time).getMonth()+1}月`;
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
        type:this.type ==0?'':this.type-1,
        startTime:this.startTime
      }
      this.$http({
        method: 'post',
        url: '/minle/user/xqm/findXqm',
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
    },
    choose(index,name){
      this.showPopup = !this.showPopup;
      this.type = index;
      this.active1 = index;
      this.typeName = name;
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
