<template>
  <van-row>
    <van-col span="6" v-for="(item,index) in toolbars"  :key="item.id" @click.stop="handleClick(index,$event)">
      <van-goods-action-icon :icon="item.icon2" :text="item.text" :class="{colRed:item.isActive}" @click="$router.push(item.url)" v-if="item.isActive" class="lists">
        <span v-if="index == 2 && caramount>0"  class="tip" >{{caramount}}</span>
        <span class="colRed">{{item.text}}</span>
      </van-goods-action-icon>
      <van-goods-action-icon :icon="item.icon1" :text="item.text"   @click="$router.push(item.url)" v-else class="lists">
        <span v-if="index == 2 && caramount>0"  class="tip" >{{caramount}}</span>
        <span>{{item.text}}</span>
      </van-goods-action-icon>
    </van-col>
  </van-row>
</template>

<script >
  export {default} from './js/index'
</script>

<style scoped lang="less">
  @import './less/index';
</style>
