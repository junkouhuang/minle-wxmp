<template>
  <div class="replacement">
    <!--<div class="hsz">回收站</div>-->
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">我的订单</div>
    </tops>
    <div class="content">
      <van-tabs v-model="active" :swipe-threshold="5" sticky color="#FF5555" line-width="20px" @change="$router.push({'path':'/order',query:{status:0}})" >
        <van-tab title="其他订单">

        </van-tab>
        <van-tab title="退/换货">
          <div class="whole">
            <div class="yes" v-if="arr.length>0">
               <van-list
                v-model="loading"
                :immediate-check="false"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <li v-for="(item,index) in arr" :key="index" >
                  <div class="time" @click="detail(item)">
                    <span>订单号: {{item.orderNo}}</span>
                    <span v-if="item.status==5" class="right">申请退换货</span>
                    <span v-if="item.status==6" class="right" style="color: #727272;">商家同意退换货</span>
                    <span v-if="item.status==7" class="right" style="color:#FF5555;">商家拒绝退换</span>
                  </div>
                  <div class="contente">
                    <div class="left" v-for="(item,index) in item.orderDetailDO" :key="index" >
                      <div>
                         <img v-lazy="item.title_picture"/>
                      </div>
                      <div class="texts">
                        <div class="titles">{{item.name}}</div>
                        <div class="name">{{item.specifications}}</div>
                      </div>
                      <div class="ends">
                        <span>￥{{item.single_total_amount}}</span>
                        <br/>
                        <span style="color:#999;margin-top:6px;display:inline-block">×{{item.amount}}</span>
                      </div>
                    </div>

                    <div class="jie">
                      <span class="tex">
                        共{{item.orderDetailDO.length}}个商品&nbsp;&nbsp; 实付&nbsp;
                        <span class="mnys"><em>￥</em>{{item.realpay}}</span>
                      </span>
                    </div>
                    <div class="end" v-if="item.status==0">
                      <div class="btm">
                        <div class="qx">取消订单</div>
                        <div class="zf">支付订单</div>
                      </div>
                    </div>
                  </div>
                </li>
              </van-list>
            </div>
            <div class="no" v-else >
              <img src="./images/noimg.png" alt/>
              <p class="text">暂无订单</p>
              <div class="oDiv"><router-link to="/home">快去购物吧</router-link></div>
            </div>
          </div>
        </van-tab>

      </van-tabs>
    </div>
  </div>
</template>
<script>
  export {default} from './js/index'
</script>

<style lang="less" scope>
  @import './less/index';
</style>

