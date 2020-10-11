<template>
  <div class="dlapply">
    <div class="top">
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">服务中心</div>
    </div>
    <div class="xdtcontent">
      <div class="xdtetop"></div>
      <div class="xdtetop2"></div>
      <div class="xdtetop3"></div>
      <div class="xdtetop4"></div>
      <div class="xdtetop5"></div>
      <div class="xdtetop6"></div>
      <div class="xdtetop7"></div>
      <div class="xdtetop8"></div>
      <div class="xdtetopx">
        <van-row class="content00">
          <van-col span="6" class="item" v-for="(item,index) in icon" :key="index">
            <img :src="item.imgurl">
            <p>{{item.name}}</p>
          </van-col>
        </van-row>
      </div>
      <div class="xdtcont">
        <div class="d1" @click="openEq(1)"></div>
        <div class="d2" @click="openEq(2)"></div>
        <div class="d3" @click="openEq(3)"></div>
        <div class="d4" @click="openEq(4)"></div>
      </div>

      <p class="tip-t"></p>
      <p class="tip1"></p>
      <p class="tip2"></p>
      <div class="xdtrecord">
        <router-link to="/my/xinditan/Audit">我的服务</router-link>
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
