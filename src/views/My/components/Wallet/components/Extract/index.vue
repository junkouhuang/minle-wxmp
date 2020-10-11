<template>
  <div class="extract">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">提现</div>
    </tops>
    <div class="e_list">    
      <div class="e_title">
        <span class="s1">提现金额</span>
       <span class="s2">可提现金额：￥{{useramount == undefined?0:useramount | money}}</span>
      </div>
      <div class="e_content">
        <van-row class="e_item">
          <van-col span="8" class="col_e" v-for="(item,index) in money" :key="index">
            <div :class="active == index?'active':''" @click="choose(index)">{{item}}元</div>
          </van-col>
        </van-row>
      </div>
    </div>
    <van-button @click="extractFun">提现</van-button>
  </div>
</template>

<script>
  export {default} from './js/index'
</script>
<style lang="less" scope>
  @import './less/index';
</style>
