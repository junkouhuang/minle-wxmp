<template>
  <div class="history">
    <van-row class="searchBox">
      <van-col span="3">
        <div class="arrow" @click="returns"></div>
      </van-col>
      <van-col span="21">
        <van-search  shape="round" placeholder="搜索您想要找的店铺" class="keyword" v-model.trim="word" @search = "search"/>
      </van-col>
    </van-row>
    <div class="content5555">
      <div class="history_record" v-if="historyData!=null && historyData.length>0 ">
        <p>搜索历史<img src="./images/del.png" @click="delStroage"/></p>
        <ul>
          <li v-for="(name,index) in historyData" :key="index" @click="historyChoose(name)">{{name}}</li>
        </ul>
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
