<template>
  <div class="myvip">
    <tops class="top">
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">我的粉丝</div>
    </tops>
    


    <div class="content_99">
      <div class="fans">
        <van-row>
          <van-col span="8">
            <div class="xin">
              <img src="./img/xin.png"/>
              <p class="p1">总粉丝</p>
              <p class="p2">{{totalFans}}</p>
            </div>
          </van-col>
          <van-col span="16">
            <van-row>
              <van-col span="12">
                <div class="sl">
                  <p class="p1">今日新增</p>
                  <p  class="p2">{{todayFans}}</p>
                </div>
              </van-col>
              <van-col span="12">
                <div class="sl">
                  <p class="p1">昨日邀请</p>
                  <p  class="p2">{{yesterdayFans}}</p>
                </div>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="12">
                <div class="s2">
                  <p class="p1">本期新增</p>
                  <p  class="p2">{{currWeekFans}}</p>
                </div>
              </van-col>
              <van-col span="12">
                <div class="s2">
                  <p class="p1">本月新增</p>
                  <p  class="p2">{{currMonthFans}}</p>
                </div>
              </van-col>
            </van-row>
          </van-col>
        </van-row>
      </div>

      <van-tabs v-model="active" :swipe-threshold="4" scrollspy sticky swipeable color="#FF5555" line-width="20px" @change="tabChange" :class="navBarFixed == true ? 'navBarWrap' :''">
        <van-tab title="全部" >
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
                    <div class="left"><img :src="item.avatar"/></div>
                    <div class="center">
                      <p>{{item.username}}</p>
                      <p>{{item.telephone}}</p>
                    </div>
                    <div class="right">
                      <p>{{item.agentLevel == 0?"普通会员":
                        item.agentLevel == 1?"VIP会员":
                        item.agentLevel == 2?"区县代理":
                        item.agentLevel == 3?"市代理IP":
                        item.agentLevel == 4?"省代理IP":""}}</p>
                      <p>{{item.registerDate | formatDate}}</p>
                    </div>
                  </li>
                </ul>
              </van-list>
            </div>
            <div class="no" v-else>
              <img src="./img/noimg.png" alt/>
              <p class="text">没有你的日子好难过</p>
              <div class="odiv" @click="code">快去分享吧</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="普通会员">
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
                <ul>
                  <li v-for="(item,index) in list" :key="index">
                    <div class="left"><img :src="item.avatar"/></div>
                    <div class="center">
                      <p>{{item.username}}</p>
                      <p>{{item.telephone}}</p>
                    </div>
                    <div class="right">
                      <p>{{item.agentLevel == 0?"普通会员":
                        item.agentLevel == 1?"VIP会员":
                        item.agentLevel == 2?"区县代理":
                        item.agentLevel == 3?"市代理IP":
                        item.agentLevel == 4?"省代理IP":""}}</p>
                      <p>{{item.registerDate | formatDate}}</p>
                    </div>
                  </li>
                </ul>
              </van-list>
            </div>
            <div class="no" v-else>
              <img src="./img/noimg.png" alt/>
              <p class="text">没有你的日子好难过</p>
              <div class="odiv" @click="code">快去分享吧</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="VIP会员">
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
                <ul>
                  <li v-for="(item,index) in list" :key="index">
                    <div class="left"><img :src="item.avatar"/></div>
                    <div class="center">
                      <p>{{item.username}}</p>
                      <p>{{item.telephone}}</p>
                    </div>
                    <div class="right">
                      <p>{{item.agentLevel == 0?"普通会员":
                        item.agentLevel == 1?"VIP会员":
                        item.agentLevel == 2?"区县代理":
                        item.agentLevel == 3?"市代理IP":
                        item.agentLevel == 4?"省代理IP":""}}</p>
                      <p>{{item.registerDate | formatDate}}</p>
                    </div>
                  </li>
                </ul>
              </van-list>
            </div>
            <div class="no" v-else>
              <img src="./img/noimg.png" alt/>
              <p class="text">没有你的日子好难过</p>
              <div class="odiv" @click="code">快去分享吧</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="区县代理">
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
                <ul>
                  <li v-for="(item,index) in list" :key="index">
                    <div class="left"><img :src="item.avatar"/></div>
                    <div class="center">
                      <p>{{item.username}}</p>
                      <p>{{item.telephone}}</p>
                    </div>
                    <div class="right">
                     <p>{{item.agentLevel == 0?"普通会员":
                        item.agentLevel == 1?"VIP会员":
                        item.agentLevel == 2?"区县代理":
                        item.agentLevel == 3?"市代理IP":
                        item.agentLevel == 4?"省代理IP":""}}</p>
                      <p>{{item.registerDate | formatDate}}</p>
                    </div>
                  </li>
                </ul>
              </van-list>
            </div>
            <div class="no" v-else>
              <img src="./img/noimg.png" alt/>
              <p class="text">没有你的日子好难过</p>
              <div class="odiv" @click="code">快去分享吧</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="市代理IP">
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
                <ul>
                  <li v-for="(item,index) in list" :key="index">
                    <div class="left"><img :src="item.avatar"/></div>
                    <div class="center">
                      <p>{{item.username}}</p>
                      <p>{{item.telephone}}</p>
                    </div>
                    <div class="right">
                      <p>{{item.agentLevel == 0?"普通会员":
                        item.agentLevel == 1?"VIP会员":
                        item.agentLevel == 2?"区县代理":
                        item.agentLevel == 3?"市代理IP":
                        item.agentLevel == 4?"省代理IP":""}}</p>
                      <p>{{item.registerDate | formatDate}}</p>
                    </div>
                  </li>
                </ul>
              </van-list>
            </div>
            <div class="no" v-else>
              <img src="./img/noimg.png" alt/>
              <p class="text">没有你的日子好难过</p>
              <div class="odiv" @click="code">快去分享吧</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="省代理IP">
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
                <ul>
                  <li v-for="(item,index) in list" :key="index">
                    <div class="left"><img :src="item.avatar"/></div>
                    <div class="center">
                      <p>{{item.username}}</p>
                      <p>{{item.telephone}}</p>
                    </div>
                    <div class="right">
                      <p>{{item.agentLevel == 0?"普通会员":
                        item.agentLevel == 1?"VIP会员":
                        item.agentLevel == 2?"区县代理":
                        item.agentLevel == 3?"市代理IP":
                        item.agentLevel == 4?"省代理IP":""}}</p>
                      <p>{{item.registerDate | formatDate}}</p>
                    </div>
                  </li>
                </ul>
              </van-list>
            </div>
            <div class="no" v-else>
              <img src="./img/noimg.png" alt/>
              <p class="text">没有你的日子好难过</p>
              <div class="odiv" @click="code">快去分享吧</div>
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
