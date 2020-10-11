import Tops from "@/components/Top";

export default {
  data() {
    return {
      data: "",
      orderNo: '',
      active: '',
      address: '',
      expressComName: '',
      expressBarcode: '',
      expressCom: '',
      addressData: [],
      addressTips: ''
    };
  },
  components: {
    Tops
  },
  created () {
    this.address = this.$route.query.address
    this.expressComName = this.$route.query.expressComName
    this.expressBarcode = this.$route.query.expressBarcode
    this.expressCom = this.$route.query.expressCom
    this.phone = this.$route.query.phone
    this.statusList(this.expressCom, this.expressBarcode, this.phone)
  },
  methods: {
    returns(){
      this.$router.go(-1)
    },
    // 获取快递的状态
    statusList(com, barcode, telephone) {
      if(com==null || barcode==null){
        this.addressTips = '暂无快递物流信息，请联系咨询客服400-833-7998'
      }else{
        this.$http({
          method: "get",
          url: '/common/express/display',
          params: {
            com: com,
            barcode: barcode,
            telephone: telephone
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => {
          if (res.data.returnCode == 'ERR_0000') {
            this.addressData = res.data.data
          } else if (res.data.returnCode == 'ERR_0005') {
            this.addressTips = '暂无快递物流信息，请联系咨询客服400-833-7998'
          }
        });
      }
    },
  }
}
