import Tops from "@/components/Top";
import eventBus from '@/common/js/evenbus'

export default {
  name: "car",
  data() {
    return {
      editor: true,//编辑
      result: [],//选中的商品id
      result1: [],//选中的商品id
      checked: false,//全选
      list: [],//列表
      loading: false,//提交订单加载
      total: 0, //总金额
      noimg: require('../images/noimg.png'),
      mipuNo:'',//米铺编号
      commoditySpecification:[]
    }
  },
  components: {
    Tops
  },
  methods: {
    //单选
    singlecheck(index) {
      this.list[index].check = !this.list[index].check;//取反
      let arr = [];
      let arr1 = [];
      let commoditySpecification = [];
      let total = 0;
      let flag = true;//用来判断是否全选
      for (let index in this.list) {
        if (this.list[index].check) {
          arr.push(this.list[index].cartNo);
          arr1.push(this.list[index].commodityNo);
          commoditySpecification.push({commodityNo:this.list[index].commodityNo,specification:this.list[index].specifications,amount:this.list[index].amount})
          total += this.list[index].commodityPrice
        } else {
          flag = false;
        }
      }
      this.result = arr;
      this.result1 = arr1;
      this.total = total;
      this.commoditySpecification = commoditySpecification;
      if (flag) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
    //全选
    checkAll() {
      let arr = [];
      let arr1 = [];
      let total = 0;
      let commoditySpecification = [];
      for (let index in this.list) {
        arr.push(this.list[index].cartNo);
        arr1.push(this.list[index].commodityNo);
        commoditySpecification.push({commodityNo:this.list[index].commodityNo,specification:this.list[index].specifications,amount:this.list[index].amount})
        total += this.list[index].commodityPrice
      }
      this.checked = !this.checked;
      //全选
      if (this.checked) {
        for (let index in this.list) { //单选框全标注为选中
          this.list[index]['check'] = true;
        }
        this.result = arr;
        this.result1 = arr1;
        this.total = total;
        this.commoditySpecification = commoditySpecification;
      }
      //反选
      else {
        for (let index in this.list) { //单选框全标注为不选中
          this.list[index]['check'] = false;
        }
        this.result = [];
        this.result1 = [];
        this.total = [];
      }
    },
    //删除
    delcar() {
      if(this.result.length>0) {
        this.$http({
          method: 'post',
          url: this.$url.delcar,
          data: {
            "commodityNoList": this.result1
          }
        })
          .then(res => {
            if (res.status == 200) {
              this.$toast('删除成功');
              for (let num of this.result) {
                this.list.splice(this.list.findIndex(item => item.commodityNo == num), 1)
                eventBus.$emit('len',{'caramount':this.list.length})
                localStorage.setItem('caramount',this.list.length)
              }
            }
          }).catch(e => {

        })
      }else{
        this.$toast('请选择商品')
      }
    },
    //提交订单
    submitcar() {
      this.loading = true;
      if(this.result.length>0){
        let env = localStorage.getItem('env');
        this.$http({
          method: 'post',
          url: this.$url.env + '?env='+env ,//检测是否登录
          data: {}
        })
          .then(res => {
            if (res.status == 200) {
              this.$router.push({'path':'/my/mipu_open/pay',query:{commoditySpecification:this.commoditySpecification}})
              this.$store.state.loaddefault = true;
              this.$store.state.commodityNoList = this.result;
              this.loading = false;
            }
          }).catch(e => {

        })
      }else{
        this.$toast('请选择商品');
        this.loading = false;
      }
    },


    //编辑
    handleStatus() {
      this.editor = !this.editor;
    },
    //购物车列表
    carlist(mipuNo) {
      /*this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });*/
      this.$http({
        method: 'post',
        url: '/minle/mall/cart/display',
        data:this.$qs.stringify({mipuNo:mipuNo}),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          this.$toast.clear();
          if (res.status == 200) {
            for (let index of  res.data.data) {
              index.check = false;
            }
            this.list = res.data.data;
            eventBus.$emit('len',{'caramount':this.list.length})
            localStorage.setItem('caramount',this.list.length)
          }
        }).catch(e => {

      })
    },
    //提交订单
    submitorder() {
      this.$http({
        method: 'post',
        url: this.$url.settlement,
        data: {
          'commodityNoList': []
        }
      })
        .then(res => {
          if (res.status == 200) {

          }
        }).catch(e => {

      })
    }
  },
  mounted() {
    this.carlist(this.$route.query.mipuNo);
  },
  watch: {}
}
