<template>
  <div class="classify"><!--
    <div class="classify_top">
      <router-link to="/"><i class="iconfont icon-zuojiantou"></i></router-link>
      <van-search placeholder="搜索你想要的商品" v-model.trim="keywords" shape="round" class="keyword" @click="toHistory" disabled/>
    </div>-->
    <div class="classify_content">
      <div class="left">
        <van-sidebar v-model="activeKey" class="list">
         <!-- <van-sidebar-item title="所有商品" @click="classify2('')"/>-->
          <van-sidebar-item :title="item.typeName" v-for="(item,index) in list" :key="index" @click="classify2(item.id)"/>
        </van-sidebar>
      </div>
      <div class="right">
       <!-- <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          :finished-text="nomore"
          @load="onLoad">-->
          <template v-if="ProductLists.length>0">
            <div v-for="(item,index) in ProductLists" :key="index" class="list">
              <p class="typeName">{{item.typeName}}</p>
              <van-row >
                <van-col span="8" v-for="(item,index) in item.types" :key="index" @click="search(item.name)">
                  <div class="item">
                    <img v-if="item.typePicture != null" lazy-load :src="item.typePicture" class="c_icon"/>
                    <img v-else lazy-load src="./images/noimg.png" class="c_icon"/>
                    <div class="title">{{item.name}}</div>
                  </div>
                </van-col>
              </van-row>
            </div>
          </template>
          <div v-else>
            <div class="content">
              <img src="./images/noimg2x.png" alt/>
              <p>{{noData}}</p>
            </div>
          </div>
        <!--</van-list>-->
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
