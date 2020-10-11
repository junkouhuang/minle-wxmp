import Tops from "@/components/Top";

export default {
  data() {
    return {
      radio: '-1',
      levelList:[]
    };
  },
  methods: {
    returns(){
      this.$router.go(-1);
    },
    openEq(level) {
      this.radio = level;
      this.next();
    },
    radioFun(id){
      this.radio = id;
    },
    getLevel(){
      this.$http({
        method: "get",
        url: '/common/agent/levels',
        data:'',
      }).then(res => {
        if(res.data.returnCode== "ERR_0000"){
          this.levelList = res.data.data;
        }
      });
    },
    next(){
      if(this.radio == "-1"){
        this.$toast("请选择需要申请的代理级别");
        return false;
      }
      this.$http({
        method: "post",
        url: '/minle/user/agentApply/apply',
        data:{'applyAgentLevel':this.radio},
      }).then(res => {
        if(res.data.returnCode== "ERR_0000"){
          if(res.data.data == 0){
            this.$toast({
              message: "您有合伙人申请尚未审核完结",
              duration: 1500
            });
          }else if(res.data.data == 1){
            setTimeout(() => {
              this.$router.push({path:'/my/applyinfo',query:{'applyAgentLevel':this.radio}});
            }, 1500);
          }else if (res.data.data ==2){
            this.$toast({
              message: "该手机号码已经被申请",
              duration: 1500
            });
          }else if (res.data.data ==3){
            this.$toast({
              message: "暂不支持比其推荐人级别高的申请",
              duration: 1500
            });
          }

        }
      });
    }
  },
  mounted() {
    this.getLevel();
  },
  components: {
    Tops
  }
};
