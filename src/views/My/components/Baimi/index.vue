<template>
  <div class="qb">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">真的省</div>
    </tops>
    <div class="qb_img">
      <div class="d1"></div>
      <div class="d2"></div>
      <van-row class="d3">
        <van-col span="12">
          <div class="d4"></div>
          <div class="d5"></div>
        </van-col>
        <van-col span="12" >
          <div class="d4"></div>
          <div class="d5"></div>
        </van-col>
      </van-row>
    </div>
    <div class="mi_nav">
       <span class="title">鑫泉健康全球一卡通</span>
    </div>
    <div class="mi_nav">
      <van-field v-model.trim="cardNo" type="number" label="卡号" maxlength="10" placeholder="请输入全球一卡通卡号" required
                   clearable/>
    </div>
    <div class="mi_nav">
      <van-field v-model.trim="password" type="number" label="密码" maxlength="6" placeholder="请输入一卡通密码" required
                   clearable/>
    </div>
    <div class="tips">
      <p class="tip">1、鑫泉健康全球一卡通为不记名卡，本卡不记名、不挂失、不计息、不兑换为现金；本卡仅供本人使用，每张卡片仅限充值使用一次；</p>
      <p class="tip">2、鑫泉真的省返现卡仅能获得鑫泉真的省APP内合作平台商品的白米粒返现，不可提现，仅限在平台内消费抵扣使用；</p>
    </div>
    <div class="contentx">
      <div class="btnsex">
        <van-button type="danger" @click="recharge">充值</van-button>
      </div>
      <div class="recordx">
        <router-link to="/my/micoupon/recharge">查看充值记录</router-link>
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
