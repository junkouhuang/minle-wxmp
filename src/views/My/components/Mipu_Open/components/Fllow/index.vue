<template>
  <div class="mipu">
    <div class="flow">
      <tops>
        <div slot='left' class="arrow" @click="$router.go('-1')"></div>
        <div slot='center' class="title">我的米铺</div>
      </tops>
      <div class="name">米铺流程</div>
      <div class="open">
        <div class="flow">
          <img src="./img/flow.png">
        </div>
        <div class="rectangle">
          <div class="step1" :style="{backgroundImage: 'url(' + bg + ')' }">提交米铺申请资料</div>
          <div class="step2" :style="{backgroundImage: 'url(' + bg + ')' }">实名认证</div>
          <div class="step3" :style="{backgroundImage: 'url(' + bg + ')' }">平台审核</div>
          <div class="step4" :style="{backgroundImage: 'url(' + bg + ')' }">完成</div>
        </div>
        <button class="btn" @click="validate">开通米铺</button>
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
