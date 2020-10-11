<template>
  <div class="pshome">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">选品管理</div>
      <div slot='edior' class="edior" @click="editHandle">{{!editshow? '编辑': '取消'}}</div>
    </tops>
    <div class="list-content" id="list-content">
      <van-pull-refresh v-model="isLoading" class="h_scroll" @refresh="onRefresh">
        <div class="you">
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad">
            <van-row class="h_row">
              <van-col span="8" v-for="(hot,index) in ProductList_you" :key="index" class="h_item">

                <van-image lazy-load :src="hot.titlePicture==''?noimg:`${hot.titlePicture}`" class="c_icon" @click="detail(hot)"/>
                <div class="hotName">
                  <div class="fui-name">{{hot.name}}</div>
                </div>

                <div class="hotprice">
                  <div class="pr"><em>￥</em>{{hot.price}}</div>

                  <div class="chose" v-if="editshow">
                    <van-checkbox :name="hot.commodityNo" v-model="hot.check" checked-color="#FF5555" ></van-checkbox>
                  </div>
                </div>

              </van-col>
            </van-row>
          </van-list>
        </div>

      </van-pull-refresh>
    </div>
    <button class="delete" @click="delHandle" v-if="editshow">删除</button>
  </div>
</template>

<script>
  export {default} from './js/index'
</script>

<style lang="less" scoped>
  @import './less/index';
</style>
