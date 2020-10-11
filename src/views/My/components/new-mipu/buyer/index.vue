<template>
  <div class="buyer-page">
    <tops>
      <div slot="left" class="arrow" @click="$router.go('-1')"></div>
      <div slot="center" class="title">米铺主页</div>
    </tops>
    <div class="mili-msg">
      <img class="bg" v-lazy="mipuData.applyMipuCover" alt="" />
      <div class="bg1"></div>
      <div class="mipu-item">
        <div class="mipu-image">
          <img v-if="mipuData.applyMipuCover != '' && mipuData.applyMipuCover != null"
            v-lazy="mipuData.applyMipuCover"
            alt=""
          />
          <img v-else src="../img/default.png"/>
        </div>
        <div class="item-right">
          <div class="name-like">
            <p class="name">{{ mipuData.applyMipuName }}</p>
            <div class="like-right" v-show="!isCollection" @click="handleCollection">
              <img src="../img/wfos.png" alt="" />
              <p>关注</p>
            </div>
            <div class="like-right active" v-show="isCollection" @click="handleCollection">
              <img src="../img/fos.png" alt="" />
              <p>已关注</p>
            </div>
          </div>
          <div class="real-name" v-if="mipuData.applyStatus == 1">
            <img src="../img/au.png" alt="" />
            <p class="text">已认证</p>
          </div>
          <div class="label-list">
            <p v-for="(n, i) in mipuData.applyMipuTags" :key="i">{{ n }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mipu-rule">
      <a class="rule-item" :href="'tel:' + mipuData.applyMipuTelephone">
        <div class="rule-left">
          <img src="../img/dh.png" alt="" />
          <p>米铺电话&nbsp;&nbsp; {{ mipuData.applyMipuTelephone }}</p>
        </div>
        <img class="right" src="../img/dh1.png" alt="" />
      </a>
      <div class="rule-item">
        <div class="rule-left">
          <img src="../img/shijian.png" alt="" />
          <p v-if="mipuData.applyMipuHours">营业时间&nbsp;&nbsp;&nbsp;{{ mipuData.applyMipuHours }}</p>
          <p v-else>营业时间&nbsp;&nbsp;&nbsp;<span style="color:#999;">米铺还未设置营业时间</span></p>
        </div>
      </div>
      <div class="rule-item" @click="handleAddress">
        <div class="rule-left">
          <img src="../img/weizhi.png" alt="" />
          <p>
            {{ mipuData.applyMipuProvince}}{{ mipuData.applyMipuCity }}{{ mipuData.applyMipuRegion}}{{ mipuData.applyMipuAddress}}
          </p>
        </div>
        <img class="right" src="../img/che.png" alt="" />
      </div>
      <div class="rule-items" @click='handleOnlinePayment'>
        <p>线上收款</p>
        <img class="right" src="../img/red.png" alt="" />
      </div>
    </div>
    <div class="goods-detail">
      <van-sticky :offset-top="45" line-width="20px">
        <div class="goods-toggle">
          <div
            class="toggle-item"
            v-for="(n, i) in toggleList"
            :key="i"
            @click="handleToggleItem(i)"
          >
            <p :class="{ active: toggleIndex === i }">{{ n }}</p>
            <div class="line" v-show="toggleIndex === i"></div>
          </div>

        </div>
      </van-sticky>
      <div class="goods-list" v-if="toggleIndex == 0 && classifyList.length>0">
        <div class="list-left">
          <div
            v-if="classifyList.length>0"
            class="left-item"
            @click="handleToggleLeft(i, n.id)"
            :class="{ active: i === leftItmeIndex }"
            v-for="(n, i) in classifyList"
            :key="i"
          >
            {{ n.typeName }}
          </div>
        </div>
        <div class="list-right" v-if="shopList.length>0">
          <div class="right-item" v-for="(n, i) in shopList" :key="i">
            <div class="img">
              <img v-lazy="n.titlePicture" alt="" @click="sp_detail(n)"/>
            </div>
            <p class="name">{{ n.name }}</p>
            <div class="prise-card">
              <p class="prise">
                <em>¥</em><span>{{ n.price }}</span>
              </p>
              <span class="shopping-cart" @click="addCar(n.commodityNo)"></span>
            </div>
          </div>
        </div>
        <div class="noimg"  v-else>
          <img src="../img/noimg1.png">
        </div>
      </div>
      <div class="noimg" v-if="toggleIndex == 0 && classifyList.length==0">
        <img src="../img/noimg1.png">
      </div>
      <div class="shop-detail" v-show="toggleIndex == 1">
        <div class="user-info">
          <p class="info-item">店长：{{ mipuData.applyAuthRealName }}</p>
          <p class="info-item">电话号码：{{ mipuData.applyMipuTelephone }}</p>
          <p class="info-item" v-if="mipuData.applyMipuHours">营业时间：{{ mipuData.applyMipuHours }}</p>
          <p class="info-item" v-else>营业时间：<span style="color:#999;">米铺还未设置营业时间</span></p>

          <p class="info-item">
            地址：{{ mipuData.applyMipuProvince }}{{ mipuData.applyMipuCity }}{{ mipuData.applyMipuRegion }}{{ mipuData.applyMipuAddress }}
          </p>
        </div>

        <div class="mipu-introduce">
          <p class="title">米铺介绍</p>
          <p class="message" v-if="mipuData.applyMipuDescribe">
            {{ mipuData.applyMipuDescribe }}
          </p>
          <p class="message" v-else>
            暂无米铺介绍
          </p>
        </div>

        <div class="image-list">
          <p class="title">店内环境</p>
          <div class="list">
            <img
              @click="handleImagePreview(i)"
              v-for="(n, i) in mipuData.applyMipuPictures"
              :key="i"
              v-lazy="n"
              alt=""
            />
          </div>
        </div>

        <div class="business-license">
          <p class="title">营业执照</p>
          <img v-lazy="mipuData.mipuLicense" alt="" @click="handleImagelicense(mipuData.mipuLicense)"/>
        </div>

        <div class="complaint-button" @click="handleComplaint">举报商家</div>
      </div>
    </div>
    <div class="car">
      <div class="shop-card" @click="handleGoCard">
        <img src="../img/car.png" alt="" />
        <div v-if="shopNumber" class="angle-sign">{{ shopNumber }}</div>
      </div>
    </div>

  </div>
</template>
<script>
import Tops from "@/components/Top";
import { Sticky } from "vant";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      toggleIndex: 0,
      leftItmeIndex: null,
      toggleList: ["全部商品", "米铺商家"],
      mipuData: {},
      classifyList: [],
      shopList: [],
      shopNumber: 0,
      isCollection:false,
      mipuNo:'',
      skuGroups:[],
      openmipu:true,
    };
  },
  components: {
    Tops,
    Sticky
  },
  async created() {
     this.mipuNo = this.$route.query.mipuNo;
     this.requsetMipuMessage1();
     this.lookHandleCollection()
     await this.requsetGoodsList();
     await this.handleToggleLeft(0, this.classifyList.length>0?this.classifyList[0].id:'');
     await this.requsetShopCard();
     await this.carlist();
  },
  methods: {
    /**
     * 获取商品规格
     */
    async getSpec(commodityNo){
      const res =await  this.$http({
        method: 'get',
        url: '/minle/mall/commodity/findSKU?commodityNo='+commodityNo
      })
      if (res.status == 200) {
        if( res.data.data.length>0){
          this.$router.push({path: '/details', query: {commodityNo: commodityNo,mipuNo:this.mipuNo,openmipu: this.openmipu}})
        }else{
          this.carFlag(commodityNo);
        }
      }
    },
    async addCar(commodityNo){
      await this.getSpec(commodityNo);
      // await this.carFlag(commodityNo);
    },
    async carFlag(commodityNo){
      /*if(this.skuGroups.length>0){
        this.$router.push({path: '/details', query: {commodityNo: commodityNo}})
      }else{*/
        let arr = {
          commodityNo:commodityNo,
          mipuNo:this.mipuNo
        }
        let res = await this.$http({
          method: 'post',
          url: '/minle/mall/cart/add',
          data: arr,
        })
        if (res.status == 200) {
          if (res.data.returnMsg == "success") {
            /*this.$toast('该商品每人每单限购一次');*/
            this.$toast("加入购物车成功")
            this.carlist();
          }
          if (res.data.returnMsg == "fail") {
            this.$toast('已添加购物车');
          }
        }
      /*}*/
    },
    //初始化徽标
    async carlist() {
      await this.$http({
        method: 'post',
        url: '/minle/mall/cart/display?mipuNo=' + this.mipuNo,
        data: {
          mipuNo:this.mipuNo
        }
      })
        .then(res => {
          if (res.status == 200) {
            this.shopNumber = res.data.data.length;
          }
        }).catch(e => {

      })
    },
    sp_detail(obj){
      this.$router.push({path:'/details',query:{commodityNo:obj.commodityNo,mipuNo:this.mipuNo}})
    },
    //切换nav
    async handleToggleItem(i) {
      this.toggleIndex = i;
    },
    //切换商品类型
    async handleToggleLeft(i, id) {
      if (this.leftItmeIndex == i) return;
      this.leftItmeIndex = i;
      const params = {
        source: 1,
        storeId: this.mipuNo,
        commodityTypeId: id
      };
      const resp = await this.$http({
        method: "post",
        data: params,
        url: "/minle/mall/commodity/search"
      });
      if (resp.data.returnCode == "ERR_0000") {
        console.log("=============")
        this.shopList = resp.data.data.list;

      }
    },
    //查询店铺详情信息
    async requsetMipuMessage1() {
      const params = {
        mipuNo:this.mipuNo
      };

      const resp = await this.$http({
        method: "post",
        data: this.$qs.stringify(params),
        url: "/minle/mall/mipu/showDetails",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      if (resp.data.returnCode == "ERR_0000") {

        this.mipuData = resp.data.data;
        this.mipuData.applyMipuTags = this.mipuData.applyMipuTags.split(",");
        this.mipuData.applyMipuPictures = this.mipuData.applyMipuPictures.split(
          ","
        );
      }
    },
    async requsetGoodsList() {

      const params = {
          mipuNo:this.mipuNo
      };
      const resp = await this.$http({
        method: "post",
        data: this.$qs.stringify(params),
        url: "/minle/mipuCommodity/classify",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      if (resp.data.returnCode == "ERR_0000") {
        this.classifyList = resp.data.data!=null?resp.data.data.list:[];
      }else{
        this.classifyList =[]
      }
    },
    async requsetShopCard() {
      const resp = await this.$http({
        method: "post",
        url: "/minle/mall/cart/display"
      });
      if (resp.data.returnCode == "ERR_0000") {
        this.shopNumber = resp.data.data.length;
      }
    },
    //预览图片
    handleImagePreview(index) {
      ImagePreview({
        images: this.mipuData.applyMipuPictures,
        startPosition: index,
        closeable: true,
        loop: false
      });
    },
    //营业执照
    async handleImagelicense(mipuLicense){
      ImagePreview({
        images:[mipuLicense] ,
        startPosition: 0,
        closeable: true,
        loop: false
      });
    },
    //去购物车
    async handleGoCard() {
      this.$router.push({
        path: "/car",query:{mipuNo:this.mipuNo,openmipu:this.mipuNo}
      });
    },
    /**
     * 收藏
     */
    async handleCollection() {
      const params = {
          mipuNo:this.mipuNo
      }
      const resp = await this.$http({
        method: "post",
        url: "/minle/user/commodity/storeMipu",
        data: this.$qs.stringify(params)
      })
      console.log(resp)
      if(resp.data.returnCode=='ERR_0000'){
        this.isCollection = !this.isCollection
        if(this.isCollection){
          this.$toast('关注成功')
        }else{
          this.$toast('已取消关注')
        }
      }
    },
    //查看收藏状态
    async lookHandleCollection(){
      const params = {
          mipuNo:this.mipuNo
      }
      const resp = await this.$http({
        method: "post",
        url: "/minle/user/commodity/validate",
        data: this.$qs.stringify(params)
      })
      if(resp.status==200){
        this.isCollection = resp.data
      }
    },
    //线上支付
    handleOnlinePayment(){
      this.$router.push({
        path:'/my/mipu_home/new/buyer/payment',
        query:{
          mipuNo:this.mipuNo
        }
      })
    },
    //查看地理位置
    async handleAddress(){
      const url = `https://m.amap.com/navi/?dest=${this.mipuData.applyMipuLongitude},${this.mipuData.applyMipuLatitude}&destName=${this.mipuData.applyMipuName}&key=70057c2b9ef15ba151d98dce2d829717`
     window.location.href = url
    },
    //投诉商家
    handleComplaint(){
      this.$storage.set('mipu__no',this.mipuNo)
      this.$router.push({
        path:'/my/mipu_home/new/buyer/complaint'
      })
    }
  }
};
</script>
<style lang="less">
.buyer-page {
  box-sizing: border-box;
  padding-top: 45px;
  .mili-msg {
    width: 375px;
    height: 183px;
    box-sizing: border-box;
    background-size: 100% 100%;
    padding-left: 20px;
    padding-top: 25px;
    position: relative;
    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      filter: blur(12px);
    }
    .bg1 {
      background-color: rgba(0, 0, 0, 0.2);
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
    .mipu-item {
      position: absolute;
      display: flex;
      left: 15px;
      top: 25px;
      width: 360px;
      .mipu-image{
        width:75px;
        height:75px;
      }
      img {
        width: 75px;
        height: 75px;
        border-radius: 5px;
      }
      .item-right {
        display: flex;
        flex-direction: column;
        margin-left: 7px;
        width: 100%;
        overflow: hidden;
        .name-like {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .name {
            color: #fff;
            font-size: 15px;
            padding-left: 3px;
            line-height: 18px;
            width: 200px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .like-right {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 20px;
            border-radius: 4px;
            border: 1px solid #fff;
            box-sizing: border-box;
            margin-right: 11px;
            &.active{
              width:60px
            }
            img {
              width: 13px;
              height: 11px;
            }
            p {
              font-size: 11px;
              color: #ffffff;
              margin-left: 3px;
              line-height: 22px;
            }
          }
        }
        .real-name {
          display: flex;
          align-items: center;
          margin-top: 4px;
          img {
            width: 14px;
            height: 14px;
          }
          p {
            font-size: 12px;
            margin-left: 2px;
            color: #fff;
          }
        }
        .label-list {
          display: flex;
          align-items: center;
          margin-top: 8px;
          p {
            height: 18px;
            color: #fff;
            padding: 0 4px;
            border-radius: 9px;
            line-height: 18px;
            color: #fff;
            border: 1px solid #fff;
            text-align: center;
            font-size: 8px;
            margin-right: 8px;
          }
        }
      }
    }
  }
  .mipu-rule {
    width: 355px;
    height: 140px;
    background-color: #fff;
    border-radius: 8px;
    margin-left: 10px;
    margin-top: -58px;
    position: absolute;
    z-index: 10;
    box-sizing: border-box;
    display: flex;
    padding: 18px 0 13px 15px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    .rule-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      .rule-left {
        display: flex;
        align-items: center;
        img {
          width: 14px;
          height: 14px;
        }
        p {
          color: #333333;
          font-size: 13px;
          margin-left: 3px;
        }
      }
      .right {
        width: 13px;
        height: 13px;
        margin-right: 19px;
      }
      .right1 {
        width: 17px;
        height: 14px;
        margin-right: 17px;
      }
    }
    .rule-items {
      margin-top:5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        color: #FF5555;
        font-size: 14px;
        margin-left: 5px;
      }
      img {
        width: 25px;
        height: 25px;
        margin-right: 13px;
      }
    }
  }
  .goods-detail {
    background-color: #fff;
    padding-top: 115px;
    .goods-toggle {
      height: 45px;
      width: 100%;
      border-bottom: 1px solid #f0f0f0;
      box-sizing: border-box;
      padding-left: 30px;
      background-color: #fff;
      display: flex;
      .toggle-item {
        position: relative;
        height: 100%;
        margin-right: 30px;
        p {
          font-size: 14px;
          color: #909090;
          line-height: 45px;
          &.active {
            color: #343434;
          }
        }
        .line {
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          background-color:  #FF5555;
        }
      }
    }
    .goods-list {
      padding-top: 10px;
      // min-height: calc(100vh - 398px);

      display: flex;
      .list-left {
        flex-basis: 88px;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        display: flex;
        flex-direction: column;
        .left-item {
          height: 50px;
          width: 88px;
          position: relative;
          background-color: #f7f8f8;
          font-size: 13px;
          color: #333;
          line-height: 50px;
          text-align: left;
          padding-left:18px;
          &.active {
            background-color: #fff;
            &::before {
              content: "";
              position: absolute;
              display: block;
              width: 3px;
              height: 50px;
              background-color:  #FF5555;
              left: 0;
              bottom: 0;
            }
          }
        }
      }
      .list-right {
        flex: 1;
        // width:100%;
        display: flex;
        flex-wrap: wrap;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        padding-top: 25px;
        padding-left: 10px;
        .right-item {
          width: 129px;
          height: 155px;
          margin-right: 10px;
          margin-bottom: 14px;
          // padding-bottom:6px;
          background-color: #fff;
          border-radius: 9px;
          overflow: hidden;
          box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.06);
          &:nth-child(2n) {
            margin-right: 0;
          }
          .img {
            width: 129px;
            height: 105px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .name {
            padding-left: 3px;
            margin-top:5px;
            color: #1a1a1a;
            font-size: 13px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .prise-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 6px;
            box-sizing: border-box;
            padding: 0 5px;
            .prise {
              color: #FF7A00;
              font-size: 16px;
              font-weight: bold;
              em {
                font-style: normal;
                font-size: 12px;
              }
              span {
                padding-left:2px;
              }
            }
            .shopping-cart {
              float:right;
              width:15px;
              height:15px;
              margin-top:-5px;
              margin-right:0px;
              font-size: 16px;
              //color: #FF5555;
              //background-color: rgba(255, 65, 65, 0.1);
              padding: 4px;
              border-radius: 100%;

              background: url('../img/cart3x.png') no-repeat center;
              background-size: 100% 100%;
              background-size: cover;
            }
            i {
              font-size: 0.426667rem;
              color: #FF5555;
              background-color: rgba(255, 65, 65, 0.1);
              padding: 0.106667rem;
              border-radius: 100%;
            }
            img {
              width: 19px;
              height: 19px;
            }
          }
        }
      }
    }
    .shop-detail {
      background: #f7f7f7;
      padding-bottom: 34px;
      .user-info {
        box-sizing: border-box;
        padding: 20px 0 18px 15px;
        background-color: #fff;
        .info-item {
          color: #333333;
          font-size: 14px;
          margin-bottom: 10px;
          line-height: 20px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
      .mipu-introduce {
        margin-top: 8px;
        background-color: #fff;
        box-sizing: border-box;
        padding: 18px 15px 25px 15px;
        .title {
          font-weight: bold;
          font-size: 14px;
          color: #333333;
        }
        .message {
          font-size: 14px;
          line-height: 23px;
          color: #909090;
          margin-top: 14px;
          padding-left: 5px;
        }
      }
      .image-list {
        margin-top: 8px;
        box-sizing: border-box;
        background-color: #fff;
        padding: 18px 0 25px 15px;
        .title {
          font-weight: bold;
          font-size: 14px;
          color: #333;
        }
        .list {
          display: flex;
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          margin-top: 19px;
          width: 100%;
          img {
            width: 85px;
            height: 85px;
            margin-right: 10px;
          }
        }
      }

      .business-license {
        margin-top: 8px;
        background-color: #fff;
        box-sizing: border-box;
        padding: 18px 0 25px 15px;
        .title {
          font-weight: bold;
          font-size: 14px;
          color: #333333;
        }
        img {
          width: 85px;
          height: 85px;
          margin-top: 19px;
        }
      }
      .complaint-button{
        margin-top:25px;
        width:345px;
        height:45px;
        line-height:45px;
        text-align:center;
        font-size:15px;
        color:#1A1A1A;
        border-radius: 8px;
        background-color: #fff;
        margin-left:15px;
      }
    }

    .noimg {
      width: 100%;
      height: calc(100vh - 388px);
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100px;
      }
    }

  }
  .car {
      position: fixed;
      bottom: 100px;
      right: 0;

    .shop-card {
      margin-right: 10px;
      width: 40px;
      height: 40px;

      border-radius: 50%;
      box-shadow: 0 3px 3px 0 #666666;

      img {
        width: 40px;
        height: 40px;
      }
      .angle-sign {
        width: 12px;
        height: 12px;
        text-align: center;
        line-height: 12px;
        border-radius: 50%;
        background-color: #FF5555;
        color: #FFFFFF;
        font-size: 10px;
        top: 0px;
        right: 12px;
        position: absolute;
      }
    }
  }
}
</style>
