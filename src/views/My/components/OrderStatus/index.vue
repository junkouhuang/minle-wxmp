<template>
  <div class="orderstatus">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">订单物流</div>
    </tops>
    <div class="content">
      <div class="info">
        <img :src="'@/../static/'+ expressCom+ '.png'" alt="">
        <!-- <img src="./images/huitongkuaidi.png" alt=""> -->
        <div>
          <h4>运单号： {{expressBarcode}}</h4>
          <h4>国内承运人：{{expressComName}}</h4>
        </div>
      </div>
      <cite><!--
        <h4>
          <img src="./images/shou@2x.png" alt="">
          <p>收货地址：{{address}}</p>
        </h4>-->
        <div class="info-all">
          <div v-for="(item,index) in addressData" :key="index">
            <div class="info-list" v-if="item.status=='签收'">
              <img v-if="addressData[0] && addressData[0].status=='签收' && index==0" src="./images/qianshou@2x.png" alt="">
              <img v-else-if="addressData[index-1] && addressData[index-1].status!='签收'"  src="./images/qianshou@2x.png" alt="">
              <span v-else class="round"></span>
              <div class="info-right"> 
                <h5 v-if="addressData[0] && addressData[0].status=='签收' && index==0" class="crp">已签收</h5>
                <h5 v-else class="nocrp">已签收</h5>
                <p v-if="addressData[0] && addressData[0].status=='签收' && index==0" class="crp">{{item.context}}</p>
                <p v-else class="nocrp">{{item.context}}</p>
                <span v-if="addressData[0] && addressData[0].status=='签收' && index==0" class="time">{{item.time}}</span>
                <span v-else class="notime">{{item.time}}</span>
              </div>
            </div>
            <div class="info-list" v-if="item.status=='派件'">
              <img v-if="addressData[0] && addressData[0].status=='派件' && index==0" src="./images/daiqu1-hong.png" alt="">
              <img v-else-if="addressData[index-1] && addressData[index-1].status!='派件'"  src="./images/daiqu1.png" alt="">
              <span class="round" v-else></span>
              <div class="info-right"> 
                <h5 v-if="addressData[0] && addressData[0].status=='派件' && index==0" class="crp">派送中</h5>
                <h5 v-else class="nocrp">派送中</h5>
                <p v-if="addressData[0] && addressData[0].status=='派件' && index==0" class="crp">{{item.context}}</p>
                <p v-else class="nocrp">{{item.context}}</p>
                <span v-if="addressData[0] && addressData[0].status=='派件'" class="time">{{item.time}}</span>
                <span v-else class="notime">{{item.time}}</span>
              </div>
            </div>
            <div class="info-list" v-if="item.status=='在途'">
              <img v-if="addressData[0] && addressData[0].status=='在途' && index==0" src="./images/daiqu3-hong.png"  alt="">
              <img v-else-if="addressData[index-1] && addressData[index-1].status!='在途'"  src="./images/daiqu3.png" alt="">
              <span class="round" v-else></span>
              <div class="info-right"> 
                <h5 v-if="addressData[0] && addressData[0].status=='在途' && index==0" class="crp">运输中</h5>
                <h5 v-else class="nocrp">运输中</h5>
                <p v-if="addressData[0] && addressData[0].status=='在途' && index==0" class="crp">{{item.context}}</p>
                <p v-else class="nocrp">{{item.context}}</p>
                <span v-if="addressData[0] && addressData[0].status=='在途' && index==0" class="time">{{item.time}}</span>
                <span v-else class="notime">{{item.time}}</span>
              </div>
            </div>
          </div>
        </div>
      </cite>
    </div>
  </div>
</template>

<script>
export {default} from './js/index'
</script>

<style lang="less" scope>
  @import './less/index';
</style>