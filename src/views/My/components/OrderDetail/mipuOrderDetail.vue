<template>
  <div class="orderdetail">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">米橱订单</div>
    </tops>
    <div class="content">
      <div class="hr">
      <div class="headerf">
        <div class="tex">
          <div class="text">{{active==0?'待客人付款':active==1?'待安排发货':active==2?'待确认收货':active==3?'已完成':active==4?'订单取消':''}}</div>
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
            {{this.mcName}}
          </div>
        </div>
        <div class="shops" v-for="(item,index) in data.orderDetailDO" :key="index">
          <div class="img">
            <img v-lazy="item.titlePicture" alt />
          </div>
          <div class="text">
            <div class="title">{{item.name}}</div>
            <div class="name" style="margin-top:5px;">{{item.specifications}}</div>
          </div>
          <div class="end">
            <div style="color:#333" class="price">￥{{item.singleTotalAmount}}</div>
            <div style="color:#999">×{{item.amount}}</div>
          </div>
        </div>
      </div>
      <div class="icon">
        <a :href="kfphone" class="kefu" style="line-height:18px;">
          <i class="iconfont mmc-icon-dianhua" size="14px" ></i>&nbsp;联系顾客          
        </a>
      </div>

      <div class="ddh">
        <div>
          <span class="tit">订单编号</span>
          <span class="ddh-time" style="float:right">{{data.orderNo}}</span>
        </div>
        <div>
          <span class="tit">订单时间</span>
          <span class="ddh-time" style="float:right">{{data.createTime | formatDate}}</span>
        </div>
        <div style="margin-top:10px;" v-if="data.status>0">
          <span class="tit">支付方式</span>
          <span class="ddh-time" v-if="data.paymentType == 0" style="float:right">微信支付</span>
        </div>
        <div v-if="data.status>0 && data.timePayment!=null">
          <span class="tit">支付时间</span>
          <span class="ddh-time" style="float:right">{{data.timePayment | formatDate}}</span>
        </div>
        <div style="margin-top:10px;" v-if="data.status>1 && data.timePayment!=null">
          <span class="tit">发货时间</span>
          <span class="ddh-time" style="float:right">{{data.deliveryTime | formatDate}}</span>
        </div>
        <div v-if="data.status>2  && data.timePayment!=null">
          <span class="tit">收货时间</span>
          <span class="ddh-time" style="float:right">{{data.confirmTime | formatDate}}</span>
        </div>
      </div>
      <div class="ddxq">
        <div class="clear">
          <div class="xj">订单金额</div>
          <div class="jj"></div>
          <div style="float:right" class="price">¥ {{data.totalAmount}}</div>
        </div>
        <div class="clear">
          <div class="xj">订单优惠</div>
          <div class="jj"></div>
          <div style="float:right" class="price"><span v-if="data.deductionAmount!=null">-</span>¥ {{data.deductionAmount == null?0:data.deductionAmount}}</div>
        </div>
        <div class="clear">
          <div class="xj">运费</div>
          <div class="jj"></div>
          <!-- <div style="float:right" class="price">{{data.postage==null?'0.00':data.postage}}</div>-->
          <div style="float:right" class="price">包邮</div>
        </div>
        <div class="clear" >
          <div style="float:right;color:#FF5555;font-size: 18px;" class="price"><em>¥</em> {{data.realpay}}</div>
           <div class="jj"></div>
          <div style="float:right;font-size: 14px;color:#666;margin-top:4px">实付金额：</div>
        </div>
      </div>

      <div class="foot">
        <div class="btm">
          <div class="qx" v-if="this.active==0" @click="cancelOrder(data.orderNo)">订单取消</div>
          <div class="sh" v-if="this.active==1" @click="confirmDelivery(data.orderNo)">确认发货</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export {default} from './js/mipuIndex'
</script>
<style lang="less" scope>
  @import './less/index';
</style>
