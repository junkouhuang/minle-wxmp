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
          "applyMipuWays":"", //经营方式
          "applyMipuType":"", //经营范围或类型
          "applyMipuProvince":"",  //省
          "applyMipuCity":"",       //市
          "applyMipuRegion":"",  //区
          "applyMipuAddress":"", //申请米铺详细地址
          "applyMipuLicense":"", //米铺营业执照
          "applyMipuEntrancePicture":'',//米铺门脸图
          "applyMipuCover":"",   //米铺封面照
          "applyMipuPicture":[],
      },
      opacity:0,
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
      typeName:'',
      waysName:'',
      showPicker:false,
      typeList:[],
      waysList:[],
      addressMsg:'请选择地区',
      showDetailAddress:false,//是否打开附近定位地址详情信息
      poisList:[],//附近地址列表
    };
  },
  async created(){

  },
  async mounted(){
    this.ruleForm.applyMipuWays = this.$route.query.applyAgentLevel;
    if (this.ruleForm.applyMipuWays == 1) {
      this.waysName = '网红地摊车';
    } else if (this.ruleForm.applyMipuWays == 2) {
      this.waysName = '网红地摊车 配 智能终端';
    } else if (this.ruleForm.applyMipuWays == 3) {
      this.waysName = '网红地店';
    } else if (this.ruleForm.applyMipuWays == 4) {
      this.waysName = '网红地店 配 智能终端';
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
  methods: {

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
     * 上传证照图
     * @param data
     */
    getMsgFormSon4(data){
      if(this.ruleForm['applyMipuPicture'].length==6){
        this.$toast('您最多能上传6张证照图')
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
        this.$toast('请填写您的品牌名称')
        return
      }
      if(!this.typeName){
        this.$toast('请选择经营类型')
        return
      }
      if(!this.ruleForm.applyMipuTelephone){
        this.$toast('请填写联系人或负责人手机号')
        return
      }
      if(!this.ruleForm.applyMipuProvince){
        this.$toast('请选择经营地址')
        return
      }

      if(!this.ruleForm.applyMipuAddress){
        this.$toast('请填写详细地址')
        return
      }

      if (this.ruleForm.applyMipuWays == 3 || this.ruleForm.applyMipuWays == 4) {
        if(!this.ruleForm.applyMipuCover){
          this.$toast('请上传您的门脸照')
          return
        }
      }

      let arr = JSON.parse(JSON.stringify(this.ruleForm));
      const rela = await this.$http({
        method:'post',
        url:'/minle/mall/mipu/authentication'
      })
      if(rela.data.returnCode=="ERR_0000"){
        if(rela.data.data==2){
           this.$router.push({path:'/my/real_name/index',query:{data:arr,openxdt:true}})
        } else if (rela.data.data==1){
          const res = await  this.$http({
            method: 'post',
            url: '/minle/mall/dtc/apply',
            data: arr,
          })
          if(res.data.returnCode=='ERR_0000'){
            this.$toast.success("申请提交成功，待平台审核")
            this.$router.push('/my/xinditan/Audit');
          } else if (res.data.returnCode=='ERR_0003') {
            this.$toast("您尚未完善申请资料，请补充完善后提交申请")
          }
        }else if(rela.data.data===0){
            this.$toast('您的实名认证尚在审核中，暂无法申请服务');
        }
      }
    },

    /**
     * 选择经营方式
     */
    async selectWays(i,n){
        this.waysName = n.name
        this.ruleForm.applyMipuWays = n.id
        this.waysList.forEach((item,index)=>{
          if(item.name==n.name){
            this.waysList[index].isSelect = true;
          } else {
            this.waysList[index].isSelect = false;
          }
        })
    },

    /**
     * 选择经营范围
     */
    async selectScope(i,n){
        this.typeName = n.name
        this.ruleForm.applyMipuType = n.id
        this.typeList.forEach((item,index)=>{
          if(item.name==n.name){
            this.typeList[index].isSelect = true;
          } else {
            this.typeList[index].isSelect = false;
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
        url: '/common/mc/ways'
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
