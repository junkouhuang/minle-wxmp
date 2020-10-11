<template>
  <div class="address">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">地址管理</div>
    </tops>
    <div class="tip" >
      <van-icon name="bullhorn-o" />
      <span>疫情期间，请佩戴好口罩 出门领取您的购物包裹  </span>
    </div>
    <div class=" list"  v-if="list.length>0">
      <van-list
        v-model="loading"
        :offset="50"
        :error.sync="error"
        :finished="finished"
        :immediate-check="false"
        finished-text=""
        @load="onLoad"
      >
        <van-radio-group v-model="radio" disabled>
          <li v-for="(item,index) in list" :key="index">
            <div>
              <div class="bar clear">
                <div class="edit">
                <span @click="editor(item)">
                  <img src="./img/bj.png" alt/>
                  <span>&nbsp;&nbsp;</span>
                </span>
                  <span @click="del(item.id,index)">
                  <img src="./img/del.png" alt/>
                  <span>&nbsp;</span>
                </span>
                </div>
              </div>
              <div class="title" @click="check(item)">
                <span class="receiverName">{{item.receiverName}}</span>
                <span class="receiverTelephone">{{item.receiverTelephone}}</span>
                <span class="default" v-if="item.defaultStatus">默认</span>
              </div>
              <div class="add" @click="check(item)">
                {{item.provinceName}}{{item.cityName}}{{item.regionName}} {{item.address}}
              </div>
            </div>
          </li>
        </van-radio-group>
      </van-list>
    </div>
    <div v-else>
      <div class="content">
        <img src="./img/address.png" alt/>
        <p>暂无地址</p>
        <div class="odiv"><router-link to="/addressAdd">添加地址</router-link></div>
      </div>
    </div>
    <div  v-show="list.length>0" class="btn" @click="$router.push({'path':'/addressAdd',query:{'type':'add'}})">
      <van-button type="danger" class="btne">
        <van-icon name="plus"/>&nbsp;<span>新增地址</span>
      </van-button>
    </div>
  </div>
</template>
<script>
  export {default} from './js/index'
</script>

<style lang="less" scoped>
  @import './less/index';
</style>


