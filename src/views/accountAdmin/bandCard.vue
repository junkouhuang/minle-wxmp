<template>
  <div>
    <tops>
      <div slot='left' class="arrow" @click="$router.go(-1)"></div>
      <div slot='center' class="title">银行卡绑定</div>
    </tops>
    <van-field v-model="bankCardId" label="银行卡号" placeholder="请输入法人对私银行卡号" maxlength="19" input-align="right" class="bankCardId" required/>
    <van-field v-model="cardOwner" label="持卡人姓名"  placeholder=" 请输入持卡人姓名" maxlength="20" input-align="right" required/>
    <van-row type="flex" justify="center">
      <van-col span="22"><van-button type="danger" round  block @click.prevent="next">下一步</van-button></van-col>
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
        bankCardId:'',
        cardOwner:'',
        grainStoreNo:''
      };
    },
    components: {
      Tops
    },
    async created() {
      this.grainStoreNo = this.$route.query.grainStoreNo;
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
      next(){
        if(this.bankCardId == ''){
          Toast('请输入银行卡号');
          return;
        }
        if(!validate.bankCard(this.bankCardId)){
          Toast('银行卡号格式不正确');
          return;
        }
        if(this.cardOwner == ''){
          Toast('请输入持卡人姓名');
          return;
        }
        const params = {
          bankCardId: this.bankCardId,
          cardOwner: this.cardOwner,
          grainStoreNo:this.grainStoreNo,
        }
        this.$http({
          method: 'post',
          url:'/minle/mall/walletBasic/bindBankCard',
          data:this.$qs.stringify(params),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
        }).then((res) => {
          const webUrl = encodeURIComponent(`${res.data.data.nextPageUrl}&AccessToken=${res.data.data.accessToken}`)
          this.$router.push({
            path:'/accountAdmin/bohaiBank',
            query:{
              nextPageUrl:webUrl,
            }})
        })
      }
    }
  }
</script>

<style scoped lang="less">

  .bankCardId{
    margin-top: 45px;
  }

  button {
    margin-top: 20px;
  }


</style>
