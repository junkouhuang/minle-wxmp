<template>
  <div class="sqcode">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">我的申请</div>
    </tops>
    <div class=" list">
      <div class="yes" v-if="list.length>0">
        <div v-for="(item,index) in list" :key="index" class="item">
          <div class="applyAgentLevel" color="#ec1212">{{item.applyAgentLevel == 2?'区县代理':item.applyAgentLevel == 3?'市代理IP':item.applyAgentLevel == 4?'省代理IP':''}}
          </div>
          <p class="name">{{item.applyAgentName}}<span>{{item.applyAgentTelephone}}</span>
            <img src="./img/zt01.png" v-if="item.applyStatus == 0"/>
            <img src="./img/zt02.png" v-if="item.applyStatus == 1"/>
            <img src="./img/zt03.png" v-if="item.applyStatus == 2"/>
            <!--<img src="./img/zt04.png" v-if="item.applyStatus == 3"/>-->
          </p>
          <p class="applyAgentProvince">{{item.applyAgentProvince}}{{item.applyAgentCity}}{{item.applyAgentRegion}}{{item.applyAgentAddress}}</p>
          <p class="applyTime">{{item.applyTime | formatDate}}</p>
          <p class="remark" v-if="item.applyStatus == 2">{{item.remark}}</p>
          <!--<p class="tip" v-if="item.applyStatus == 3" @click="activeEq(item.applyAgentLevel)">激活{{item.applyAgentLevel == 1?'米橱':item.applyAgentLevel == 2?'米铺':item.applyAgentLevel == 3?'米柜':item.applyAgentLevel == 4?'米仓':''}}</p>-->
        </div>
      </div>
      <div class="no" v-else>
        <img src="./img/noimg.png" alt/>
        <p class="text">暂无数据</p>
        <div class="odiv" @click="myClick('/my/dlapplay')">快去申请吧</div>
      </div>
    </div>
  </div>
</template>
<script>
  export {default} from './js/index'
</script>

<style lang="less" scoped>
  @import './less/index';
</style>


