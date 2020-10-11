<template>
  <div class="orderdetail">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">订单详情</div>
    </tops>
    <div class="content">
      <div class="hr">
      <div class="headerf">
        <div class="tex">
          <div class="text">{{active==0?'待付款':active==1?'待商家发货':active==2?'待确认收货':active==3?'已完成':active==4?'订单取消':active==5?'待商家确认退换':active==6?'商家同意退换货':active==7?'商家拒绝退换货':''}}</div>
          <div>
            订单金额：
            <em>¥</em><span style="font-size:18px;"> {{data.totalAmount}} </span>
          </div>
        </div>
      </div>
      <div class="orderstatus">
        <div class="content22" v-if="addressData && addressData.length>0"  @click="goNext">
          <img src="./images/yushu.png" alt="">
          <div>
            <p>{{addressData[0].status}},{{addressData[0].context}}</p>
            <span>{{addressData[0].time}}</span>
          </div>
          <div class="icon">
            <van-icon name="arrow" class="right" size="16px"/>
          </div>
        </div>
        <div class="content22" v-else-if="addressTips">
          <img src="./images/yushu.png" alt="" style="height:15px;">
          <div class="tips">{{addressTips}}</div>
        </div>
      </div>
      <div class="address22" v-if="data.provinces!=null && data.city!=null && data.county !=null && data.detailAddress !=null">
        <div class="contents">
          <div class="icon">
            <van-icon name="location-o" class="left" size="15px"/>
          </div>
          <div class="dz">
            <div>{{data.consigneeName}}  &nbsp;&nbsp;{{data.phone}}</div>
            <div class="addre">地址：{{data.provinces}}{{data.city}}{{data.county}}{{data.detailAddress}}</div>
          </div>
        </div>
      </div>
      </div>
      <div class="shop">
        <div class="head">
          <div>
            <!--<i class="icon-dianpu iconfont dp"></i>-->
            云仓商城
          </div>
        </div>
        <div class="shops" v-for="(item,index) in data.orderDetailDO" :key="index">
          <div class="img">
            <img v-lazy="item.titlePicture" alt />
          </div>
          <div class="text">
            <div class="title">{{item.name}}</div>
            <div class="name">{{item.specifications}}</div>
          </div>
          <div class="end">
            <div style="color:#333" class="price">￥{{item.singleTotalAmount}}</div>
            <div style="color:#999">×{{item.amount}}</div>
          </div>
        </div>
      </div>
      <div class="icon" >
        <a href="tel:400-833-7998" class="kefu" style="line-height:18px;">
         <i class="iconfont mmc-icon-dianhua" size="14px" ></i>&nbsp;客服电话          
        </a>
      </div>

      <div class="ddh">
        <div>
          <span class="tit">订单号</span>
          <span  style="float:right" class="ddh-time">{{data.orderNo}}</span>
        </div>
        <div>
          <span class="tit">订单时间</span>
          <span  style="float:right" class="ddh-time">{{data.createTime | formatDate}}</span>
        </div>
        <div style="margin-top:10px;" v-if="data.status>0">
          <span class="tit">支付方式</span>
          <span  style="float:right" class="ddh-time" v-if="data.paymentType == 0">微信支付</span>
        </div>
        <div v-if="data.status>0 && data.timePayment!=null">
          <span class="tit">支付时间</span>
          <span  style="float:right" class="ddh-time">{{data.timePayment | formatDate}}</span>
        </div>
        <div style="margin-top:10px;" v-if="data.status>1 && data.deliveryTime!=null">
          <span class="tit">发货时间</span>
          <span  style="float:right" class="ddh-time">{{data.deliveryTime | formatDate}}</span>
        </div>
        <div v-if="data.status>2  && data.confirmTime!=null">
          <span class="tit">收货时间</span>
          <span  style="float:right" class="ddh-time">{{data.confirmTime | formatDate}}</span>
        </div>
      </div>
      <div class="ddxq">
        <div class="clear">
          <div class="xj">订单金额</div>
          <div class="jj"></div>
          <div style="float:right" class="price"><em>¥</em> {{data.totalAmount}}</div>
        </div>
        <div class="clear">
          <div class="xj">订单优惠</div>
          <div class="jj"></div>
          <div style="float:right" class="price"><span v-if="data.deductionAmount!=null">-</span><em>¥</em> {{data.deductionAmount == null?0:data.deductionAmount}}</div>
        </div>
        <div class="clear">
          <div class="xj">运费</div>
          <div class="jj"></div>
          <!-- <div style="float:right" class="price">{{data.postage==null?'0.00':data.postage}}</div>-->
          <div style="float:right" class="price">免邮</div>
        </div>
        <div class="clear" >
          <div style="float:right;color:#FF5555;font-size: 18px;" class="price"><em>¥</em> {{data.realpay}}</div>
           <div class="jj"></div>
          <div style="float:right;font-size: 14px;color:#666;margin-top:4px">实付金额：</div>
        </div>
      </div>

      <div class="foot" v-if="data.status==0">
        <div class="btm">
          <div class="qx" @click="xq">取消订单</div>
          <div class="zf" @click="validate">支付订单</div>
        </div>
      </div>

      <div class="foot" v-if="data.status==1">
        <div class="btm">
          <div class="qx" @click="xq">取消订单</div>
        </div>
      </div>

      <div class="foot" v-if="data.status==2">
        <div class="btm">
          <!--<div class="qx" @click="xq">取消订单</div>-->
          <div class="sh" @click="sh">确认收货</div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  export {default} from './js/index'
</script>
<style lang="less" scope>
  @import './less/index';
</style>
