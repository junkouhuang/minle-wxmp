<template>
  <div>
    <tops>
      <div slot='left' class="arrow" @click="$router.go(-1)"></div>
      <div slot='center' class="title">{{title}}</div>
    </tops>
    <p class="title">填写企业资料</p>
    <van-field v-model="grainStoreName" type="text" label="公司账户名称" placeholder="请输入公司账户名称" maxlength="24" input-align="right"  required />
    <van-field v-model="userType" type="text"  label="绑卡类型"  placeholder="企业法人/负责人对私账户" maxlength="20" input-align="right"   required readonly />
    <van-field v-model="mobilePhone" type="tel" label="手机号码" placeholder="被绑账户预留银行手机号" maxlength="11" input-align="right"   required/>
    <van-field v-model="qualificationsNumber" type="text" label="营业执照编号" placeholder="请输入统一社会信用代码" maxlength="24" input-align="right"   required/>
    <van-field v-model="bossName" type="text" label="法定代表人/负责人姓名" placeholder="请输入法定代表人/负责人姓名" maxlength="20" input-align="right"   required/>
    <van-field v-model="certNo" type="text" label="法定代表人/负责人身份证号" placeholder="请输入法定代表人/负责人身份证" maxlength="18" input-align="right"   required/>
    <van-row type="flex" justify="center">
      <van-col span="22"><van-button  round  block @click.prevent="next" class>下一步</van-button></van-col>
    </van-row>
    <van-row type="flex" justify="center">
      <van-col span="22">
        <p>开户说明：</p>
        <p>1、本页为渤海银行企业开户资料填写页面；</p>
        <p>2、提交开户资料后,将自动跳转到渤海银行系统完成开户；</p>
        <p>3、该账户资金由渤海银行监管。</p>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  import Tops from "@/components/Top";
  import validate from "@/utils/validate";
  import Vue from 'vue';
  import { Toast } from 'vant';
  Vue.use(Toast);
  export default {
    name: "enterpriseOpenAccount",
    data() {
      return {
        title:'',
        userType:'企业法人/负责人对私账户',
        grainStoreName:'',
        mobilePhone:'',
        qualificationsNumber:'',
        bossName:'',
        certNo:'',
        virtualAccountId:'',
        grainStoreNo:'',
      };
    },
    components: {
      Tops
    },
     created() {
      this.title = this.$route.query.title;
      this.virtualAccountId = this.$route.query.virtualAccountId;
      this.grainStoreNo = this.$route.query.grainStoreNo;
      this.getBsyInfo();
    },
     mounted() {
      this.refresh();
       if (localStorage.getItem('isHandle') == 'true') {
         this.$dialog.confirm({
           title: '',
           message: '是否开户成功',
           confirmButtonText:'是',
           cancelButtonText:'否',
         }).then(() => {
           this.refresh();
           localStorage.removeItem('isHandle');
           this.$router.go(-1)
         }).catch(() => {
           localStorage.removeItem('isHandle');
         });
       }
    },
    destroyed(){
      localStorage.removeItem('isHandle');
    },
    methods: {
      refresh(){
        const param = {grainStoreNo: this.grainStoreNo}
        this.$http({
          method: 'post',
          url: '/minle/mall/walletBasic/grainStoreInfo',
          data:this.$qs.stringify(param),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
        }).then((res) => {
          console.log(res)

        })
      },
      getBsyInfo(){
        const param = {virtualAccountId: this.virtualAccountId}
        this.$http({
          method: 'post',
          url: '/minle/mall/walletBasic/getBsyInfo',
          data:this.$qs.stringify(param),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
        }).then((res) => {
          this.grainStoreName = res.data.data.grainStoreName
          this.mobilePhone= res.data.data.mobilePhone
          this.qualificationsNumber= res.data.data.qualificationsNumber
          this.bossName= res.data.data.bossName
          this.certNo= res.data.data.certNo
        })
      },
      next(){
        let that = this;
        if(this.grainStoreName == ''){
          Toast('请输入公司账户名称');
          return;
        }
        if(this.mobilePhone == ''){
          Toast('请输入被绑账户预留银行手机号');
          return;
        }
        if(!validate.phone(this.mobilePhone)){
          Toast('手机号码格式不正确');
          return;
        }
        if(this.qualificationsNumber == ''){
          Toast('请输入统一社会信用代码');
          return;
        }
        if(this.bossName== ''){
          Toast('请输入法定代表人/负责人姓名');
          return;
        }
        if(this.certNo == ''){
          Toast('请输入法定代表人/负责人身份证');
          return;
        }
        if(!validate.idCard(this.certNo)){
          Toast('身份证号码格式不正确');
          return;
        }
        localStorage.setItem('isHandle',true)
        const params = {
          grainStoreName: this.grainStoreName,
          userType: 4,
          bossName: this.bossName,
          certNo: this.certNo,
          mobilePhone: this.mobilePhone,
          grainStoreNo:this.grainStoreNo,
          qualificationsNumber: this.qualificationsNumber,
          deviceType: 'MOBILE',
          virlAcctType:this.virtualAccountId,
        }
        this.$http({
          method: 'post',
          url:'/minle/mall/walletBasic/grainStoreCreateUser',
          data:params,
        }).then((res) => {
          if(res.data.returnCode == "ERR_0000"){
          const webUrl = encodeURIComponent(`${res.data.data.nextPageUrl}&AccessToken=${res.data.data.accessToken}`)
          this.$router.push({
            path:'/accountAdmin/bohaiBank',
            query:{
              nextPageUrl:webUrl,
            }})
          }else{
            Toast(res.data.returnMsg)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">

  .title{
    display: block;
    height:30px;
    margin-top: 45px;
    padding-left:17px;
    font-size:12px;
    color:#868686;
    line-height:30px;
    box-sizing: border-box;
  }

  button {
    margin: 20px auto 10px;
  }

  p {
    margin-top: 10px;
    font-size: 13px;
  }

</style>
