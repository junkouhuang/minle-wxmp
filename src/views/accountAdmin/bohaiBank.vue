<template>
  <div>
    <tops>
      <div slot='left' class="arrow" @click="$router.go(-1)"></div>
      <div slot='center' class="title">线上渤海银行</div>
    </tops>
    <iframe name="myiframe" id="myrame" :src="nextPageUrl" frameborder="0" align="left" width="100%" height="100%"  border="0" marginwidth="0" marginheight="0" scrolling="no" class="iframesty" onload="changeFrameHeight()">
      <p class="tip">你的浏览器不支持iframe标签</p>
    </iframe>


  </div>
</template>

<script>
  import Tops from "@/components/Top";
  export default {
    name: "enterpriseOpenAccount",
    data() {
      return {
        nextPageUrl:''
      };
    },
    components: {
      Tops
    },
    methods: {

    },
    mounted() {
      localStorage.setItem('isHandle',true)
      this.nextPageUrl = decodeURIComponent(this.$route.query.nextPageUrl)
    }
  }
</script>

<style scoped lang="less">
  .bankCardId{
    margin-top: 45px;
  }
iframe {
  width: calc(100vw);
  height: calc(100vh);
}
</style>
