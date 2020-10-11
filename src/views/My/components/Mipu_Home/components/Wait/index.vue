<template>
  <div class="mipu">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">我的米铺</div>
    </tops>
    <div class="Audit">
      <tops>
        <div slot='left' class="arrow" @click="returns"></div>
        <div slot='center' class="title">我的米铺</div>
        <div slot="edior" class="edior" @click="recode">交易记录</div>
      </tops>
      <div class="content">
        <div class="top">
          <img src="./img/timg.png">
          <div class="name_time">
            <p class="name">{{list.applyMipuName}}</p>
            <p class="time">申请时间：{{list.applyTime | formatDate }}</p>
          </div>
        </div>
        <div class="bottom">
          <p class="name">申请人姓名：{{list.applyAuthRealName}}</p>
          <p class="no">{{list.applyAuthIdCardNo}}</p>
        </div>
        <img src="./img/audit.png" class="audit_icon">
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
