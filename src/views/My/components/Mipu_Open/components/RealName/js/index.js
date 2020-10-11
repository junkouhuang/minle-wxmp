import Tops from "@/components/Top";
import SimpleCropper from '@/components/SimpleCropper'

export default {
  data() {
    return {
      uploadParam: {
        fileType: 'recruit', // 其他上传参数
        uploadURL: this.$dataURL + 'uploadAction/qcloudImg', // 上传地址
        scale: 4,  // 相对手机屏幕放大的倍数: 4倍
        size:true,
        ratio:'1.58/1'
      },
      openmipu:true,
      openxdt:false,
      ruleForm:{
      "applyAuthRealName":'',
      "applyAuthIdCardNo":'',
      "applyAuthIdCardFront":'',
      "applyAuthIdCardBack":'',
      "applyAuthIdCardHandheld":''
      },
      ischecked: false
    }
  },
  mounted(){
    this.ruleForm = { ...this.ruleForm,...this.$route.query.data }
    this.openmipu = this.$route.query.openmipu;
    this.openxdt = this.$route.query.openxdt;
  },
  methods: {
    /**
     * 回退
     */
    returns() {
      this.$router.go('-1');
    },

    /**
     * 设置身份证正面照
     */
    getMsgFormSon1(data){
      this.ruleForm['applyAuthIdCardFront'] = data;
    },
    deldpt1(){
      this.ruleForm['applyAuthIdCardFront'] = '';
    },

    /**
     * 设置身份证反面照
     */
    getMsgFormSon2(data){
      this.ruleForm['applyAuthIdCardBack'] = data;
    },
    deldpt2(){
      this.ruleForm['applyAuthIdCardBack'] = '';
    },

    /**
     * 设置手持身份证照
     */
    getMsgFormSon3(data){
      this.ruleForm['applyAuthIdCardHandheld'] = data;
    },
    deldpt3(){
      this.ruleForm['applyAuthIdCardHandheld'] = '';
    },

    /**
     * 确认提交资料
     */
    async sub(){
      console.log(this.ischecked)
      console.log(this.ruleForm.applyAuthRealName)
      console.log(this.ruleForm.applyAuthIdCardNo)
      console.log(this.ruleForm.applyAuthIdCardFront)
      debugger
      if(!this.ruleForm.applyAuthRealName){
        this.$toast('请填写真实姓名')
        return
      }

      if(!this.ruleForm.applyAuthIdCardNo){
        this.$toast('请填写身份证号码')
        return
      }

      var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      if (!idcardReg.test(this.ruleForm.applyAuthIdCardNo)) {
        this.$toast("请输入正确有效的身份证号码");
        return false;
      }



      if (!this.ruleForm.applyAuthIdCardFront) {
        this.$toast("请上传身份证正面人头照");
        return false;
      }

      if (!this.ruleForm.applyAuthIdCardBack) {
        this.$toast("请上传身份证背面国徽照");
        return false;
      }

      if (!this.ruleForm.applyAuthIdCardHandheld) {
        this.$toast("请上传手持身份证照片");
        return false;
      }


      if (!this.ischecked) {
        this.$toast('请选择《实名认证服务协议》');
        return false;
      }
      let url =""
      if(this.openmipu){
        url = "/minle/mall/mipu/apply"
      }else {
        if (this.openxdt) {
          url = "/minle/mall/dtc/apply"
        } else {
          url = "/minle/mall/mipu/addAuthentication"
        }
      }
      //this.ruleForm["mipuServiceFeeRate"]="0.2"
      const res = await  this.$http({
        method: 'post',
        url: url,
        data: this.ruleForm,
      })
      if(res.data.returnCode='ERR_0000'){
        this.$toast.success("提交成功,待平台审核")
        if(this.openxdt) {
          this.$router.push('/my/xinditan/Audit');
        } else {
          this.$router.push('/my/mipu_home/new/index');
        }
      }
    },
  },
  components: {
    Tops,
    SimpleCropper
  }
};
