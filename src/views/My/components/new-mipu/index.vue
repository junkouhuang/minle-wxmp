<template>
  <div class="mili-page">
    <tops>
      <div slot="left" class="arrow" @click="$router.go('-1')"></div>
      <div slot="center" class="title">我的米铺</div>
    </tops>
    <van-list
      class="mili-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="mili-item" v-for="(n, i) in list" :key="i" @click="handleLookDetail(n.applyId,n.applyStatus,n.mipuNo)">
        <div class="item-left">
          <img
            :src="n.applyMipuCover"
            alt=""
          />
        </div>
        <div class="item-right">
          <div class="name">
            <span>{{n.applyMipuName}}</span>
            <span class="examine-review" v-if="n.applyStatus===0">米铺审核中<img src="./img/result.png"/></span>
            <span class="examine-ok" v-if="n.applyStatus===1">在线米铺<img class="point" src="./img/online.png"/></span>
            <span class="examine-result" v-if="n.applyStatus===2">审核未通过<img src="./img/review.png"/></span>
            <span class="examine-active" v-if="n.applyStatus===3">待付款激活<img src="./img/active.png"/></span>
          </div>
          <div class="sent"><span>{{n.applyMipuWays | applyMipuWays}}</span><span>{{n.applyMipuType | applyMipuType}}</span></div>
          <div class="address">
            <img src="./img/weizhi.png" alt="" />
            <p>{{n.applyMipuProvince}}{{n.applyMipuCity}}{{n.applyMipuRegion}}{{n.applyMipuAddress}}</p>
          </div>
        </div>
      </div>
    </van-list>
    <div class="next-step" @click="authenticationHandle">
      <img src="./img/jia.png" alt="" />
      <p>添加米铺</p>
    </div>
  </div>
</template>

<script>
import Tops from "@/components/Top";
import { List } from "vant";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      pageSize: 6,
      pageNum: 1,
      hasNextPage:true
    };
  },
  async created() {
  },
  methods: {
    async authenticationHandle(){
      const res = await this.$http({
        method:'post',
        url:'/minle/mall/mipu/authentication'
      })
      //0实名认证审核中,1已经实名认证,2未实名认证
      if(res.data.returnCode=="ERR_0000") {
        if(res.data.data==2){
          this.$router.push({path:'/my/real_name/index',query:{openmipu:false}})
        }else if(res.data.data==1){
            const res = await this.$http({
              method:'post',
              url:'/minle/mall/mipu/validate'
            })
            this.$router.push('/my/mipu_open/midetail');
        }else if(res.data.data===0){
          this.$toast('实名认证尚在审核中，暂无法添加米铺');
        }
      }
    },

    //上拉加载
    async onLoad() {
      await this.requsetListData()
    },
    //请求列表数据
    async requsetListData() {
      const resp = await this.$http({
        method: "post",
        url: "/minle/mall/mipu/show",
        // data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      if(resp.data.returnCode=='ERR_0000'&&resp.data.data){
          const list = resp.data.data.list
          if(this.pageNum==1){
              this.list = list
          }else{
              this.list = [...this.list,...list]
          }
          const hasNextPage = resp.data.data.hasNextPage
          this.loading = false
          this.finished=!hasNextPage
          ++this.pageNum
      }
    },
    //查看详情
    handleLookDetail(applyId,applyStatus,mipuNo){
      if (applyStatus == 1) {
          this.$router.push({
              path:'/my/mipu_home/new/mipu_details',
              query:{
                  mipuNo
                }
          })
      } else if(applyStatus == 0 || applyStatus == 2){
          this.$router.push({
              path:'/my/mipu_home/new/audit_details',
              query:{applyId:applyId}
          })
      } else {
        this.$router.push({path:'/my/mipu_open/card',query:{mipuNo}});
      }
    }
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
      } else {
        return "未知经营"
      }

    },
  },
  components: {
    Tops,
    List
  }
};
</script>

<style lang="less">
.mili-page {

  box-sizing: border-box;
  padding-top: 45px;
  padding-bottom: 50px;

  .mili-list {
    box-sizing: border-box;
    padding: 10px;

    .mili-item {
      background-color: #fff;
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      display: flex;
      border-radius: 11px;
      margin-bottom:10px;

      box-shadow: 0 0.106667rem 0.16rem 0 #EDEDEF;

      .item-left {
        width: 90px;
        height: 90px;
        position: relative;

        img {
          width: 90px;
          height: auto;
          border-radius: 8px;
        }

        .text-result {
          position: absolute;
          width: 90px;
          height: auto;
          top: 0;
          left: 0;
          background-color: #000;
          opacity: 0.54;
          text-align: center;
          line-height: 90px;
          color: #fff;
          font-size: 13px;
          border-radius: 0.213333rem;
        }
      }
      .item-right {
        display: flex;
        flex-direction: column;
        margin-left: 10px;

        .sent {
          line-height: 18px;
          text-align: left;
          margin: 5px 5px 5px 0px;

          span {
            font-size: 10px;
            background-color: #FFECEC;
            color: #FF5555;
            padding: 0 8px;
            padding-top:2px;
            border-radius: 30px;
            display: inline-block;
            margin-right:8px;
          }
        }

        .name {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          color: #333333;
          line-height: 20px;

          .examine-ok {
            float: right;
            margin-top: 3px;
            //background-color: #FF5555;
            color: #1BBF80;
            //width: 60px;
            height: 16px;
            border-radius: 4px;
            line-height: 19px;
            text-align: center;
            font-size: 10px;

            img {
              width: 14px;
              height: 14px;
              vertical-align: middle;
            }
          }

          .examine-active {
            float: right;
            margin-top: 3px;
            //background-color: #FF7A00;
            color: #FF7A00;
            //width: 60px;
            height: 16px;
            border-radius: 4px;
            line-height: 19px;
            text-align: center;
            font-size: 10px;

            img {
              width: 14px;
              height: 14px;
              vertical-align: middle;
            }
          }
          .examine-result {
            float: right;
            margin-top: 3px;
            //background-color: #ff3444;
            color: #ff3444;
            //width: 60px;
            height: 16px;
            border-radius: 4px;
            line-height: 19px;
            text-align: center;
            font-size: 10px;

            img {
              width: 14px;
              height: 14px;
              vertical-align: middle;
            }
          }
          .examine-review {
            float:right;
            margin-top: 0px;
            //background-color: #1e81ef;
            color: #1e81ef;
            height: 16px;
            border-radius: 4px;
            line-height: 19px;
            text-align: center;
            font-size: 10px;

            img {
              width: 14px;
              height: 14px;
              vertical-align: middle;
            }
          }
        }

        .address {
          width:240px;
          display: flex;
          margin-top: 5px;

          img {
            width: auto;
            height: 14px;
            vertical-align: middle;
          }

          p {
            width: 100%;
            font-size: 12px;
            color: #808080;
            margin-left: 4px;
            line-height: 20px;
            overflow: hidden;
            margin-top: -2px;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;

          }
        }

        .time {
          margin-top: 5px;
          display: flex;
          align-items: center;
          img {
            width: 18px;
            height: 18px;
          }
          p {
            color: #525252;
            font-size: 13px;
            margin-left: 3px;
          }
        }
        .reason {
          margin-top: 7px;
          color: #525252;
          font-size: 12px;
          display: flex;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 157px;
            color: #ff3444;
          }
        }
      }
    }
  }
  .next-step {
    position: fixed;
    //left: 10px;
    //right:10px;
    bottom: 0px;
    width: 100%;
    height: 45px;
    background-color: #FFECEC;
    opacity: 0.9;
    //border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 16px;
      height: 16px;
    }
    p {
      margin-left: 7px;
      color: #FF5555;
      font-size: 15px;
    }
  }
}
</style>
