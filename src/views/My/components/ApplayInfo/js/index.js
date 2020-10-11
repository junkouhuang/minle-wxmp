import Tops from "@/components/Top";

export default {
  data() {
    return {
      username: "",
      info: '',
      dqd: "",
      pickData: [],
      province: [],
      tel: "",
      dq: "",
      dz: "",
      bm: "",
      checked: true,
      show:false,
      dataList:[],
      indexList:[],
      indexs:0,
      provinceId:0,
      cityId:0,
      regionId:0,
      provinceName:'请选择',
      cityName:'请选择',
      regionName:'请选择',
      type:'add',
      obj:[],
      id:0,
      applyAgentLevel:''
    };
  },
  components: {
    Tops,
  },
  computed: {

  },
  created() {
    this.applyAgentLevel = this.$route.query.applyAgentLevel;
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
    if(this.type == "update"){
      this.edit();
    }
  },
  methods: {
    //回退
    returns(){
      this.$router.go('-1');
    },
    open() {
      this.show = true;
      this.indexList = [];
      this.getProvice(0);
    },
    selProvice(p,x,idex){
      if(this.provinceName != x) {
        this.provinceName = x;
        this.cityName = '请选择'
        this.regionName = '请选择'
      }
      this.indexs = idex;
      this.provinceId = p;
      this.getCity(1);
    },
    selCity(c,x,idex){
      if(this.cityName != x) {
        this.cityName = x;
        this.regionName = '请选择';
      }
      this.indexs = idex;
      this.cityId = c;
      this.getCounty(2);
    },
    selCounty(c,x,idex){
      this.indexs = idex;
      this.regionId = c;
      this.regionName = x;
      this.show = false;
      this.dq = this.provinceName + this.cityName+this.regionName;
    },
    onSaves(e) {
      if (this.username == '') {
        this.$toast('请填写会员姓名');
        return false;
      }
      if(this.tel == ''){
        this.$toast('请填写会员手机号');
        return false;
      }else{
        if (!(/^1[3456789]\d{9}$/.test(this.tel))) {
          this.$toast('请输入正确的手机号');
          return false;
        }
      }
      if (this.dq == "" || this.dq == null || this.dq == undefined) {
        this.$toast('请选择地区');
        return false;
      }
      if (this.dz == '') {
        this.$toast('请填写详细地址');
        return false;
      }
        let obj = {
          applyAgentName: this.username,
          applyAgentLevel:this.applyAgentLevel,
          applyAgentTelephone: this.tel,
          applyAgentProvince:this.provinceName,
          applyAgentCity: this.cityName,
          applyAgentRegion: this.regionName,
          applyAgentRegionId: this.regionId,
          applyAgentCityId: this.cityId,
          applyAgentProvinceId: this.provinceId,
          applyAgentAddress: this.dz,
          id: this.id,
          remark:''
        };
        this.$http({
          method: "post",
          url: '/minle/user/agentApply/apply',

          data: obj
        }).then(res => {
          if (res.data.returnCode == "ERR_0000") {
            if(res.data.data === 0){
              this.$toast({
                message: "您有米权尚未完成激活",
                type: "success",
                duration: 2000
              });
            }else if(res.data.data === 1){
              this.$toast({
                message: "请完善您的米权申请信息",
                type: "success",
                duration: 2000
              });
            }else if (res.data.data === 2){
              this.$toast({
                message: "该手机号码已经被申请",
                type: "success",
                duration: 2000
              });
            }else if (res.data.data === 4){
              this.$toast({
                message: "此区域已授权，请选择其他区域",
                duration: 2000
              });
            }else{
              this.$toast({
                message: "申请提交成功",
                type: "success",
                duration: 2000
              });
              setTimeout(() => {
                //this.$router.go(-1);
                this.$router.push('/my/sqcord');
              }, 1500);

            }
          }
        });

    },
    //获取省份
    getProvice(index){
      this.indexs = index;
      this.dataList = [];
      this.indexList = [];
      this.$http({
        method: 'get',
        url: '/common/province/guide?country=1',
        data: {},
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
        .then(res => {
          if (res.status == 200) {
            for(let i = 0;i<res.data.data.length;i++){
              this.indexList.push(res.data.data[i].prefix)
            }
            this.dataList = res.data.data;
          }
        }).catch(e => {

      })
    },
    //获取城市
    getCity(index){
      if(this.provinceName == "请选择"){
        return false;
      }
      this.indexs = index;
      this.dataList = [];
      this.indexList = [];
      this.$http({
        method: 'get',
        url: '/common/city/guide?country=1&province='+this.provinceId,
        data: {},
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
        .then(res => {
          if (res.status == 200) {
            for(let i = 0;i<res.data.data.length;i++){
              this.indexList.push(res.data.data[i].prefix)
            }
            this.dataList = res.data.data;
          }
        }).catch(e => {

      })
    },
    //获取县
    getCounty(index) {
      if(this.cityName == "请选择"){
        return false;
      }
      this.indexs = index;
      this.dataList = [];
      this.$http({
        method: 'get',
        url: '/common/area/display?city='+this.cityId,
        data: {},
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
        .then(res => {
          if (res.status == 200) {
            this.indexList = [];
            this.dataList = res.data.data;
            console.log("+++++++++++")
            console.log(this.dataList.length)
          }
        }).catch(e => {

      })
    },

  },
  watch: {

  }
};
