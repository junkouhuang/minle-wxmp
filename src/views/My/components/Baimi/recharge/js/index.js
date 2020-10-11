import Tops from "@/components/Top";
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 12,
      total:0,
      list:[],
      loading:false,
      finished: false,
    };
  },
  watch: {

  },
  methods:{
    //箭头回退
    returns(){
      this.$router.go(-1)
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
    getList() {
      /*
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });*/
      let formData = new FormData();
      formData.append('pageNum', this.pageNum)
      formData.append('pageSize', this.pageSize)
      this.$http({
        url: '/minle/mall/pointCard/display',
        method: "post",
        data: formData
      }).then(res => {
        if (res.data.returnCode == "ERR_0000") {
          this.list = this.list.concat(res.data.data.list);
          this.total = res.data.data.total;
        }else{
          this.list = [];
          this.total = 0;
        }
      }).catch(e => {
        // do-nothing
      })
    },

  },
  components: { Tops },
  mounted() {
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
      var t = Y + '-' + m + '-' + d + ' ' + H + ':' + i ;
      return t;
    }
  }
};
