<template>
  <div class="mipu">
    <div class="flow">
      <tops>
        <div slot='left' class="arrow" @click="$router.go('-1')"></div>
        <div slot='center' class="title">服务申请</div>
      </tops>
      <div class="name">服务申请流程</div>
      <div class="open">
        <div class="flow">
          <img src="./img/flow.png">
        </div>
        <div class="rectangle">
          <div class="step1" :style="{backgroundImage: 'url(' + bg + ')' }">提交申请资料</div>
          <div class="step2" :style="{backgroundImage: 'url(' + bg + ')' }">实名认证</div>
          <div class="step3" :style="{backgroundImage: 'url(' + bg + ')' }">平台审核</div>
          <div class="step4" :style="{backgroundImage: 'url(' + bg + ')' }">完成服务申请</div>
        </div>
        <button class="btnDt" @click="validate">立即申请</button>
      </div>
    </div>
  </div>
</template>

<script>
  export {default} from './js/index'
</script>
<style lang="less" scope>
  @import './less/index';
</style>
