import Tops from "@/components/Top";
import SimpleCropper from '@/components/SimpleCropper'
export default {
  data() {
    return {
      showPicker:false,
      columns: [
        // 第一列
        {
          values: [
            '00:00',
            "00:30",
            "01:00",
            "01:30",
            "02:00",
            "02:30",
            "03:00",
            "03:30",
            "04:00",
            "04:30",
            "05:00",
            "05:30",
            "06:00",
            "06:30",
            "07:00",
            "07:30",
            "08:00",
            "08:30",
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30",
            "12:00",
            "12:30",
            "13:00",
            "13:30",
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "16:00",
            "16:30",
            "17:00",
            "17:30",
            "18:00",
            "18:30",
            "19:00",
            "19:30",
            "20:00",
            "20:30",
            "21:00",
            "21:30",
            "22:00",
            "22:30",
            "23:00",
            "23:30",
          ],
          defaultIndex: 2,
        },
        // 第二列
        {
          values: [
            '00:00',
            "00:30",
            "01:00",
            "01:30",
            "02:00",
            "02:30",
            "03:00",
            "03:30",
            "04:00",
            "04:30",
            "05:00",
            "05:30",
            "06:00",
            "06:30",
            "07:00",
            "07:30",
            "08:00",
            "08:30",
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30",
            "12:00",
            "12:30",
            "13:00",
            "13:30",
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "16:00",
            "16:30",
            "17:00",
            "17:30",
            "18:00",
            "18:30",
            "19:00",
            "19:30",
            "20:00",
            "20:30",
            "21:00",
            "21:30",
            "22:00",
            "22:30",
            "23:00",
            "23:30",

          ],
          defaultIndex: 1,
        },
      ],
      list: {
        mipuCover:'',
        mipuNo: '',//米铺编号
        mipuName: '',//米铺名称
        userName: '',//店长
        mipuTelephone: '',//手机号
        mipuHours: '',//营业时间
        mipuDescribe: '',//留言
      },
      uploadParam: {
        fileType: 'recruit', // 其他上传参数
        uploadURL: this.$dataURL + 'uploadAction/qcloudImg', // 上传地址
        scale: 4  // 相对手机屏幕放大的倍数: 4倍
      },
      active:-1
    }

  },
  components: {
    Tops,
    SimpleCropper
  },
  methods: {
    /**
     * 选择营业类型
     */
    chooseType(type){
      this.active = type;
      if(type==1){
        this.list.mipuHours = '00:00～00:00'
      }
      if(type==2){
        this.list.mipuHours = '00:00～23:59'
      }
      this.showPicker = false;
    },
    /**
     * 选择时间段
     */
    changeHandle(epicker, value, index){
      this.active=-1;
      //此时返回的value就是个对象了
      let firstTime =  parseInt(value[0].split(':')[0]*60)+ parseInt(value[0].split(':')[1]);
      let secoedTime =   parseInt(value[1].split(':')[0]*60)+ parseInt(value[1].split(':')[1]);
      if(firstTime>secoedTime){
        this.$toast("起始时间不能大于结束时间")
      }else{
        this.list.mipuHours = value[0]+'～'+value[1]
      }
    },
    /**
     * 显示营业时间组件
     * @param data
     */
    showPickerHandle(){
      this.showPicker = true;
    },
    /**
     * 隐藏营业时间组件
     * @param data
     */
    cancelHandle(){
      this.showPicker = false;
    },
    getMsgFormSon(data){
      this.list.mipuCover =data;
    },
    cancel(){
      this.showPopup1 = false;
    },
    //箭头返回
    returns(){
      this.$router.go(-1);
    },
    //修改用户
    updateuser() {
      if (this.list.applyMipuTelephone == "") {
        this.$toast('手机号码不能为空');
        return false;
      }
      let reg = /^1[3,5,6,7,8,9]\d{9}$/;
      if (!reg.test(this.list.mipuTelephone)) {
        this.$toast("请输入正确的手机号码");
        return false;
      }
      this.$http({
        method: 'post',
        url: '/minle/mall/mipu/updateInfo',
        data: this.list
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnMsg == "success") {
              this.$toast("修改成功")
             setTimeout(()=>{
               this.$router.go(-1)
             },1000)
            }
          }
        }).catch(e => {

      })
    },
    /**
     * 修改手机号码
     */
    phone(){
      this.$router.push({'path':'/my/mipu_home/verification',query:{telphone:this.list.applyMipuTelephone}})
    }
  },
  mounted() {
    this.list.mipuCover= this.$route.query.list.applyMipuCover;
    this.list.mipuNo= this.$route.query.list.mipuNo;//米铺编号
    this.list.mipuName= this.$route.query.list.applyMipuName;//米铺名称
    this.list.userName= this.$route.query.list.applyUserName;//店长
    this.list.mipuTelephone= this.$route.query.list.applyMipuTelephone;//手机号
    this.list.mipuHours= this.$route.query.list.applyMipuHours;//营业时间
    this.list.mipuDescribe= this.$route.query.list.applyMipuDescribe;//留言
  },
};
