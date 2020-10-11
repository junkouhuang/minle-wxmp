<template>
  <div class="sqcode">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">充值记录</div>
    </tops>
    <div class=" list">
      <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          finished-text=""
          @load="onLoad"
      >
      <div class="yes" v-if="list.length>0">
        <div v-for="(item,index) in list" :key="index" class="item">
          <div class="title">{{item.type == 0?'鑫泉健康全球一卡通':''}}<span>{{item.cardNo}}</span>
          </div>
          <p class="name">会员号：{{item.userId}}<span> 白米 {{item.integralNumber}}</span>
            <img src="./img/zt03.png" v-if="item.status == 1"/>
          </p>
          <p class="remark" v-if="item.status">{{item.status?'充值成功':''}}
          <span>充值时间：{{item.createTime | formatDate}}</span>
          </p>
        </div>
      </div>
      <div class="no" v-else>
        <img src="./img/noimg.png" alt/>
        <p class="text">暂无数据</p>
        <div class="odiv"><router-link to="/my/micoupon">快去充值吧</router-link></div>
      </div>
      </van-list>
    </div>
  </div>
</template>
<script>
  export {default} from './js/index'
</script>

<style lang="less" scoped>
  @import './less/index';
</style>


