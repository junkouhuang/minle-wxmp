<template>
  <div class="mipu_card">
    <tops>
      <div slot='left' class="arrow" @click="$router.go(-1)"></div>
      <div slot='center' class="title">开通米橱</div>
    </tops>
    <div class="car_img"></div>
    <div class="mi_vip_list">
      <van-row class="content00">
        <van-col span="24" class="item">
          <div style="width: 100%;">
              <div style="float:left;width:auto;"><img src="./images/mi_vip07.png"></div>
              <div style="float:left;width:80%;margin-left:15px;padding-top:5px;">
                <p style="color:#333333;font-size:15px;">消费福利</p>
                <p style="margin-top:10px;color:#7D7E80;font-size:12px;">购物任你选，福利天天有，买多少赚多少。</p>
              </div>
          </div>
        </van-col>
        <van-col span="24" class="item">
          <div style="width: 100%;">
              <div style="float:left;width:auto;"><img src="./images/mi_vip08.png"></div>
              <div style="float:left;width:80%;margin-left:15px;padding-top:5px;">
                <p style="color:#333333;font-size:15px;">分享福利</p>
                <p style="margin-top:10px;color:#7D7E80;font-size:12px;">分享亲朋好友，一起享受福利。</p>
              </div>
          </div>
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
              { imgurl:require('./images/mi_vip04.png'),name:'白米奖励'},
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
              data: {commodityNoList: ['58209736471350']}
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
    background: url('./images/vip_card_mc.png') no-repeat center center;
    background-size: contain;
    background-position: 0 0;
    margin-top: 45px;
    height: 218px;
    //order: 1px solid #000; 
  }
  .mi_vip_list {
    padding: 10px 15px 160px 15px;
    background-color: #ffffff;

    .content00 {
      .item {
        text-align: left;
        margin-left: 15px;
        margin-bottom: 15px;

        img {
          margin-bottom: 10px;
          width: 40px;
        }
      }
    }
  }
  .opennow {
    margin-top:-45px;
    height: 40px;
    line-height: 40px;
    background: -webkit-linear-gradient(right, #EED9AB, #EED9AB);
    background: linear-gradient(270deg, #EED9AB, #EED9AB);
    border-radius: 0.8rem;
    color: #664630;
    font-size: 15px;
    //box-shadow: 0 0.106667rem 0.16rem 0 rgba(238, 217, 717, 0.3);
    border: 0.026667rem solid #EED9AB;
    position: fixed;
    bottom: 0.666667rem;
    left: 0.4rem;
    right: 0.4rem;
    width: calc(100vw - 0.8rem);
  }
}
</style>
