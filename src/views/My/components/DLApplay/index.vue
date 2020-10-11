<template>
  <div class="dlapply">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">合伙人申请</div>
    </tops>
    <div class="content">
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell  v-for="(level,index) in levelList" :key="index" :title="level.name" clickable @click="radioFun(level.id)" v-if="level.id==0 || level.id==1 || level.id==2 || level.id==3 || level.id==4 ">
            <van-radio slot="right-icon" :name="level.id" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>

      <p class="tip1">暂不支持申请比自己推荐人级别高的代理等级。</p>

      <div class="btnsedl">
        <van-button type="danger" @click="next">下一步</van-button>
      </div>
      
      <div class="record">
        <router-link to="/my/sqcord">我的申请</router-link>
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
