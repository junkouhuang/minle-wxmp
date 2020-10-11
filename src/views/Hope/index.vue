<template>
  <div class="hope">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">敬请期待</div>
    </tops>
    <div class="content">
      <img src="./images/bj2.png" class="bj2"><br/>
      <img src="./images/bj3.png" class="bj3">
    </div>
  </div>
</template>

<script>
    import Tops from "@/components/Top";
    export default {
      name: "index",
      components:{
        Tops
      },
      methods:{
        returns(){
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped lang="less">
  .hope {
    .content {
      background: url("./images/bj1.png") no-repeat;
      width: 100%;
      height: calc(100vh - 1.1736rem);
      position: absolute;
      background-size: 100% 100%;
      margin-top: 1.1736rem;
      background-color: #fff;
      text-align: center;

      .bj2 {
        height: 20%;
        margin-top: 20%;
      }

      .bj3 {
        height: 50%;;
        margin-top: 5%;
      }
    }
  }
</style>
