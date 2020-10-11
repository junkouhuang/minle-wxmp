import Tops from "@/components/Top";

export default {
  data() {
    return {
      withdraw:0,
      totalAmount:0,
      futureEarnings: 0,
    };
  },
  methods: {
    //返回箭头
    returns(){
      this.$router.go(-1)
    },
    //提现帮助
    help(){
      this.$router.push('/extracthelp')
    },
    getList() {
      let data0 = {status:0}
      let data1 = {status:1}
      this.$http({
        method: 'post',
        url: '/minle/user/wallet/sumWallet',
        data:this.$qs.stringify(data0),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
        .then(res => {
          if (res.status == 200) {
            this.totalAmount = res.data.data.totalAmount;
            this.withdraw = res.data.data.withdraw;
            this.futureEarnings = res.data.data.futureEarnings;
          }
        }).catch(e => {

      })
      this.$http({
        method: 'post',
        url: '/minle/user/wallet/sumWallet ',
        data: this.$qs.stringify(data1),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
        .then(res => {
          if (res.status == 200) {
            this.withdraw = res.data.data.withdraw;
          }
        }).catch(e => {

      })
    },
    extractFun(){

    },
    tixian(){
      this.$router.push({path:'/my/wallet/extract'})
      sessionStorage.setItem('useramount',this.withdraw);
      sessionStorage.setItem('type',0);
    }
  },
  components: {
    Tops
  },
  created() {
    this.getList()
  },
  activated() {
  },
  mounted(){
    this.totalamount = this.$route.query.totalamount;
  }
};
