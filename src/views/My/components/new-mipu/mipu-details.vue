<template>
  <div class="mili-details">
    <tops>
      <div slot="left" class="arrow" @click="returns"></div>
      <div slot="center" class="title">我的米铺</div>
    </tops>
    <div class="mili-msg">
      <img
        class="bg"
        :src="mipuData.applyMipuCover"
      />
      <div class="bg1"></div>
      <div class="mipu-item">
        <img
          :src="mipuData.applyMipuCover"
          @click="mipuindex"
        />
        <div class="item-right">
          <p class="name">{{ mipuData.applyMipuName }}</p>
          <div class="real-name">
            <img src="./img/au.png" alt="" />
            <p class="text">已实名认证</p>
          </div>
          <div class="sent"><span>{{mipuData.applyMipuWays | applyMipuWays}}</span><span>{{mipuData.applyMipuType | applyMipuType}}</span></div>

        </div>
      </div>
    </div>
    <div class="order-detail">
      <div class="order-item" @click="goToPages(StoreManagement[3])">
        <p class="number">{{orderData.today}}</p>
        <p class="text">今日订单</p>
      </div>
      <div class="line"></div>
      <div class="order-item" @click="goToPages(StoreManagement[2])">
        <p class="number">{{orderData.todaySales}}</p>
        <p class="text">今日销售额</p>
      </div>
      <div class="line"></div>
      <div class="order-item">
        <p class="number">{{orderData.pageView}}</p>
        <p class="text">今日浏览量</p>
      </div>
    </div>
    <div class="setting-list">
      <div v-if="this.ways == 1 || this.ways == 2 || this.ways ==3 || this.ways == 4 || this.ways == 5" class="item" @click="goToPages('/my/mipu_home/new/store')">
        <img src="./img/d01.png"/>
        <p>米铺管理</p>
      </div>
      <div v-if="this.ways == 1 || this.ways == 2 || this.ways ==3 || this.ways == 5"  class="item" @click="goToPages('/my/mipu_open/product/index')">
        <img src="./img/d02.png"/>
        <p>商品管理</p>
      </div>
      <div v-if="this.ways == 1 || this.ways == 2 || this.ways ==3"  class="item" @click="goToPages('/my/mipu_home/new/sales_performance')">
        <img src="./img/d03.png"/>
        <p>销售业绩</p>
      </div>
      <div v-if="this.ways == 1 || this.ways == 2 || this.ways ==3"  class="item" @click="goToPages('/my/mipu_home/new/sales_order')">
        <img src="./img/d04.png"/>
        <p>销售订单</p>
      </div>
      <div v-if="this.ways == 3"  class="item" @click="goToPages('/my/mipu_home/new/skcord')">
        <img src="./img/d05.png"/>
        <p>收款记录</p>
      </div>
      <div v-if="this.ways == 1 || this.ways == 2 || this.ways ==3" class="item" @click="goAccount">
        <img src="./img/account.png"/>
        <p>我的账户</p>
      </div>
      <div v-if="this.ways == 1 || this.ways == 2 || this.ways ==3" class="item" @click="goToPages('/my/mipu_home/new/purchase_order/index')">
        <img src="./img/d07.png"/>
        <p>采购订单</p>
      </div>
      <div v-if="this.ways == 1 || this.ways == 2 || this.ways ==3" class="item" @click="goToPages('/my/mipu_home/new/wholesale_mall/index')">
        <img src="./img/d08.png"/>
        <p>批发商城</p>
      </div>
    </div>
  </div>
</template>
<script>
import Tops from "@/components/Top";
export default {
  data() {
    return {
      mipuNo: "",
      ways:0,
      mcName:'',
      StoreManagement: [
        { text: "米铺管理" ,path:'/my/mipu_home/new/store',name:'store-management',img:require('./img/d01.png')},
        { text: "商品管理" ,path:'/my/mipu_open/product/index',img:require('./img/d02.png')},
        { text: "销售业绩" ,path:'/my/mipu_home/new/sales_performance',name:'sales_performance',img:require('./img/d03.png')},
        { text: "销售订单" ,path:'/my/mipu_home/new/sales_order',name:'sales_order',img:require('./img/d04.png')},
        { text: "收款记录",path:'/my/mipu_home/new/skcord',img:require('./img/d05.png') },
      ],
      flag:false,
      mipuData: {},
      orderData:{}
    };
  },
  components: {
    Tops
  },
  async created() {
    this.mipuNo = this.$route.query.mipuNo;
    await this.requsetMipuDetail();
    await this.requsetOrderMsg()
  },
  filters: {
    applyMipuWays(val) {
      if (val == 1) {
        return "供应链米铺"
      } else if (val == 2) {
        return "生产米铺"
      } else if (val == 3) {
        return "云仓米铺"
      } else if (val == 4) {
        return "创业米铺"
      } else if (val == 5) {
        return "批发米铺"
      }
    },
    applyMipuType(val) {
      if (val == 1) {
        return "休闲娱乐"
      } else if (val == 2) {
        return "健康养生"
      } else if (val == 3) {
        return "美妆护肤"
      } else if (val == 4) {
        return "亲子母婴"
      } else if (val == 5) {
        return "休闲食品"
      } else if (val == 6) {
        return "日用百货"
      } else if (val == 7) {
        return "餐饮"
      } else if (val == 8) {
        return "服装"
      } else if (val == 9) {
        return "酒店住宿"
      } else if (val == 10) {
        return "家居用品"
      } else if (val == 11) {
        return "家用电器"
      } else if (val == 12) {
        return "家政服务"
      } else if (val == 13) {
        return "快递服务"
      } else if (val == 14) {
        return "家具加工"
      } else if (val == 15) {
        return "粮油辅食"
      } else if (val == 16) {
        return "保险服务"
      } else if (val == 17) {
        return "车辆维护"
      }

    },
  },
  methods: {
    returns() {
      this.$router.push('/my')
    },
    refresh(){
      const param = {grainStoreNo: this.mipuNo}
      this.$http({
        method: 'post',
        url: '/minle/mall/walletBasic/grainStoreInfo',
        data:this.$qs.stringify(param),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }).then((res) => {
        console.log(res)

      })
    },
    getBasicInfo(){
      const param = {grainStoreNo: this.mipuNo}
      this.$http({
        method: 'post',
        url: '/minle/mall/walletBasic/getBasicInfo',
        data:this.$qs.stringify(param),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }).then((res) => {
        this.$router.push({
          path:'/accountAdmin/index',
          query:{
            mipuNo:this.mipuNo,
            enterpriseAccountResult:res.data.data.enterpriseAccountResult,
            userId:res.data.data.userId,
          }})

      })
    },
    toAuthorization(){
      const param = { grainStoreNo:this.mipuNo}
      this.$http({
        method: 'post',
        url:'/minle/mall/walletBasic/toAuthorization',
        data:this.$qs.stringify(param),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }).then((res) => {
        if(res.data.data){
         //this.goAccount();
        }
      });
    },
    goAccount(){
      this.getBasicInfo();
      return false;
      // if(this.flag) {
      //   this.$dialog.confirm({
      //     title: '渤商赢账户授权',
      //     message: '同意获取【新药都荟】渤海银行开户账户信息(不涉及交易密码等敏感信息)。',
      //     confirmButtonColor: '#FF5555',
      //     confirmButtonText: '同意',
      //     cancelButtonText: '忽略'
      //   }).then(() => {
      //     this.flag = false;
      //     this.toAuthorization();
      //     this.refresh();
      //     this.getBasicInfo();
      //   }).catch(() => {
      //     this.toAuthorization();
      //     this.refresh();
      //     this.getBasicInfo();
      //   });
      // }else{
      //   this.toAuthorization();
      //   this.refresh();
      //   this.getBasicInfo();
      // }
    },
    mipuindex(){
      this.$router.push({path:'/my/mipu_home/new/buyer/index',query:{mipuNo:this.mipuNo}})
    },
    //请求店铺详情
    async requsetMipuDetail() {
      const params = {
        mipuNo: this.mipuNo
      };
      const resp = await this.$http({
        method: "post",
        data: this.$qs.stringify(params),
        url: "/minle/mall/mipu/mipuShow",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      if (resp.data.returnCode === "ERR_0000") {
        this.mipuData = resp.data.data;
        this.flag = resp.data.data.flag;
        this.ways = resp.data.data.applyMipuWays;
        this.mcName = resp.data.data.applyMipuName;
      }
    },
    //请求订单数据
    async requsetOrderMsg() {
      const resp = await this.$http({
        method: "post",
        url: "/minle/mall/mipu/salesPerformance",
        data:this.$qs.stringify({mipuNo:this.mipuNo}),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      if (resp.data.returnCode === "ERR_0000") {
        this.orderData = resp.data.data;
      }
    },
    //跳转对应页面
     goToPages(n){
      this.$router.push({path:n, query:{mipuNo:this.mipuNo, mcName:this.mcName, ways:this.ways}})
    }
  }
};
</script>
<style lang="less">
.mili-details {
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
      filter: blur(2px);
    }
    .bg1 {
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
    .mipu-item {
      position: absolute;
      display: flex;
      left: 20px;
      top: 25px;

      img {
        width: 80px;
        height: 80px;
        border-radius:5px;
      }

      .item-right {
        display: flex;
        flex-direction: column;
        margin-left: 7px;

        .name {
          color: #fff;
          font-size: 15px;
          line-height: 27px;
          padding-left: 3px;
        }

        .sent {
          line-height: 18px;
          text-align: left;
          margin: 10px 5px 5px 0px;

          span {
            font-size: 10px;
            //background-color: rgba(255, 234, 214);
            //color: rgba(255, 158, 68, 1);
            color: #fff;
            border: 1px solid #fff;
            padding: 0 8px;
            padding-top:2px;
            border-radius: 30px;

            display: inline-block;
            margin-right:8px;
          }
        }

        .real-name {
          display: flex;
          align-items: center;
          margin-top: 5px;

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

        .time {
          display: flex;
          align-items: center;
          margin-top: 5px;

          img {
            width: 21px;
            height: 21px;
          }

          p {
            font-size: 12px;
            margin-left: 2px;
            color: #fff;
          }
        }
      }
    }
  }
  .order-detail {
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 355px;
    height: 80px;
    border-radius: 8px;
    background-color: #fff;
    margin-left: 10px;
    margin-top: -35px;
    position: relative;
    z-index: 1;

    .order-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .number {
        font-size: 16px;
        color: #333333;
        margin-bottom: 10px;
      }

      .text {
        font-size: 12px;
        color: #666666;
      }
    }

    .line {
      width: 1px;
      height: 30px;
      background-color: #e5e5e5;
    }
  }
  .setting-list {
    width: 355px;
    margin-left: 10px;
    border-radius: 8px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 30px 25px;
    margin-top: 25px;
    display: flex;
    flex-wrap: wrap;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 80px;
      margin-bottom: 30px;
      &:nth-child(3n) {
        margin-right: 0;
      }
      img {
        width: 43px;
        height: 43px;
        border-radius: 8px;
      }
      p {
        color: #1a1a1a;
        font-size: 12px;
        margin-top: 8px;
        line-height: 12px;
      }
    }
  }
}
</style>
