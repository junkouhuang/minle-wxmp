<template>
  <div class="mipu">
    <div class="Failed">
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
            <p class="time">申请时间：{{list.applyTime | formatDate}}</p>
          </div>
        </div>
        <div class="bottom">
          <p class="name">申请人姓名：{{list.applyAuthRealName}}</p>
          <p class="no">{{list.applyAuthIdCardNo }}</p>
        </div>
        <img src="./img/failed.png" class="fail_icon">
      </div>
      <p class="cause">
        审核不通过原因：<span>{{list.remark}}</span>
      </p>
      <p class="cause_time">审核时间：{{list.applyTime | formatDate}}</p>
      <button @click="next" class="btn">重新上传照片</button>
    </div>
  </div>
</template>

<script>
  export {default} from './js/index'
</script>
<style lang="less" scope>
  @import './less/index';
</style>
