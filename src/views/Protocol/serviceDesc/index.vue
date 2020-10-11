<template>
  <div class="protocol">
      <tops>
        <div slot='left' class="arrow" @click="returns"></div>
        <div slot='center' class="title">应用介绍</div>
      </tops>
    <div class="list">
      <div class="item">
        <p><b>应用简介</b></p>
        <p>民乐荟品质生活商城由民乐荟(深圳)健康产业有限公司于2020年倾力打造，以健康、绿色、环保、智能产品为特色，并全面覆盖其它多品类高品质消费品，链接线上线下全场景的新零售电商购物商城，致力于为广大消费者提供有特色、有品质、更便捷的购物新体验，省钱，省心。百业无界，百业融合。全民通过线上、线下正常消费，消费者只要日常消费即可零成本做到花你原本该花的钱；省你原本不该省的钱；赚你原本不该赚的钱；花钱即赚钱，分享也赚钱，购物天天奖、消费福利天天有、每天自动到账从而助大家实现财富永动机，“躺赚人生”、“睡后收入”将不再是梦。</p>
        <p><b>版权归属</b></p>
        <p>民乐荟(深圳)健康产业有限公司</p>
        <p><b>当前版本</b></p>
        <p>民乐荟商城&nbsp;&nbsp; V1.0</p>
      </div>
    </div>
  </div>

</template>

<script>
  import Tops from "@/components/Top";
  import eventBus from '@/common/js/evenbus'

  export default {
    name: "index",
    data(){
      return {
        frm:[]
      }
    },
    components: {
      Tops
    },
    methods:{
      //回退
      returns() {
        this.$router.go(-1)
      },
      agree(){
        this.$router.back()
      }
    },
    created(){
    },
    mounted(){
      this.frm = this.$route.query.fm;
    },
    destroyed(){
      eventBus.$emit('agree',{'fm':this.frm,'agree':true})
    }
  }
</script>

<style scoped lang="less">
  .protocol {
    p {
      margin-bottom: 15px;
    }

    .list {
      padding: 1.8rem 28px 122px 28px;

      .item {
        color: #333333;
        font-size: 14px;
        text-align: left;
        line-height: 28px;
        margin-bottom: 20px;

      }
    }

    .agree {
      width: 100%;
      height: 80px;
      background-color: rgba(255, 255, 255, .85);
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;

      div {
        color: #ffffff;
        background: linear-gradient(270deg,#FF5555,#FF5555);
        box-shadow: 0 0.106667rem 0.16rem 0 rgba(27, 191, 128, 0.3);
        border-radius: 25px;
        font-size: 16px;
        width: 169px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        margin: auto;
        position: relative;
        top: 17px;
        left: 0;
        right: 0;
      }
    }
  }
</style>
