<template>
  <div class="order">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">我的订单</div>
    </tops>
    <div class="content_order" >
      <van-tabs v-model="active" :swipe-threshold="5" swipeable @change="tabChange" sticky color="#FF5555" line-width="20px">
        <van-tab title="全部"  >
          <div class="whole">
            <div class="yes" v-if="list.length>0">
              <van-list
                v-model="loading"
                :immediate-check="false"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <ul>
                  <li v-for="(item,index) in list" :key="index">
                    <div class="time" >
                      <span @click="detail(item)">订单号 {{item.orderNo}}</span>
                      <span v-if="item.status==0" class="right" style="color:#FF5555;">待付款</span>
                      <span v-if="item.status==1" class="right">待商家发货</span>
                      <span v-if="item.status==2" class="right">待确认收货</span>
                      <span v-if="item.status==3" class="right" style="color: #727272;">已完成
                      <span class="right-icon" @click="deletes(item,index)"><img src="./img/delete.png"/></span></span>
                      <span v-if="item.status==4" class="right" style="color: #727272;">订单取消
                      <span class="right-icon" @click="deletes(item,index)"><img src="./img/delete.png"/></span></span>

                      <span v-if="item.status==5" class="right">申请退换货</span>
                      <span v-if="item.status==6" class="right" style="color: #727272;">商家同意退换货</span>
                      <span v-if="item.status==7" class="right" style="color:#FF5555;">商家拒绝退换</span>
                    </div>
                    <div class="contente">
                      <div class="left" v-for="(ite,ind) in item.orderDetailDO" :key="ind" @click="detail(item)">
                        <div>
                          <img :src="ite.title_picture" alt/>
                        </div>
                        <div class="texts">
                          <div class="titles">{{ite.name}}</div>
                          <div class="name">{{ite.specifications}}</div>
                        </div>
                        <div class="ends">
                          <span>￥{{ite.single_total_amount}}</span>
                          <br/>
                          <span style="color:#999;margin-top:6px;display:inline-block">×{{ite.amount}}</span>
                        </div>
                      </div>
                      <div class="jie">
                        <span class="tex">
                          共{{item.orderDetailDO.length}}个商品&nbsp;&nbsp;实付&nbsp;
                          <span v-if="item.status==0" class="mnyp"><em>￥</em>{{item.realpay}}</span>
                          <span v-else class="mnys"><em>￥</em>{{item.realpay}}</span>
                        </span>
                      </div>
                      <div class="end" v-if="item.status==0">
                        <div class="btm">
                          <div class="qx" @click="cancel(item,index)">取消订单</div>
                          <div class="zf" @click="validate(item)">支付订单</div>
                        </div>
                      </div>
                      <!--
                      <div class="end" v-if="item.status==1">
                        <div class="btm">
                          <div class="qx" @click="cancel(item,index)">取消订单</div>
                        </div>
                      </div>-->
                      <div class="end" v-if="item.status==2">
                      <div class="btm">
                        <!--<div class="qx" @click="cancel(item,index)">取消订单</div>-->
                        <div class="sh" @click="confirmsh(item,index)">确认收货</div>
                      </div>
                    </div>
                    </div>
                  </li>
                </ul>
              </van-list>
            </div>
            <div class="no" v-else>
              <img src="./img/noimg.png" alt/>
              <p class="text">暂无数据</p>
              <div class="oDiv">
                <router-link to="/home">快去购物吧</router-link>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="待付款">
          <div class="whole">
            <div class="yes" v-if="list.length>0">
              <van-list
                v-model="loading"
                :offset="50"
                :immediate-check="false"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <li v-for="(item,index) in list" :key="index">
                  <div
                    class="time"
                    @click="detail(item)"
                  >
                    <span>订单号: {{item.orderNo}}</span>
                    <span class="right" style="color:#FF5555">待付款

                    </span>
                  </div>
                  <div class="contente">
                    <div class="left" v-for="(ite,ind) in item.orderDetailDO" :key="ind" @click="detail(item)">
                      <div>
                        <img v-lazy="ite.title_picture" alt/>
                      </div>
                      <div class="texts">
                        <div class="titles">{{ite.name}}</div>
                        <div class="name">{{ite.specifications}}</div>
                      </div>
                      <div class="ends">
                        <span>￥{{ite.single_total_amount}}</span>
                        <br/>
                        <span style="color:#999;margin-top:6px;display:inline-block">×{{ite.amount}}</span>
                      </div>
                    </div>

                    <div class="jie">
                      <span class="tex">
                        共{{item.orderDetailDO.length}}个商品&nbsp;&nbsp;实付&nbsp;
                        <span class="mnyp"><em>￥</em>{{item.realpay}}</span>
                      </span>
                    </div>
                    <div class="end" v-if="item.status==0">
                      <div class="btm">
                        <div class="qx" @click="cancel(item)">取消订单</div>
                        <div class="zf" @click="pay(item)">支付订单</div>
                      </div>
                    </div>
                  </div>
                </li>
              </van-list>
            </div>
            <div class="no" v-else>
              <img src="./img/noimg.png" alt/>
              <p class="text">暂无数据</p>
              <div class="oDiv">
                <router-link to="/home">快去购物吧</router-link>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="待发货">
          <div class="whole">
            <div class="yes" v-if="list.length>0">
              <van-list
                :offset="50"
                :finished="finished"
                :immediate-check="false"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <li v-for="(item,index) in list" :key="index">
                  <div
                    class="time"
                    @click="detail(item)"
                  >
                    <span>订单号: {{item.orderNo}}</span>
                    <span class="right">待商家发货</span>
                  </div>
                  <div class="contente">
                    <div class="left" v-for="(ite,ind) in item.orderDetailDO" :key="ind" @click="detail(item)">
                      <div>
                        <img v-lazy="ite.title_picture" alt/>
                      </div>
                      <div class="texts">
                        <div class="titles">{{ite.name}}</div>
                        <div class="name">{{ite.specifications}}</div>
                      </div>
                      <div class="ends">
                        <span>￥{{ite.single_total_amount}}</span>
                        <br/>
                        <span style="color:#999;margin-top:6px;display:inline-block">×{{ite.amount}}</span>
                      </div>
                    </div>

                    <div class="jie">
                      <span class="tex">
                        共{{item.orderDetailDO.length}}个商品&nbsp;&nbsp;实付&nbsp;
                        <span class="mnys"><em>￥</em>{{item.realpay}}</span>
                      </span>
                    </div>
                    <div class="end" v-if="item.status==0">
                      <div class="btm">
                        <div class="qx" @click="cancel(item,index)">取消订单</div>
                      </div>
                    </div>
                  </div>
                </li>
              </van-list>
            </div>
            <div class="no" v-else>
              <img src="./img/noimg.png" alt/>
              <p class="text">暂无数据</p>
              <div class="oDiv">
                <router-link to="/home">快去购物吧</router-link>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="待收货">
          <div class="whole">
            <div class="yes" v-if="list.length>0">
              <van-list
                v-model="loading"
                :offset="50"
                :immediate-check="false"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <li v-for="(item,index) in list" :key="index">
                  <div
                    class="time"
                    @click="detail(item)"
                  >
                    <span>订单号: {{item.orderNo}}</span>
                    <span class="right">待确认收货</span>
                  </div>
                  <div class="contente">
                    <div class="left" v-for="(ite,ind) in item.orderDetailDO" :key="ind" @click="detail(item)">
                      <div>
                        <img v-lazy="ite.title_picture" alt/>
                      </div>
                      <div class="texts">
                        <div class="titles">{{ite.name}}</div>
                        <div class="name">{{ite.specifications}}</div>
                      </div>
                      <div class="ends">
                        <span>￥{{ite.single_total_amount}}</span>
                        <br/>
                        <span style="color:#999;margin-top:6px;display:inline-block">×{{ite.amount}}</span>
                      </div>
                    </div>

                    <div class="jie">
                      <span class="tex">
                        共{{item.orderDetailDO.length}}个商品&nbsp;&nbsp;实付&nbsp;
                        <span class="mnyr"><em>￥</em>{{item.realpay}}</span>
                      </span>
                    </div>
                    <div class="end" v-if="item.status==2">
                      <div class="btm">
                        <div class="sh" @click="confirmsh(item,index)">确认收货</div>
                      </div>
                    </div>
                  </div>
                </li>
              </van-list>
            </div>
            <div class="no" v-else>
              <img src="./img/noimg.png" alt/>
              <p class="text">暂无数据</p>
              <div class="oDiv">
                <router-link to="/home">快去购物吧</router-link>
              </div>
            </div>
          </div>
        </van-tab>
        <!--<van-tab title="已完成">
          <div class="whole">
            <div class="yes" v-if="list.length>0">
              <van-list
                v-model="loading"
                :offset="50"
                :immediate-check="false"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <li v-for="(item,index) in list" :key="index">
                  <div class="time">
                    <span @click="detail(item)">订单号: {{item.orderNo}}</span>
                    <span class="right">已完成
                      <span class="right-icon" @click="deletes(item,index)"><img src="./img/delete.png"/></span>
                    </span>
                  </div>
                  <div class="contente">
                    <div class="left" v-for="(ite,ind) in item.orderDetailDO" :key="ind">
                      <div>
                        <img v-lazy="ite.title_picture" alt/>
                      </div>
                      <div class="texts">
                        <div class="titles">{{ite.name}}</div>
                        <div class="name"></div>
                      </div>
                      <div class="ends">
                        <span>￥{{ite.single_total_amount}}</span>
                        <br/>
                        <span style="color:#999;margin-top:6px;display:inline-block">×{{ite.amount}}</span>
                      </div>
                    </div>

                    <div class="jie">
                      <span class="tex">
                        共{{item.orderDetailDO.length}}个商品&nbsp;&nbsp;实付&nbsp;
                        <span class="mnyc"><em>￥</em>{{item.realpay}}</span>
                      </span>
                    </div>
                    
                  </div>
                </li>
              </van-list>
            </div>
            <div class="no" v-else >
              <img src="./img/noimg.png" alt/>
              <p class="text">暂无数据</p>
              <div class="oDiv"><router-link to="/home">快去购物吧</router-link></div>
            </div>
          </div>
        </van-tab>-->
        <van-tab title="已取消">
          <div class="whole">
            <div class="yes" v-if="list.length>0">
              <van-list
                v-model="loading"
                :offset="50"
                :immediate-check="false"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <li v-for="(item,index) in list" :key="index">
                  <div class="time">
                    <span @click="detail(item)">订单号: {{item.orderNo}}</span>
                    <span class="right" style="color:#747474;">订单取消
                      <span class="right-icon" @click="deletes(item,index)"><img src="./img/delete.png"/></span>
                    </span>
                  </div>
                  <div class="contente">
                    <div class="left" v-for="(ite,ind) in item.orderDetailDO" :key="ind" @click="detail(item)">
                      <div>
                        <img v-lazy="ite.title_picture" alt/>
                      </div>
                      <div class="texts">
                        <div class="titles">{{ite.name}}</div>
                        <div class="name">{{ite.specifications}}</div>
                      </div>
                      <div class="ends">
                        <span>￥{{ite.single_total_amount}}</span>
                        <br/>
                        <span style="color:#999;margin-top:6px;display:inline-block">×{{ite.amount}}</span>
                      </div>
                    </div>

                    <div class="jie">
                      <span class="tex">
                        共{{item.orderDetailDO.length}}个商品&nbsp;&nbsp;实付&nbsp;
                        <span class="mnyc"><em>￥</em>{{item.realpay}}</span>
                      </span>
                    </div>
                  </div>
                </li>
              </van-list>
            </div>
            <div class="no" v-else>
              <img src="./img/noimg.png" alt/>
              <p class="text">暂无数据</p>
              <div class="oDiv">
                <router-link to="/home">快去购物吧</router-link>
              </div>
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
