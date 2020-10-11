<template>
  <div class="audit-page">
    <tops>
      <div slot="left" class="arrow" @click="$router.go('-1')"></div>
      <div slot="center" class="title">我的服务</div>
    </tops>
    <div class="mili-shell" v-if="mipuData">
      <div class="mili-item">
        <div class="item-left">
          <img v-if="mipuData.applyMipuCover != '' && mipuData.applyMipuCover != null"
            :src="mipuData.applyMipuCover"
            alt=""
          />
          <img v-else src="./img/default.png"/>
          <div class="text-result"></div>
        </div>
        <div class="item-right">
          <p class="name">
          <span>{{mipuData.applyMipuName}}</span>
            <span class="examine-review" v-if="mipuData.applyStatus===0">审核中<img src="./img/result.png"/></span>
            <span class="examine-ok" v-if="mipuData.applyStatus===1">已开通<img class="point" src="./img/online.png"/></span>
            <span class="examine-result" v-if="mipuData.applyStatus===2">审核未通过<img src="./img/review.png"/></span>
            <span class="examine-active" v-if="mipuData.applyStatus===3">待付款激活<img src="./img/active.png"/></span>
          </p>
          <div class="sent"><span>{{mipuData.applyMipuWays | applyMipuWays}}</span><span>{{mipuData.applyMipuType | applyMipuType}}</span></div>
          <div class="address">
            <img src="./img/weizhi.png" alt="" />
            <p>
              {{ mipuData.applyMipuProvince }}{{ mipuData.applyMipuCity
              }}{{ mipuData.applyMipuRegion }}{{ mipuData.applyMipuAddress }}
            </p>
          </div>
        </div>
      </div>
      <p class="title">实名认证信息</p>
      <p class="username">{{ mipuData.applyAuthRealName }}</p>
      <p class="idcard">{{ mipuData.applyAuthIdCardNo }}</p>
    </div>
    <p class="title">审核进度</p>
    <p class="under-review" v-if="mipuData && mipuData.applyStatus === 0">
      您申请的<span style="color:#1e81ef;">{{mipuData.applyMipuWays | applyMipuWays}}正在审核中</span>，平台将会在1~2工作日内完成审核。审核期间，平台工作人员将会通过电话与您取得联系，请您保持联系电话或手机处于持续开机状态，以免影响服务审核进展。
    </p>
    <p class="under-review" v-if="mipuData && mipuData.applyStatus === 2">
      您申请的<span style="color:#ff3444;">{{mipuData.applyMipuWays | applyMipuWays}}未审核通过</span>，详细原因请查看审核结果。建议您仔细核对您的服务申请信息，确认无误后，你可以重新提交米铺申请。
    </p>
    <p class="title" >审核结果</p>
    <p class="reason" v-if="mipuData && mipuData.applyStatus === 0">
      服务申请正在受理审核中，非常感谢您的使用。
    </p>
    <p class="reason" v-if="mipuData && mipuData.applyStatus === 2">
      审核不通过原因:
      <span>{{mipuData.remark}}</span>
    </p>
    <p class="audit-time" v-if="mipuData && mipuData.applyStatus === 2">
      审核时间：{{ mipuData.applyTime | formatDate }}
    </p>
    <div class="delete" @click="handleDelete(mipuData)"><span><img style="vertical-align:middle;" src="./img/shanchu.png"/></span>删除服务</div>
  </div>
</template>
<script>
import Tops from "@/components/Top";
export default {
  data() {
    return {
      applyId: null,
      mipuData: null
    };
  },
  components: {
    Tops
  },
  async created() {
    this.applyId = this.$route.query.applyId;
    await this.requsetMipuDetail();
  },
  methods: {
    //请求审核信息
    async requsetMipuDetail() {
      const params = {
        applyId: this.applyId
      };
      const resp = await this.$http({
        method: "post",
        url: "/minle/mall/dtc/applyInfo",
        data: this.$qs.stringify(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      if (resp.data.returnCode == "ERR_0000") {
        this.mipuData = resp.data.data;
      }
    },
    //删除米铺
    async handleDelete(mipuData) {
      //applyStatus: 0-审核中  1-审核通过  2:-审核失败
      if(mipuData.applyStatus == 0){
        this.$toast("服务正在审核中，暂不支持删除");
        return;
      }
      const result = await this.$dialog.confirm({
        confirmButtonColor: '#FF5555',
        title: "确认删除服务？",
        message: "服务删除后，数据将不可恢复？"
      });
      if (!result) return;
      const resp = await this.$http({
        method: "post",
        url: "/minle/mall/dtc/deleteMipuApply",
        data: this.$qs.stringify({ applyId:mipuData.applyId }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      if (resp.data.returnCode == "ERR_0000") {
        this.$toast("删除成功");
        this.$router.push({path:'/my/xinditan/Audit'})
      }
    }
  },
  filters: {
    applyMipuWays(val) {
      if (val == 1) {
        return "网红地摊车"
      } else if (val == 2) {
        return "网红地摊车 配 智能终端"
      } else if (val == 3) {
        return "网红地店"
      } else if (val == 4) {
        return "网红地店 配 智能终端"
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
    //格式化时间戳
    formatDate: function(value) {
      var date = new Date(value);
      var Y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var H = date.getHours();
      var i = date.getMinutes();
      var s = date.getSeconds();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      if (H < 10) {
        H = "0" + H;
      }
      if (i < 10) {
        i = "0" + i;
      }
      if (s < 10) {
        s = "0" + s;
      }
      var t = Y + "年" + m + "月" + d + "日";
      return t;
    }
  }
};
</script>
<style lang="less">
.audit-page {

  box-sizing: border-box;
  padding-top: 45px;
  padding-bottom: 50px;

  .mili-shell {
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
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          color: #333333;
          line-height: 20px;
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
          margin-top: 3px;
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
    .title {
      font-size: 12px;
      color: #666666;
      margin-top: 15px;
      margin-left: 5px;
      font-weight: bold;
    }
    .username {
      font-size: 12px;
      color: #333333;
      margin-top: 15px;
      margin-left: 5px;
    }
    .idcard {
      font-size: 12px;
      color: #333333;
      margin-top: 15px;
      margin-left: 5px;
    }
  }
  .title {
    font-size: 12px;
    color: #666666;
    margin-top: 15px;
    margin-left: 15px;
    font-weight: bold;
  }
  .under-review {
    margin-top: 15px;
    color: #333333;
    font-size: 12px;
    width: 345px;
    margin-left: 15px;
    line-height: 20px;
    span {
      color: #ff3444;
    }
  }
  .reason {
    margin-top: 15px;
    color: #333333;
    font-size: 12px;
    width: 345px;
    margin-left: 15px;
    line-height: 20px;
    span {
      color: #ff3444;
    }
  }
  .audit-time {
    margin-top: 10px;
    font-size: 12px;
    color: #333;
    margin-left: 15px;
  }
  .delete {
    position: fixed;
    left: 15px;
    bottom: 20px;
    background: linear-gradient(
      270deg,
      rgba(255, 85, 85, 1) 0%,
      rgba(255, 85, 85, 1) 100%
    );
    font-size: 14px;
    width: 345px;
    height: 40;
    line-height: 38px;
    color: #fff;
    text-align: center;
    border-radius: 20px;

    img {
      height: 12px;
      margin-right:3px;
      margin-bottom:3px;
    }
  }


}
</style>
