<template>
  <div>
    <tops>
      <div slot='left' class="arrow" @click="$router.go(-1)"></div>
      <div slot='center' class="title">我的账户</div>
    </tops>
    <div class="integral-msg">
      <van-row type="flex" justify="center">
        <van-col span="5">
          <img class="avat" v-if="userinfo.avatar == '' || userinfo.avatar == null" src="./img/redtony.png"/>
          <van-image v-else width="60" height="60" :src="userinfo.avatar" round />
        </van-col>
        <van-col span="17" class="userinfo-detail">
          <p class="enterprise" v-if="userinfo.nickname">{{userinfo.nickname}}</p>
          <p class="virtualAccountId" v-if="userId">会员号：{{userId}}</p>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" v-if="enterpriseAccountResult.bsyStatus != 6">
        <van-col span="22" >
          <div class="integral-detail">
            <img src="./img/qi_account.png" class="corner_icon">
            <div class="name">
              <p>
                {{enterpriseAccountResult.grainStoreName}}
              </p>
            </div>
            <div  class="virtualAccountId">
              <p>企业账户：{{seen?enterpriseAccountResult.grainStoreNo:'********'}} <span  v-clipboard:copy="enterpriseAccountResult.grainStoreNo" v-clipboard:success="copy"  class="copy">复制</span></p>
              <img src="./img/eye_en_close.png" class="eyes" v-if="seen" @click="seen=fales">
              <img src="./img/eye_en_open.png" class="eyes" v-else @click="seen=true">
            </div>
            <div  class="account">
              <p>鑫泉账户：{{seen?enterpriseAccountResult.account:'********'}}<span   v-clipboard:copy="enterpriseAccountResult.account" v-clipboard:success="copy" class="copy">复制</span></p>
            </div>
            <div class="available">
              <p>账户余额：{{seen?'￥':''}}<span class="max">{{seen?enterpriseAccountResult.available:'********'}}</span></p>
            </div>
            <div class="totalFreeze">
              <p>冻结余额：{{seen?'￥':''}}<span class="max">{{seen?enterpriseAccountResult.totalFreeze:'********'}}</span></p>
            </div>
            <div class="foot" v-if="enterpriseAccountResult.bsyStatus == 9">
              <span>渤海账户管理</span>
              <div>
                <button type="default"  @click="bandCard">绑卡</button>
                <button type="default" @click="changInfo">变更</button>
              </div>
            </div>
            <div class="foot" @click="setting" v-else>
              <span>渤海账户管理</span>
              <div>
                <img src="./img/right3.png"/>
              </div>
            </div>
          </div>
        </van-col>
      </van-row>

      <van-row type="flex" justify="center" v-else>
        <van-col span="22" >
          <div class="default">
            <img src="./img/qi_account_gray.png" class="corner_icon">
            <p>{{enterpriseName}}</p>
            <button @click="register" >开户</button>
          </div>
        </van-col>
      </van-row>

    </div>
  </div>
</template>

<script>
  import Tops from "@/components/Top";
  import Vue from 'vue';
  import { Toast,Dialog   } from 'vant';
  Vue.use(Toast,Dialog );
  export default {
    name: "enterpriseOpenAccount",
    data() {
      return {
        grainStoreNo:'',
        enterpriseName:'',
        seen:true,
        enterpriseAccountResult:{},
        userId:'',
        userinfo:{}
      };
    },
    components: {
      Tops
    },
    async created() {
      this.grainStoreNo = this.$route.query.mipuNo;
      this.enterpriseName = this.$route.query.enterpriseName;
      this.enterpriseAccountResult=this.$route.query.enterpriseAccountResult;
      this.userId=this.$route.query.userId
      //await this.refresh();
      await this.getuserinfo();
      await this.getBasicInfo();
    },
    methods: {
      //获取用户
      getuserinfo() {
        this.$http({
          method: 'post',
          url: '/authorizes/user/detail',
          data: this.$qs.stringify({
            source: "kx6HIOFE5xtaK85g3JXfg3Nx0q6lZK3mGOxMzBGGCALOLUbvFPjowQ=="  
          }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
          .then(res => {
            if (res.status == 200) {
              this.userinfo = res.data.data;
            }
          }).catch(e => {

        })
      },
      setting(){
        this.$router.push('/accountAdmin/setting')
      },
      register(){
        this.$router.push({
          path:'/accountAdmin/enterpriseOpenAccount',
          query:{
            virtualAccountId:this.enterpriseAccountResult.virtualAccountId,
            grainStoreNo:this.enterpriseAccountResult.grainStoreNo,
            title:'企业开户'
          }
        })
      },
      bandCard(){
        this.$router.push({
          path:'/accountAdmin/bandCard',
          query:{
            grainStoreNo:this.enterpriseAccountResult.grainStoreNo,
          }
        })
      },
      changInfo(){
        this.$router.push({
          path:'/accountAdmin/enterpriseOpenAccount',
          query:{
            virtualAccountId:this.enterpriseAccountResult.virtualAccountId,
            grainStoreNo:this.enterpriseAccountResult.grainStoreNo,
            title:'企业变更'
          }
        })
      },
      copy(val){
        document.execCommand("Copy"); // 执行浏览器复制命令
        Toast('复制成功');
      },
      getBasicInfo(){
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
        });
        const param = {grainStoreNo: this.grainStoreNo}
        this.$http({
          method: 'post',
          url: '/minle/mall/walletBasic/getBasicInfo',
          data:this.$qs.stringify(param),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
        }).then((res) => {
          Toast.clear();
          this.enterpriseAccountResult = res.data.data.enterpriseAccountResult;
          this.userId = res.data.data.userId;
        })
      },
      next(){
        if(this.bankCardId == ''){
          Toast('请输入银行卡号');
          return;
        }
        if(this.cardOwner == ''){
          Toast('请输入持卡人姓名');
          return;
        }
        this.$router.push('/accountAdmin/bohaiBank')
      },
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
    }
  }
</script>

<style scoped lang="less">
  .integral-msg{
    margin-top: 60px;
    .userinfo-detail {
      p {
        &:first-child {
          font-size: 14px;
          margin-top: 12px;
        }
        &:last-child {
          font-size: 13px;
          margin-top: 10px;
        }
      }
    }
    .avat {
      border-radius: 100%;
      width: 60px;
      border: 2px solid #F7C986;
      display: flex;
      align-items: center;
      background-color: #ffffff;
    }
  }
  .integral-detail {
    background: #fff;
    margin-top: 15px;
    padding: 20px 0 0 0;
    border-radius: 18px;
    position: relative;
    .corner_icon {
      width: 61px;
      position: absolute;
      top: 0;
      right: 0;
    }
    .name {
      padding: 0 20px;
      p {
        font-size: 14px;
      }
    }
    .virtualAccountId {
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p{
        font-size: 13px;
        margin-top: 12px;
        display: block;
      }
      .eyes {
        width: 25px;
      }
    }
    .copy {
      display: inline-block;
      color: #DAAC58;
      font-size: 9px;
      padding: 2px;
      border-radius: 3px;
      border: 1px solid #DAAC58;
      margin-left: 10px;
    }
    .account{
      padding: 0 20px;
      p{
        font-size: 13px;
        margin-top: 8px;
        display: block;
      }
    }
    .available {
      padding: 0 20px;
      p{
        color: #808080;
        font-size: 12px;
        margin-top: 12px;
        display: block;
        .max {
          font-size:20px ;
        }
      }
    }
    .totalFreeze {
      padding: 0 20px;
      p{
        color: #808080;
        font-size: 12px;
        margin-top: 8px;
        display: block;
      }
    }
    .foot {
      background: #F9F1DC;
      padding: 8px 20px;
      margin-top: 11px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 13px;
      }
      img {
        width: 8px;
      }
      button {
        width: 62px;
        height: 26px;
        line-height: 26px;
        border-radius: 15px;
        border: 1px solid #333333;
        text-align: center;
        font-size: 14px;
        color: #333;
        background: none;
        margin-left: 10px;
      }
    }
  }
  .default {
    background: #fff;
    margin-top: 15px;
    padding: 20px;
    border-radius: 18px;
    position: relative;
    text-align: center;
    position: relative;
    img {
      width: 61px;
      position: absolute;
      right: 0;
      top: 0;
    }
    p {
      font-size: 14px;
    }
    button {
      width: 62px;
      height: 26px;
      line-height: 26px;
      border-radius: 15px;
      border: 1px solid #333333;
      text-align: center;
      font-size: 14px;
      color: #333;
      background: none;
      margin-left: 10px;
      margin-top: 20px;
    }
  }
</style>
