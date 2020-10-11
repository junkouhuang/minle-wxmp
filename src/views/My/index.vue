<template>
  <div style="width:100% ;" class="mys">
    <!-- 头部 -->
    <div class="head">
      <div class="bj2">
        <div class="avatar">
          <img src="./icon/hg.png" class="icon" v-if="userinfo.grade!=null"/>
          <img v-if="userinfo.avatar != '' && userinfo.avatar != null" :src="userinfo.avatar" class="topic" @click="$router.push('/userdata')"/>
          <img v-else-if="userinfo.sex == 1 && (userinfo.avatar == '' || userinfo.avatar == null)" src="./icon/gent.png" class="topic" @click="$router.push('/userdata')"/>
          <img v-else-if="userinfo.sex == 2 && (userinfo.avatar == '' || userinfo.avatar == null)" src="./icon/women.png" class="topic" @click="$router.push('/userdata')"/>
          <img v-else src="./icon/def.png" class="topic" @click="$router.push('/userdata')"/>
        </div>
        <div>
          <p style="">
            {{userinfo.nickname}}
            <img src="./icon/man.png" v-if="userinfo.sex == 1"/>
            <img src="./icon/lady.png" v-if="userinfo.sex == 2"/>
          </p>
          <!--<p class="tel">{{userinfo.telephone}}</p>-->
          <div class="level">
            <!--VIP-->
            <template v-if="userinfo.level==1">
              <img src="./icon/start2.png" />
            </template>
            <!--区县-->
            <template v-if="userinfo.level==2">
              <img src="./icon/start2.png" />
              <img src="./icon/start2.png" />
            </template>
            <!--市-->
            <template v-if="userinfo.level==3">
              <img src="./icon/start2.png" />
              <img src="./icon/start2.png" />
              <img src="./icon/start2.png" />
            </template>
            <!--省-->
            <template v-if="userinfo.level==4">
              <img src="./icon/start2.png" />
              <img src="./icon/start2.png" />
              <img src="./icon/start2.png" />
              <img src="./icon/start2.png" />
            </template>
            <span>{{userinfo.grade==null?'普通会员':userinfo.grade}} </span>
          </div>
        </div>
        <div @click="myClick('/my/set')" class="setting" ></div>
      </div>

    </div>
    <div class="item2">
      <van-row>
        <van-col span="24">
          <div class="vipbj" v-if="userinfo.grade==null" @click="openvip">
            <span class="hguan"><img src="./images/hguan.png"/></span>
            <span class="htip">立即开通VIP</span>
            <span class="hbtn"><img src="./images/openkt.png"/></span>
          </div>
          <div class="upgradebj" v-else @click="myClick('/my/dlapplay')">
            <span class="hguan"><img src="./images/hguan.png"/></span>
            <span class="htip">升级等级惊喜不断</span>
            <span class="hbtn"><img src="./images/openkt.png"/></span>
          </div>
        </van-col>
      </van-row>

      <van-row>
        <van-col span="8" @click="walletFun">
          <div class="swal">
            <div class="span2"><span class="menChat">￥</span>{{userinfo.wallet == null?0:userinfo.wallet | money}}</div>
            <div class="wallet_">

              <span class="span1">钱包</span>
            </div>
          </div>
        </van-col>
        <van-col span="8" @click="fansList">
          <div class="spe">
            <div class="span3">{{userinfo.fans == null?0:userinfo.fans}}</div>
            <div class="mili_">

              <div class="span1">粉丝</div>
            </div>
          </div>
        </van-col>
        <van-col span="8" @click="xqmFun">

            <div class="span3">{{userinfo.baiMi == null?0:userinfo.baiMi}}</div>
            <div class="mili_">

               <div class="span1">米粒</div>
            </div>

        </van-col>
      </van-row>
    </div>
    <div class="mains">
      <div class="item">
        <div class="myorder" @click="orderHandle(0)">
          <span class="my_order">我的订单</span>
          <div class="see_all">查看全部<img src="./icon/right.png" /></div>
        </div>
        <div class="bar_item">
          <van-row>
            <van-col span="6" v-for="(item,index) in item" :key="item.id"  @click="orderHandle(item.status)"  >
              <van-goods-action-icon   class="lists">
                <span class="tip" v-if="item.num>0">{{item.num}}</span>
                <img slot="icon" :src="item.icon" />
                <span>{{item.text}}</span>
              </van-goods-action-icon>
            </van-col>
          </van-row>
        </div>
      </div>

      <div class="list">
        <p>服务</p>
        <van-row>
          <van-col span="6">
            <van-goods-action-icon  class="lists" @click="mipu">
              <img  src="./icon/micu2x.png" />
              <span>我的米铺</span>
            </van-goods-action-icon>
          </van-col>
          <!--
          <van-col span="6" v-for="(item,index) in my0" :key="index"   >
            <van-goods-action-icon  class="lists" @click="myClick(item.path)">
              <img  :src="item.icon" />
              <span>{{item.text}}</span>
            </van-goods-action-icon>
          </van-col>-->
          <van-col span="6">
            <van-goods-action-icon class="lists" @click="myClick('/my/migang')">
              <img src="./icon/mimancang.png"/>
              <span>米米缸</span>
            </van-goods-action-icon>
          </van-col>
          <van-col span="6" >
            <van-goods-action-icon  class="lists" @click="myClick('/my/xinditan')">
              <img  src="./icon/xdt.png"/>
              <span>服务中心</span>
            </van-goods-action-icon>
          </van-col>
          <van-col span="6" >
            <van-goods-action-icon  class="lists" @click="myClick('/my/dlapplay')">
              <img  src="./icon/proxyapply2x.png"/>
              <span>合伙人申请</span>
            </van-goods-action-icon>
          </van-col>
          <van-col span="6" >
            <van-goods-action-icon  class="lists" @click="myClick('/my/card')">
              <img  src="./icon/bankcode2x.png"/>
              <span>银行卡</span>
            </van-goods-action-icon>
          </van-col>
          <van-col span="6" >
            <van-goods-action-icon  class="lists" @click="code">
              <img  src="./icon/qrcode2x.png"/>
              <span>分享二维码</span>
            </van-goods-action-icon>
          </van-col>
        </van-row>
      </div>
      <div class="list">
        <p>工具</p>
        <van-row>
          <!--
          <van-col span="6"   >
            <van-goods-action-icon  class="lists" @click="qrcode">
              <img  src="./icon/qrcode2x.png"/>
              <span>分享二维码</span>
            </van-goods-action-icon>
          </van-col>-->
          <van-col span="6" v-for="(item,index) in my1" :key="index"   >
            <van-goods-action-icon  class="lists" @click="myClick(item.path)">
                <img  :src="item.icon"/>
                <span>{{item.text}}</span>
            </van-goods-action-icon>
          </van-col>
          <van-col span="6" >
            <router-link :to="{ path: '/app_download' }">
            <van-goods-action-icon  class="lists">
              <img  src="./icon/appdw.png"/>
              <span>APP下载</span>
            </van-goods-action-icon>
            </router-link>
          </van-col>
        </van-row>
      </div>
      <!--<div class="list e" @click="loginout">
        安全退出
      </div>-->
      <div class="blank"></div>
    </div>
  </div>
</template>
<script>
  export {default} from './js/index'
</script>
<style lang="less" scope>
  @import './less/index';
</style>
