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
    };
  },
  components: {
    Tops,
  },
  computed: {

  },
  created() {
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
        this.$toast('请填写收货人姓名');
        return false;
      }
      if(this.tel == ''){
        this.$toast('请填写收货人手机号码');
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
      if (this.type == "update") {
        let obj = {
          receiver: this.username,
          telephone: this.tel,
          provinceName: this.provinceName,
          cityName: this.cityName,
          regionName: this.regionName,
          regionId: this.regionId,
          cityId: this.cityId,
          provinceId: this.provinceId,
          postcode: '',
          detail: this.dz,
          defaults: this.checked,
          id: this.id
        };
        this.$http({
          method: "post",
          url: this.$url.saveAddress,
          data: this.$qs.stringify(obj)
        }).then(res => {
          if (res.data.returnCode == "ERR_0000") {
            this.$toast({
              message: "修改成功",
              type: "success",
              duration: 1500
            });
            setTimeout(() => {
              this.$router.go(-1);
            }, 1500);
          }
        });
      } else {
        let obj = {
          receiver: this.username,
          telephone: this.tel,
          provinceName: this.provinceName,
          cityName: this.cityName,
          regionName: this.regionName,
          cityId: this.cityId,
          provinceId: this.provinceId,
          postcode: '',
          detail: this.dz,
          defaults: this.checked,
          regionId: this.regionId
        };
        this.$http({
          method: "post",
          url: this.$url.createAddress,
          data: this.$qs.stringify(obj)
        }).then(res => {
          if (res.data.returnCode == "ERR_0000") {
            this.$toast({
              message: "添加成功",
              type: "success",
              duration: 1500
            });
            setTimeout(() => {
              this.$router.go(-1);
            }, 1500);
          }
        });
      }
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
          }
        }).catch(e => {

      })
    },
    //获取回显信息
    edit(index){
      this.$http({
        method: 'post',
        url: '/minle/user/address/edit',
        data: this.$qs.stringify({id:this.id}),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
        .then(res => {
          if (res.status == 200) {
            this.username = res.data.data.receiverName;
            this.username = res.data.data.receiverName;
            this.dq = res.data.data.provinceName + res.data.data.cityName+ res.data.data.regionName;
            this.provinceName= res.data.data.provinceName
            this.cityName = res.data.data.cityName;
            this.regionName = res.data.data.regionName;
            this.provinceId= res.data.data.provinceId
            this.cityId = res.data.data.cityId;
            this.regionId = res.data.data.regionId;
            this.dz = res.data.data.address;
            this.tel = res.data.data.receiverTelephone;
            this.id = res.data.data .id;
          }
        }).catch(e => {

      })
    },
  },

};
