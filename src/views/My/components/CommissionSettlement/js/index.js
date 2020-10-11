import Tops from "@/components/Top";

export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total:0,
      data:[],
      list: [],
      minDate: new Date(2000, 0, 1),
      loading: false,
      finished: false,
      showPopup: false,
      showDate: false,
      currentDate: new Date(),
      date:'日期',
      startTime:''
    };
  },
  methods: {
    //箭头回退
    returns(){
      this.$router.go('-1');
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
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
      this.showDate = true;
    },
    getTime(time){
      this.startTime = `${new Date(time).getFullYear()}${new Date(time).getMonth()+1>9?new Date(time).getMonth()+1:"0"+(new Date(time).getMonth()+1)}`;
      this.date = `${new Date(time).getFullYear()}`!=new Date().getFullYear()?`${new Date(time).getFullYear()}年${new Date(time).getMonth()+1}月`:`${new Date(time).getMonth()+1}月`;
      this.showPopup = !this.showPopup;
      this.list = [];
      this.getList();
    },
    cancel(){
      this.showPopup = !this.showPopup;
    },
    tixian(){
      this.$router.push({path:'/my/wallet/extract'})
      sessionStorage.setItem('useramount',this.data.withdraw);
      sessionStorage.setItem('type',6);
    },
    sumCommissionSettle(){
      this.$http({
        method: 'post',
        url: '/minle/mall/agentCommissionSettlement/sumCommissionSettle',

      })
        .then(res => {
          if (res.data.returnCode == "ERR_0000") {
            this.data = res.data.data;
          }
        }).catch(e => {

      })
    },
    getList() {
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        startTime:this.startTime,
        type:''
      }
      this.$http({
        method: 'post',
        url: '/minle/mall/agentCommissionSettlement/findCommissionList',
        data: data
      })
        .then(res => {
          if (res.status == 200) {

            if (res.data.data.length==0){
                this.list = [];
                this.total = 0;
              }else{
                this.list = this.list.concat(res.data.data.list);
                this.total = res.data.data.total;
            }
          }
        }).catch(e => {

      })
    },
  },
  components: {
    Tops
  },
  created() {
    this.sumCommissionSettle();
    this.getList();
  },
  activated() {
  },
  mounted(){

  },
  filters: {
    //格式化时间戳
    formatDate: function (value) {
      if(value==''){
        return ''
      }
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
      var t=''
      if(Y!=new Date().getFullYear()){
         t =Y + '-' +  m + '-' + d + ' ' + H + ':' + i ;
      }else{
         t =  m + '-' + d + ' ' + H + ':' + i ;
      }

      return t;
    }
  }
};
