import Tops from "@/components/Top";
import SimpleCropper from '@/components/SimpleCropper'


export default {
  data() {
    return {
      uploadParam: {
        fileType: 'recruit', // 其他上传参数
        uploadURL: this.$dataURL + 'uploadAction/qcloudImg', // 上传地址
        scale: 4  // 相对手机屏幕放大的倍数: 4倍
      },
      userImg: this.$dataURL + 'test.png',

      topic: '',
      nickname: '',
      sex: 0,
      birthday: '',
      uno: '',//会员号
      telephone: '',//手机号
      showPopup1: false,
      showPopup2: false,
      currentDate: '',
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(),

      headerImage:'',
      isClip:false,
      isPreview:false,
      isUpload:false,
      clipUrl:'',
      noScoll:function(evt){
        this.isClip && evt.preventDefault();
      },
      clip:{},


    };
  },
  components: {
    Tops,
    SimpleCropper

  },
  methods: {
    getMsgFormSon(data){
      this.topic =data;
    },
    cancel(){
      this.showPopup1 = false;
    },
    // 上传头像成功回调
    uploadHandle (data) {
      if (data.state === 'SUCCESS') {
        this.userImg = this.form.headImgUrl = data.fileId
      }
    },
    //箭头返回
    returns(){
      this.$router.go(-1);
    },
    //获取用户
    getuserinfo() {
      this.$http({
        method: 'post',
        url: '/authorizes/user/detail',
        data:  this.$qs.stringify({
          source: "kx6HIOFE5xtaK85g3JXfg3Nx0q6lZK3mGOxMzBGGCALOLUbvFPjowQ=="  
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
        .then(res => {
          if (res.status == 200) {
            this.topic = res.data.data.avatar;
            this.headerImage = res.data.data.avatar;
            this.uno = res.data.data.uno;
            this.telephone = res.data.data.telephone;
            this.nickname = res.data.data.nickname;
            this.sex = res.data.data.sex == 2 ? '女' : res.data.data.sex == 1 ? '男' : '默认';
            let year = new Date(res.data.data.birthday).getFullYear();
            let month = ((new Date(res.data.data.birthday).getMonth() + 1) < 10 ? '0' + (new Date(res.data.data.birthday).getMonth() + 1) : new Date(res.data.data.birthday).getMonth() + 1);
            let date = ((new Date(res.data.data.birthday).getDate()) < 10 ? '0' + (new Date(res.data.data.birthday).getDate()) : new Date(res.data.data.birthday).getDate());
            this.birthday = year + '-' + month + '-' + date;

            this.currentDate = new Date(year + '/' + month + '/' + date);
          }
        }).catch(e => {

      })
    },
    //上传头像|
    afterRead(clipUrl) {
      console.log(clipUrl)
      let a = new FormData();
      a.append("file",clipUrl.file);


      //this.topic = file.content;
      this.$http({
        method: 'post',
        url: '/common/image/uploads',
        data: a,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnMsg == "success") {
              this.$toast("修改成功")
              this.topic = res.data.data;
            }
          }
        }).catch(e => {

      })
    },
    //修改用户
    updateuser() {
      if (this.nickname == '' || this.nickname == null || this.nickname == undefined) {
        this.$toast('昵称不能为空')
        return false;
      }
      if (this.birthday == '' || this.birthday == null || this.birthday == undefined) {
        this.$toast('请选择生日')
        return false;
      }
      this.$http({
        method: 'post',
        url: '/authorizes/user/update',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: this.$qs.stringify({
          'nickname': this.nickname,
          'sex': this.sex == '女' ? 2 : this.sex == '男' ? 1 : 0,
          'birthday': this.birthday,
          'avatar': this.topic
        })
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnMsg == "success") {
              this.$toast("修改成功")
             setTimeout(()=>{
               this.$router.go(-1)
             },1000)
            }
            console.log(res)
          }
        }).catch(e => {

      })
    },
    //选择性别
    showpop1() {
      this.showPopup1 = true;
    },
    //选择生日
    showpop2() {
      this.showPopup2 = true;
    },
    //选择性别
    getSex(sex) {
      this.showPopup1 = false;
      this.sex = sex == 2 ? '女' : sex == 1 ? '男' : '默认';
    },
    //获取生日
    getDateTime(date) {
      this.birthday = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
      this.showPopup2 = false;
    }
  },
  mounted() {
    this.getuserinfo();
  },
};
