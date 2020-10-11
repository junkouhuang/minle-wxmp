import Tops from "@/components/Top";
import China from "@/components/China";
import SimpleCropper from '@/components/SimpleCropper'
import {
  Uploader,
  Picker,
  Popup
} from 'vant';
import axios from 'axios'
export default {
  data() {
    return {
      columnsZq:[],//结算周期
      columnsFl:[],
      showZq:false,//是否显示结算周期
      showFl:false,//是否显示费率
      uploadParam: {
        fileType: 'recruit', // 其他上传参数
        uploadURL: this.$dataURL + 'uploadAction/qcloudImg', // 上传地址
        scale: 4  // 相对手机屏幕放大的倍数: 4倍
      },
      isDelLicense:false,//是否显示营业执照
      showPopup1:false,//营业执照示例图
      isDelmlt:false,//是否删除门脸图
      showPopup2:false,//门脸图示例图
      isDeldpt:false,//是否删除店铺图
      showPopup3:false,//店铺图示例图
      isDeldphjt:false,//是否删除店铺环境图
      isDeldpbq:false,//是否删除店铺标签
      showPopup4:false,//店铺环境示例图
      showChina:false,//显示省市区
      ruleForm:{
          "applyMipuName":"", //名称
          "applyMipuWays":"1", //经营方式
          "applyMipuType":"", //经营范围或类型
          "applyMipuProvince":"",  //省
          "applyMipuCity":"",       //市
          "applyMipuRegion":"",  //区
          "applyMipuAddress":"", //申请米铺详细地址
          "applyMipuLicense":"", //米铺营业执照
          "applyMipuEntrancePicture":'',//米铺门脸图
          "applyMipuCover":"",   //米铺封面照
          "applyMipuPicture":[], //米铺店内环境图
          "applyMipuTag":[], //标签
          "mipuServiceFeeRate":"",//服务费率
          "mipuSettlePeriod":"",//结算周期
          "applyMipuLatitude":"",  //米铺纬度
          "applyMipuLongitude":"", //米铺纬度

      },
      opacity:0,
      bobiOpacity:0,
      settleOpacity:0,
      scopeOpacity:0,
      waysOpacity:0,
      bottom:'-100%',
      bobiBottom:'-100%',
      settleBottom:'-100%',
      scopeBottom:'-100%',
      waysBottom:'-100%',
      showMask:false,
      showBobiMask:false,
      showSettleMask:false,
      showScopeMask:false,
      showWaysMask:false,
      tagsList:[],
      typeName:'',
      waysName:'',
      feeName:'',
      showPicker:false,
      typeList:[],
      waysList:[],
      serviceFees:[],
      settleTrans:[],
      addressMsg:'请选择地区',
      showDetailAddress:false,//是否打开附近定位地址详情信息
      poisList:[],//附近地址列表
    };
  },
  async created(){
    await this.requsetTagsData()
  },
  async mounted(){
    const addressData ="";
    if(addressData){
      let location = addressData.location.split(',')
      this.ruleForm.applyMipuLongitude =location[0]
      this.ruleForm.applyMipuLatitude = location[1]
      await this.requestLocationData(addressData.location)
    }
  },
  components: {
    China,
    Tops,
    Uploader,
    Picker,
    Popup,
    SimpleCropper
  },
  beforeRouteLeave(to, from, next) {
      if(to.path=='/my/mipu_open/fllow'){
        Object.assign(this.$data, this.$options.data());
      }
      next();
  },

  methods: {
    /**
     * 结算周期：确认
     */
    onConfirmZq(value, index) {
      this.showZq = false;
      this.ruleForm.mipuSettlePeriod = value;
      console.log(`当前值：${value}, 当前索引：${index}`);
    },


    /**
     * 获取结算周期
     */
    periods(){
      this.$http({
        method: 'get',
        url: '/common/mc/settle/periods',
      })
        .then(res => {
          this.settleTrans = res.data.data;
          this.showSettleMask = true;
          this.settleOpacity = 0.5
          this.settleBottom = '0px'

           this.settleTrans.forEach((item,index)=>{
            if(item.name==this.ruleForm.mipuSettlePeriod){
              this.settleTrans[index].isSelect = true;
            } else {
              this.settleTrans[index].isSelect = false;
            }
          })

          /*this.columnsZq = []
          for(let index in res.data.data){
            this.columnsZq.push( res.data.data[index].name);
          }
          this.showZq = true*/
        }).catch(e => {q
      })
    },

    /**
     * 获取服务周期
     */
    getService(){
      this.$http({
        method: 'get',
        url: '/common/mc/service/rates',
      })
        .then(res => {
          this.serviceFees = res.data.data;
          this.showBobiMask = true;
          this.bobiOpacity = 0.5
          this.bobiBottom = '0px'

          this.serviceFees.forEach((item,index)=>{
            if(item.name==this.feeName){
              this.serviceFees[index].isSelect = true;
            } else {
              this.serviceFees[index].isSelect = false;
            }
          })

          /*this.columnsFl = []
          for(let index in res.data.data){
            this.columnsFl.push( res.data.data[index].name);
          }
          this.showFl = true*/
        }).catch(e => {
      })
    },

    /**
     * 费率:确认
     */
    onConfirmFl(value, index){
      this.showFl = false;
      this.ruleForm.mipuServiceFeeRate = value;
      console.log(`当前值：${value}, 当前索引：${index}`);
    },

    /**
     * 上传营业执照图
     * @param data
     */
    getMsgFormSon1(data){
      this.ruleForm['applyMipuLicense'] = data;
      this.isDelLicense = true;
    },

    /**
     * 删除营业执照图
     */
    delLicense(){
      this.ruleForm['applyMipuLicense'] = "";
      this.isDelLicense = false;
    },

    /**
     * 营业执照示例图
     */
    showPopupHandle1(){
      this.showPopup2 = true;
    },

    /**
     * 上传门脸图
     * @param data
     */
    getMsgFormSon2(data){
      this.ruleForm['applyMipuEntrancePicture'] = data;
      this.isDelmlt = true;
    },

    /**
     * 删除门脸图
     */
    delmlt(){
      this.ruleForm['applyMipuEntrancePicture'] = "";
      this.isDelmlt = false;
    },

    /**
     * 门脸图示例图
     */
    showPopupHandle2(){
      this.showPopup1 = true;
    },

    /**
     * 上传店铺图
     * @param data
     */
    getMsgFormSon3(data){
      this.ruleForm['applyMipuCover'] = data;
      this.isDeldpt = true;
    },

    /**
     * 删除店铺图
     */
    deldpt(){
      this.ruleForm['applyMipuCover'] = "";
      this.isDeldpt = false;
    },

    /**
     * 店铺图示例图
     */
    showPopupHandle3(){
      this.showPopup4 = true;
    },

    /**
     * 上传店内环境图
     * @param data
     */
    getMsgFormSon4(data){
      if(this.ruleForm['applyMipuPicture'].length==6){
        this.$toast('您最多能上传6张米铺环境图')
        return
      }
      this.ruleForm['applyMipuPicture'].push(data)
      this.isDeldphjt = true;
    },

    /**
     * 删除店内环境图
     */
    deldphjt(index){
      this.ruleForm['applyMipuPicture'].splice(index,1)
      this.isDeldphjt  = this.ruleForm['applyMipuPicture'].length==0?false:true;
    },

    /**
     * 删除店铺标签
     */
    deldpbq(name,index){

      this.ruleForm['applyMipuTag'].splice(index,1)
      this.isDeldpbq  = this.ruleForm['applyMipuTag'].length==0?false:true;

      for(let i in this.tagsList){
        if(this.tagsList[i]['name'] == name){
          this.tagsList[i]['isSelect'] = false;
        }
      }

    },

    /**
     * 店内环境图示例图
     */
    showPopupHandle4(){
      this.showPopup3 = true;
    },

    /**
     * 箭头回退
     */
    returns() {
      this.$router.go(-1);
    },

    /**
     * 获取省市区回调信息
     */
    change(data) {
      this.ruleForm.applyMipuProvince = data.provinceName;
      this.ruleForm.applyMipuCity = data.cityName;
      this.ruleForm.applyMipuRegion = data.regionName;
      this.showChina = false;
    },

    /**
     * 打开省市区
     */
    china(){
      this.showChina = true;
    },

    /**
     * 打开详细地址
     */
    openDetail(){
      this.showDetailAddress = true;
      this.poisList = JSON.parse(localStorage.getItem('area'));
    },

    /**
     * 获取附近门店详细地址
     */
    getDetail(data){
      this.showDetailAddress = false;
      this.ruleForm.applyMipuAddress = data;
    },

    /**
     * 关闭详细地址弹窗
     */
    closeHandle(){
      this.showDetailAddress = false;
    },

    /**
     * 选择米铺类型
     */
    onConfirm(e){
      this.ruleForm.applyMipuType = e.id
      this.typeName = e.name
      this.showPicker = false
    },

    /**
     * 下一步
     */
    async next(){


      if(!this.ruleForm.applyMipuName){
        console.log(this.ruleForm.applyMipuName)
        this.$toast('请填写您的米铺名称')
        return false;
      }

      if(!this.waysName){
        this.$toast('请选择米铺经营方式')
        return false;
      }

      if(!this.typeName){
        this.$toast('请选择米铺经营范围')
        return false;
      }

      if(!this.ruleForm.applyMipuTelephone){
        this.$toast('请填写米铺联系人或负责人手机号')
        return false;
      }

      if(!this.ruleForm.applyMipuProvince){
        this.$toast('请选择经营地址')
        return false;
      }

      if(!this.ruleForm.applyMipuAddress){
        this.$toast('请填写详细地址')
        return false;
      }

      if (this.ruleForm.applyMipuWays == 1 || this.ruleForm.applyMipuWays == 2
        || this.ruleForm.applyMipuWays == 3 || this.ruleForm.applyMipuWays == 5) {

        if(!this.ruleForm.applyMipuLicense){
          this.$toast('请上传您的米铺营业执照或经营许可证')
          return
        }
        if(!this.ruleForm.applyMipuCover){
          this.$toast('请上传您的米铺橱面')
          return
        }

      }

      if (this.ruleForm.applyMipuWays == 3) {
        if(!this.ruleForm.applyMipuEntrancePicture){
          this.$toast('请上传您的米铺门脸照')
          return
        }

        if(!this.ruleForm.applyMipuPicture.length>0){
          this.$toast('请上传您的米铺环境照')
          return
        }

        if(!this.ruleForm.applyMipuTag.length>0){
          this.$toast('请选择您的米铺特色服务标签')
          return
        }
      }

      if (this.ruleForm.applyMipuWays == 1 || this.ruleForm.applyMipuWays == 2 || this.ruleForm.applyMipuWays == 3) {
        if(!this.ruleForm.mipuServiceFeeRate){
          this.$toast('请选择您的米铺结算服务费率')
          return
        }
        if(!this.ruleForm.mipuSettlePeriod){
          this.$toast('请选择您的米铺账单结算周期')
          return
        }
      }

      let arr = JSON.parse(JSON.stringify(this.ruleForm));
      arr["mipuServiceFeeRate"] = arr["mipuServiceFeeRate"].split('%')[0]/100;
      const rela = await this.$http({
        method:'post',
        url:'/minle/mall/mipu/authentication'
      })
      if(rela.data.returnCode=="ERR_0000"){
        debugger
        if(rela.data.data==2){
           this.$router.push({path:'/my/real_name/index',query:{data:arr,openmipu:true}})
        }else if(rela.data.data==1){
          const res = await  this.$http({
            method: 'post',
            url: '/minle/mall/mipu/apply',
            data: arr,
          })
          if(res.data.returnCode='ERR_0000'){
            this.$toast.success("申请提交成功，待平台审核")
            this.$router.push('/my/mipu_home/new/index');
          }
        }else if(rela.data.data===0){
            this.$toast('您的实名认证尚在审核中，暂无法申请米铺');
        }
      }
    },

    /**
     * 选择经营方式
     */
    async selectWays(i,n){
        this.waysList.forEach((item,index)=>{
          if(item.name==n.name){
            this.waysList[index].isSelect = true;
          } else {
            this.waysList[index].isSelect = false;
          }
        })
        this.$forceUpdate();
    },

    /**
     * 选择经营范围
     */
    async selectScope(i,n){
        this.typeList.forEach((item,index)=>{
          if(item.name==n.name){
            this.typeList[index].isSelect = true;
          } else {
            this.typeList[index].isSelect = false;
          }
        })
        console.log(this.typeList)
       this.$forceUpdate();
    },

    /**
     * 选择服务费率
     */
    async selectFees(i,n){
        this.feeName = n.name
        this.ruleForm.mipuServiceFeeRate = n.value
        this.serviceFees.forEach((item,index)=>{
          if(item.name==n.name){
            this.serviceFees[index].isSelect = true;
          } else {
            this.serviceFees[index].isSelect = false;
          }
        })
    },

    /**
     * 选择结算周期
     */
    async selectTrans(i,n){
        this.ruleForm.mipuSettlePeriod = n.name
        this.settleTrans.forEach((item,index)=>{
          if(item.name==n.name){
            this.settleTrans[index].isSelect = true;
          } else {
            this.settleTrans[index].isSelect = false;
          }
        })
    },

    /**
     * 选择类型
     */
    async selectType(i,n){
      if(n.isSelect){
        let flag
        this.ruleForm.applyMipuTag.forEach((item,index)=>{
          if(item===n.name){
            flag = index
          }
        })
        this.ruleForm.applyMipuTag.splice(flag,1)
      }else{
        if(this.ruleForm.applyMipuTag.length>=4) {
          this.$toast("您最多可同时选择四种服务标签")
          return;
        }
        this.ruleForm.applyMipuTag.push(n.name)
        this.isDeldpbq = true;

      }
      n.isSelect = !n.isSelect
    },

    /**
     * 米铺经营方式
     *
     */
    async requestWaysData(){
      const res = await this.$http({
        method: 'get',
        url: '/common/mp/ways'
      })
      if(res.data.returnCode="ERR_0000"){
        this.waysList = res.data.data
        this.showWaysMask = true;
        this.waysOpacity = 0.5
        this.waysBottom = '0px'

        this.waysList.forEach((item,index)=>{
          if(item.name==this.waysName){
            this.waysList[index].isSelect = true;
          } else {
            this.waysList[index].isSelect = false;
          }
        })
      }
    },

    /**
     * 米铺经营范围
     *
     */
    async requsetTypeData(){
      const res = await this.$http({
        method: 'get',
        url: '/common/mc/types'
      })
      if(res.data.returnCode="ERR_0000"){
        this.typeList = res.data.data
        this.showScopeMask = true;
        this.scopeOpacity = 0.5
        this.scopeBottom = '0px'

        this.typeList.forEach((item,index)=>{
          if(item.name==this.typeName){
            this.typeList[index].isSelect = true;
          } else {
            this.typeList[index].isSelect = false;
          }
        })
      }
    },

    /**
     * 选择标签mask
     */
    closeMask(){
      this.opacity = 0
      this.bottom = '-100%'
      setTimeout(()=>{
        this.showMask = false
      },300)
    },


    /**
     * 选择经营方式
     */
    closeWaysMask(){
      this.waysOpacity = 0
      this.waysBottom = '-100%'
      setTimeout(()=>{
        this.showWaysMask = false
      },300)
      const result = this.waysList.filter(item=>{
        return item.isSelect
      })
      this.waysName = result[0].name;
      this.ruleForm.applyMipuWays = result[0].id;

    },

    /**
     * 选择经营范围
     */
    closeScopeMask(){
      this.scopeOpacity = 0
      this.scopeBottom = '-100%'
      setTimeout(()=>{
        this.showScopeMask = false
      },300)
      const result = this.typeList.filter(item=>{
        return item.isSelect
      })
      this.typeName = result[0].name;
      this.ruleForm.applyMipuType = result[0].id;
    },

    /**
     * 选择服务费
     */
    closeBobiMask(){
      this.bobiOpacity = 0
      this.boboBottom = '-100%'
      setTimeout(()=>{
        this.showBobiMask = false
      },300)
    },

    /**
     * 选择服务费
     */
    closeSettleMask(){
      this.settleOpacity = 0
      this.settleBottom = '-100%'
      setTimeout(()=>{
        this.showSettleMask = false
      },300)
    },

    /**
     * 请求标签信息
     */
    async requsetTagsData(){
      const res = await this.$http({
        method: 'get',
        url: '/common/mc/tags'
      })
      if(res.data.returnCode="ERR_0000"){
        this.tagsList = res.data.data
        this.tagsList.forEach((item,index)=>{
          this.$set(item,'isSelect',false)
        })
      }
    },

    /**
     * 打开标签
     */
    async handleAddTags(){
      this.showMask = true
      setTimeout(()=>{
        this.opacity = 0.5
        this.bottom = '0px'
      },10)
    },

      /**
     * 打开经营类型
     */
    async handleAddMipuType(){
      this.showPicker = true;
      setTimeout(()=>{
        this.opacity = 0.5
        this.bottom = '0px'
      },10)
    },

  }
};
