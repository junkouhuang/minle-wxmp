import Tops from "@/components/Top";
export default {
  data() {
    return {
      bg:require('../img/rectangle.png')
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log(from)
      if(from.path=='/my/mipu_open/midetail'){
         from.meta.keepAlive = false;
      }
      next();
  },
  methods: {

    async validate(){
      const res = await this.$http({
        method:'post',
        url:'/minle/mall/mipu/validate'
      })
      if(res.data.data){
        // 先提交米橱资料并完成付款，后平台审核
        this.$router.push('/my/mipu_open/midetail');
      }else{
        this.$router.push('/my/mipu_open/midetail');
        //this.$router.push('/my/mipu_open/card');
      }
    }
  },
  components: {
    Tops
  }
};
