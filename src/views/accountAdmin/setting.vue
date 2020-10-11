<template>
  <div>
    <tops>
      <div slot='left' class="arrow" @click="$router.go(-1)"></div>
      <div slot='center' class="title">渤海账户管理</div>
    </tops>
    <van-field v-model="bankCardId" label="交易密码" placeholder="" maxlength="19" input-align="right" class="bankCardId" readonly right-icon="arrow" @click="pwd"/>
  </div>
</template>

<script>
  import Tops from "@/components/Top";
  import Vue from 'vue';
  import { Toast } from 'vant';
  Vue.use(Toast);
  export default {
    name: "enterpriseOpenAccount",
    data() {
      return {

      };
    },
    components: {
      Tops
    },
    async created() {

    },
    methods: {
      pwd(){
        Toast('正在开发中');
      },
    }
  }
</script>

<style scoped lang="less">

  .bankCardId{
    margin-top: 45px;
  }



</style>
