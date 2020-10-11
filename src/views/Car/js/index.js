import Tops from "@/components/Top";
import eventBus from '@/common/js/evenbus'

export default {
  name: "car",
  data() {
    return {
      pageNum: 1,
      pageSize: 12,
      editor: true,//编辑
      cartNos: [],//选中的商品id
      result: [],//选中的商品id
      checked: false,//全选
      list: [],//列表
      loading: false,//提交订单加载
      total: 0, //总金额
      mipuNo:'',
      openmipu:false,
      noimg: require('../images/noimg.png'),
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
      let total = 0;
      let flag = true;//用来判断是否全选
      let commoditySpecification = [];
      for (let index in this.list) {
        if (this.list[index].check) {
          arr.push(this.list[index].cartNo);
          arr1.push(this.list[index].commodityNo);
          //total += this.list[index].commodityPrice
          total += (this.list[index].commodityPrice * this.list[index].amount)
          commoditySpecification.push({commodityNo:this.list[index].commodityNo,specification:this.list[index].specifications,amount:this.list[index].amount})
        } else {
          flag = false;
        }
      }
      this.cartNos = arr;
      this.result = arr1;
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
        total += (this.list[index].commodityPrice * this.list[index].amount)
      }
      this.checked = !this.checked;
      //全选
      if (this.checked) {
        for (let index in this.list) { //单选框全标注为选中
          this.list[index]['check'] = true;
        }
        this.cartNos = arr;
        this.result = arr1;
        this.total = total;
        this.commoditySpecification = commoditySpecification;
      }
      //反选
      else {
        for (let index in this.list) { //单选框全标注为不选中
          this.list[index]['check'] = false;
        }
        this.cartNos = [];
        this.result = [];
        this.total = [];
      }
    },
    //删除
    delcar() {
      if(this.cartNos.length>0) {
        this.$http({
          method: 'post',
          url: this.$url.delcar,
          data: {
            "commodityNoList": this.result
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
    async submitcar() {
      this.loading = true;
      if(this.cartNos.length>0){
          this.cartsettlement();
          this.$store.state.loaddefault = true;
         // this.$store.state.commodityNoList = this.cartNos;
          this.loading = false;
      }else{
        this.$toast('请选择商品');
        this.loading = false;
      }
    },

    async cartsettlement() {
      let res = await this.$http({
        method: 'post',
        url: '/minle/mall/cart/cartsettlement',
        data: {
          cartNos:this.cartNos
        }
      })
      if (res.status == 200) {
        this.$router.push({
          path: '/orderconfirm',
          query: {
            orderconfirmdata:JSON.stringify( res.data.data),
            mipuNo: this.mipuNo,
            openmipu:this.openmipu,
            type:this.$route.query.type
          }
        })
      }
    },


    //编辑
    handleStatus() {
      this.editor = !this.editor;
    },
    //购物车列表
    carlist() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      let url ='';
      let data={};
      if(this.$route.query.type==1){
        data={
          commodityType: 1,
          "pageNum": this.pageNum,
          "pageSize": this.pageSize,
        }
        url = '/minle/mall/cart/display';
      }else{
        data={
          commodityType: 0,
          "pageNum": this.pageNum,
          "pageSize": this.pageSize,
        }
        url = '/minle/mall/cart/display?mipuNo='+this.mipuNo;
      }
      this.$http({
        method: 'post',
        url: url,
        data: this.$qs.stringify(data)
        , headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
        .then(res => {
          this.$toast.clear();
          if (res.status == 200) {
            for (let index of  res.data.data.list) {
              index.check = false;
            }
            this.list = res.data.data.list;
            eventBus.$emit('len',{'caramount':this.list.length})
            localStorage.setItem('caramount',this.list.length)
          }
        }).catch(e => {

      })
    },

  },
  created() {

  },
  mounted() {
    this.mipuNo = this.$route.query.mipuNo;
    this.openmipu = this.$route.query.openmipu;
    if (this.mipuNo == undefined) {
      this.mipuNo = '';
    }
    this.carlist();
  },
  watch: {}
}
