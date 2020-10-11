<template>
  <div class="orderconfirm">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">确认订单</div>
    </tops>

    <div class="tip" v-if="!this.openxdt">
      <van-icon name="bullhorn-o" size="20px"/>
      <span>疫情期间，请佩戴好口罩 出门领取您的购物包裹  </span>
    </div>
    <div v-else style="margin-top:55px;"></div>

    <div class="address" @click="toadress" v-if="!this.openxdt">
      <div class="xq">
        <div class="left">
          <img src="./images/pos2x.png"/>
        </div>
        <div class="msg">
          <div>
            <span class="receiverName">{{username==''?'收货人姓名':'收货人: '+username}}</span>
            <span class="phone">{{phone==''?'收货人手机号码':phone}}</span>
          </div>
          <div class="addre" v-text="address==''?'收货人地址':'收货地址: '+address"></div>
        </div>
        <van-icon name="arrow" class="right" size="18px"/>
      </div>
      
    </div>
    <div class="dianpu">
      <span>订单商品</span>
    </div>
    <div v-for="(item,index) in orderconfirmdata" :key="index">
      <van-row class="list">
        <van-col span="6">
          <img :src="item.titlePicture" class="img"/>
        </van-col>
        <van-col span="18" class="produ">
          <div class="producename">{{item.name}}</div>
          <div class="specifications">
            <span>{{item.specifications}}</span>
            <span class="sent" v-if="item.discount">送{{item.discount}}米粒</span>
          </div>
          <div class="price">
            <div>￥{{item.price}} 
            <!--<span class="price_commodityPrice"></span>-->
            </div>
            <span class="amount">x {{item.amount}}</span>
          </div>
        </van-col>
      </van-row>
    </div>
    <van-row>
      <van-col span="24">
        <div class="gong">共 <span class="num">{{realamount}}</span> 件商品 &nbsp; 应付款 <span>￥{{needPay.toFixed(2)}}</span></div>
      </van-col>
    </van-row>
    <van-row style="margin-top: 10px">
      <van-col span="24">
        <div class="free">快递<span>免运费</span></div>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        <div class="free">配送方式<span>快递配送</span></div>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        <div class="free">
          <div class="new"><img src="./images/wxpay.png"><span>微信支付（推荐）</span></div>
        </div>
      </van-col>
    </van-row>
    <van-row v-if="!morePays">
      <van-col span="24">
        <div class="more_pay">
          <span @click="morePay">更多支付方式（钱包支付）<van-icon name="arrow-down" /></span>
        </div>
      </van-col>
    </van-row>
    <template v-if="morePays">
      <van-row>
        <van-col span="24">
          <div class="free">
            <div class="bao"><img src="./images/m07.png">
            <span>钱包支付</span></div>
            <span class="price" @click="choose2" :class="userwallet == 1?'hex':''">{{userwallet=='0'?'暂未使用钱包':msg2}}<van-icon name="arrow" class="arrow"></van-icon></span>
          </div>
        </van-col>
      </van-row>
      <van-row v-if="this.you">
        <van-col span="24">
          <div class="free" >
            <div class="bao"><img src="./images/bao.png"><span>订单可使用 <b class="user">{{mili==''|| mili== null?'0':mili}}</b> 米粒&nbsp;</span>
            <span style="color:#FF5555;font-size:12px;border-bottom:1px solid #px; border:1px solid #FF5555;background-color:#ffffff;border-radius:4px;padding:2px 3px 2px 3px;">米粒抵扣</span></div>
            <span class="price" @click="choose1" :class="userml == 1?'hex':''">{{userml=='0'?'暂未使用白米':msg1}}
              <van-icon name="arrow" class="arrow"></van-icon>
            </span>
          </div>
        </van-col>
      </van-row>
    </template><!--
    <van-row style="margin-top: 10px">
      <van-col span="24">
        <div class="free"><span>运费</span><span>包邮</span></div>
      </van-col>
    </van-row>-->
    <div class="blank"></div>
    <van-submit-bar
      label="应付款"
      :price="flag?0:realPay*100"
      :tip="!this.openxdt?'【配送信息】: '+ address + ' ' + username + ' ' + phone:''"
      button-text="提交订单"
      @submit="validate"
      :loading="loading"
    />
    <van-popup
      v-model="showPopup1"
      position="bottom"
      closeable
      close-icon="close"
      round v-if="this.you"
    >
      <div class="discounts">
        <p>白米抵扣</p>
        <div>
          <span>可使用白米{{mili}}&nbsp;&nbsp;立减￥{{mili>=total?total:mili}}</span>
          <van-radio v-model="userml" name="1" checked-color="#FF5555" style="border: none;"></van-radio>
        </div>
        <div>
          <span>不使用白米</span>
          <van-radio v-model="userml" name="0" checked-color="#FF5555" style="border: none;"></van-radio>
        </div>
        <van-button @click="finsh1">完成</van-button>
      </div>
    </van-popup>
    <van-popup
      v-model="showPopup2"
      position="bottom"
      closeable
      close-icon="close"
      round
    >
      <div class="discounts">
        <p>钱包支付</p>
        <div>
          <span>可使用钱包￥{{wallet}}&nbsp;&nbsp;立减￥{{wallet>=total?total:wallet}}</span>
          <van-radio v-model="userwallet" name="1" checked-color="#FF5555" style="border: none;"></van-radio>
        </div>
        <div>
          <span>不使用钱包</span>
          <van-radio v-model="userwallet" name="0" checked-color="#FF5555" style="border: none;"></van-radio>
        </div>
        <van-button @click="finsh2">完成</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
  export {default} from './js/index'
</script>

<style lang="less" scoped>
  @import './less/index';
</style>
