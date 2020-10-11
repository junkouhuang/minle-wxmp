import Tops from "@/components/Top";
export default {
  data() {
    return {
      active: 1,
      arr: [],
      loading: false,
      finished: false,
      pageNum:0,
      pageSize:5,
      num:0,
      nums:1,
      total:0
    };
  },
  watch: {
    active(e) {
    }
  },
  methods:{
    //箭头回退
    returns(){
      this.$router.go(-1)
    },
    onLoad() {
      setTimeout(() => {

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.arr.length >= this.total) {
          this.finished = true;
        }else{
          this.pageNum += this.pageNum;
          this.getdata();
        }
      }, 500);
    },
    //订单详情
    detail(item) {
      this.$router.push({path: '/orderDetail', query: {orderNo: item.orderNo, active: item.status}});
    },
    getdata() {
      this.$http({
        url: '/minle/mall/order/queryUserOrder',
        method: "post",
        data: {
          status: 5,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(res => {
        if (res.data.returnCode == "ERR_0000") {
          this.arr = res.data.data.list;
          this.total = res.data.data.total;
        }
      });
    }
  },
  components: { Tops },
  mounted() {
    this.getdata()
  },
};
