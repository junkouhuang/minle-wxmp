<template>
  <div class="mipu_card">
    <tops>
      <div slot='left' class="arrow" @click="$router.go(-1)"></div>
      <div slot='center' class="title">开通米铺</div>
    </tops>
    <div class="car_img"></div>
    <div class="mi_vip_list">
      <div class="title">
        <span>米铺特权</span>
      </div>
      <van-row class="content00">
        <van-col span="6" class="item" v-for="(item,index) in icon" :key="index">
          <img :src="item.imgurl">
          <p style="font-size: 13px">{{item.name}}</p>
        </van-col>
      </van-row>
    </div>
    <button class="buynow" @click="buyNow">立即开通</button>
  </div>
</template>

<script>
    import Tops from "@/components/Top";
    export default {
        name: "index",
        data(){
          return {
            mipuNo:'',
            icon:[
              { imgurl:require('./images/mi_vip01.png'),name:'一人多店'},
              { imgurl:require('./images/mi_vip02.png'),name:'米铺福利'},
              { imgurl:require('./images/mi_vip03.png'),name:'零售商品'},
              { imgurl:require('./images/mi_vip04.png'),name:'自动结算'},
              { imgurl:require('./images/mi_vip05.png'),name:'线上收款'},
              { imgurl:require('./images/mi_vip06.png'),name:'线上营销'},
              { imgurl:require('./images/mi_vip07.png'),name:'创业奖励'},
              { imgurl:require('./images/mi_vip08.png'),name:'分享奖励'},
            ]
          }
        },
        components: {
          Tops
        },
        created() {
          this.mipuNo = this.$route.query.mipuNo;
        },
        methods:{
          returns() {
            this.$router.go(-1)
          },
          async buyNow() {
            let res = await this.$http({
              method: 'post',
              url: '/minle/mall/cart/settlement',
              data: {commodityNoList: ['58209736479521']}
            })
            if (res.status == 200) {
              this.$router.push({
                path: '/orderconfirm',
                query: {
                  orderconfirmdata: JSON.stringify( res.data.data),
                  mipuNo: this.mipuNo,
                  openmipu: true,
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
    background: url('./images/mi_vip930.png') no-repeat center center;
    background-size: contain;
    background-position: 0px 54px;
    margin: 15px 15px 0px 15px;
    margin-top: 0px;
    height: 208px;
    border-radius: 0.16rem;
  }
  .mi_vip_list {
    padding: 10px 15px 138px 15px;
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
  .buynow {
    height: 1.253333rem;
    line-height: 1.253333rem;
    background: -webkit-linear-gradient(right, #EDB254, #FFF4D8);
    background: linear-gradient(270deg, #EDB254, #FFF4D8);
    border-radius: 0.8rem;
    color: #333333;
    font-size: 0.48rem;
    //box-shadow: 0 0.106667rem 0.16rem 0 rgba(237, 178, 84, 0.3);
    border: 0rem solid #FFF4D8;
    position: fixed;
    bottom: 0.666667rem;
    left: 0.4rem;
    right: 0.4rem;
    width: calc(100vw - 0.8rem);
  }
}
</style>
