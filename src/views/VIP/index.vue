<template>
  <div class="mipu_card">
    <tops>
      <div slot='left' class="arrow" @click="$router.go(-1)"></div>
      <div slot='center' class="title">开通VIP</div>
    </tops>
    <div class="car_img"></div>
    <div class="mi_vip_list">
      <div class="title">
        <span>会员权益</span>
      </div>
      <van-row class="content00">
        <van-col span="6" class="item" v-for="(item,index) in icon" :key="index">
          <img :src="item.imgurl">
          <p style="font-size: 13px">{{item.name}}</p>
        </van-col>
      </van-row>
    </div>
    <button class="opennow" @click="buyNow">立即开通</button>
  </div>
</template>

<script>
    import Tops from "@/components/Top";
    export default {
        name: "index",
        data(){
          return {
            icon:[
              { imgurl:require('./images/mi_vip01.png'),name:'米铺特权'},
              { imgurl:require('./images/mi_vip02.png'),name:'购物奖励'},
              { imgurl:require('./images/mi_vip03.png'),name:'粉丝互惠'},
              { imgurl:require('./images/mi_vip04.png'),name:'推广奖励'},
              { imgurl:require('./images/mi_vip05.png'),name:'专享客服'},
              { imgurl:require('./images/mi_vip06.png'),name:'购物免邮'},
              { imgurl:require('./images/mi_vip07.png'),name:'消费米券'},
              { imgurl:require('./images/mi_vip08.png'),name:'分享福利'},
            ]
          }
        },
        components: {
          Tops
        },
        methods:{
          returns() {
            this.$router.go(-1)
          },
          async buyNow() {
            let res = await this.$http({
              method: 'post',
              url: '/minle/mall/cart/settlement',
              data: {commodityNoList: ['58209736479520']}
            })
            if (res.status == 200) {

              if(res.data.data.length>0){
                for(let i in res.data.data){
                  res.data.data[i].specifications =  this.alreadySel;
                  res.data.data[i].specificationId =  this.alreadySelId;
                }
              }
              this.$router.push({
                path: '/orderconfirm',
                query: {
                  orderconfirmdata: JSON.stringify( res.data.data),
                  openxdt: true,
                }
              })
            }
          }
        },
    }
</script>

<style scoped lang="less">
.mipu_card {
  background-color: #ffffff;

  .car_img {
    background: url('./images/vip_card_b.png') no-repeat center center;
    background-size: contain;
    background-position: 0px 54px;
    margin: 15px 15px 0px 15px;
    margin-top: 0px;
    height: 248px;
    border-radius: 0.16rem;
  }
  .mi_vip_list {
    padding: 10px 15px 95px 15px;
    background-color: #ffffff;
    .title {
      font-size: 16px;
      color: #333333;
      padding: 25px 0 25px;
      text-align: center;
      span {
        position: relative;
        &:before {
          content: "";
          width: 30px;
          height: 1px;
          background-color: #E19A45;
          position: absolute;
          left: -32%;
          top: 50%;
          transform:translate(-50%,-50%);
        }
        &:after {
          content: "";
          width: 30px;
          height: 1px;
          background-color: #E19A45;
          position: absolute;
          left: 130%;
          top: 50%;
          transform:translate(-50%,-50%);
        }
      }
    }
    .content00 {
      .item {
        text-align: center;
        margin-bottom: 30px;
        img {
          margin-bottom: 10px;
          width: 40px;
        }
      }
    }
  }
  .opennow {
    height: 1.253333rem;
    line-height: 1.1rem;
    background: -webkit-linear-gradient(right, #EED9AB, #EED9AB);
    background: linear-gradient(270deg, #EED9AB, #EED9AB);
    border-radius: 0.8rem;
    color: #664630;
    font-size: 0.48rem;
    box-shadow: 0 0.106667rem 0.16rem 0 rgba(238, 217, 717, 0.3);
    border: 0.026667rem solid #EED9AB;
    position: fixed;
    bottom: 0.666667rem;
    left: 0.4rem;
    right: 0.4rem;
    width: calc(100vw - 0.8rem);
  }
}
</style>
