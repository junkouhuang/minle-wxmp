<template>
  <div class="cardtt">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">确认发货</div>
    </tops>
    <div class="contenttt">
      <van-cell-group>
        <van-field v-model.trim="orderNo" type="number" label="订单号" maxlength="19" placeholder="请填写订单号" required readonly
                    clearable/>
        <van-field v-model="express" @click="open" label="快递公司" placeholder="请选择快递公司" required readonly
                   right-icon="logistics"/>
        <!--<van-field v-model.trim="expressCom" label="快递编码"  placeholder="自动识别快递编码" required readonly
                   />-->
        <van-field v-model.trim="expressBarcode" id="barcode" type="number" label="运单号" maxlength="19" placeholder="请填写运单号或条码" required
                   clearable right-icon="scan" @click-right-icon="scan"/>
        <div class="upload-image">
          <p class="title"><span>*</span>快递凭单<span class="desc">上传快递物流单（最多6张）</span></p>
          <div class="image-list">
            <div class="image-item" v-for="(n, i) in imageList" :key="i">
              <img :src="n" alt="" v-lazy="n" @click="handleImagePreview(i)"/>
              <img
                src="./img/close.png"
                class="close"
                alt=""
                @click="handleDelete(i)"
              />
            </div>
            <simple-cropper
              :initParam="uploadParam"
              @func="getMsgFormSon"
              ref="cropper"
              class="simple-cropper" v-if="showPic">
              <img src="./img/upload.png" alt="" />
            </simple-cropper>
          </div>
        </div>
        <van-popup
          v-model="show"
          position="bottom"
          :style="{ height: '40%' }"
        >
          <van-picker
            show-toolbar
            :default-index="defaultIndex"
            :columns="expressList"
            @cancel="onCancel"
            @confirm="onConfirm"
            />
        </van-popup>
      </van-cell-group>
      <p class="tip">为保障您的包裹顺利到达顾客手中，请如实填写您的包裹发货物流信息，确认发货后，系统将自动跟踪订单物流，您可通过订单页查看最新的快递物流动态。</p>
      <div class="btnse">
        <van-button type="danger" @click="onSaves">确认发货</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Tops from "@/components/Top";
  import SimpleCropper from "@/components/SimpleCropper";
  import { ImagePreview } from "vant";

  export default {
    data() {
      return {
        show: false,
        list: [],
        defaultIndex:0,
        orderNo:'',
        expressList:[],
        express:'',
        expressCom:'',
        expressBarcode:'',
        codeUrl:'',
        imageList: [],
        uploadParam: {
          fileType: "recruit", // 其他上传参数
          uploadURL: this.$dataURL + "uploadAction/qcloudImg", // 上传地址
          scale: 4 // 相对手机屏幕放大的倍数: 4倍
        },
        showPic:true,
        appId:'',
        timestamp:'',
        nonceStr:'',
        signature:'',
      };
    },
    methods: {
      returns() {
        this.$router.go(-1)
      },
      //上传封面图片
      getMsgFormSon(data) {
        if(this.imageList.length<6){
          this.imageList.push(data);
          if (this.imageList.length == 6) {
            this.showPic = false;
          }
        }else{
            this.$toast("快递凭单最多支持6张")
        }
      },
      //预览图片
      handleImagePreview(index) {
        ImagePreview({
          images: this.imageList,
          startPosition: index,
          closeable: true,
          loop: false
        });
      },
      //删除图片
      handleDelete(index) {
        this.$dialog
          .confirm({
            title: "",
            message: "确认删除凭单",
            confirmButtonText: "确认",
            confirmButtonColor: "#FF5555",
            cancelButtonText: "取消"
          })
          .then(() => {
            this.imageList.splice(index, 1);
            if (this.imageList.length < 6) {
              this.showPic = true;
            }
          })
          .catch(() => {});
      },
      open() {
        this.show = true;
        this.expressList = [];
        this.getExpress();
      },
      getExpress() {
        this.$http({
          method: "get",
          url: '/common/express/company/codes',
          data: ''
        }).then(res => {
          if (res.data.returnCode == "ERR_0000") {
            this.list = res.data.data;
            for (var i=0;i<res.data.data.length;i++) {
              this.expressList.push(res.data.data[i].express);
            }
          }
        });
      },
      onSaves() {
        if (this.orderNo == '') {
          this.$toast('请填写订单号');
          return false;
        }
        if (this.express == '') {
          this.$toast('请选择快递公司');
          return false;
        }
        /*if (this.expressCom == '') {
          this.$toast('快递编码缺失');
          return false;
        }*/
        if (this.expressBarcode == '') {
          this.$toast('请填写运单号或条码');
          return false;
        } else {
          if (this.expressBarcode.length < 10) {
            this.$toast('请填写有效的运单号');
            return false;
          }
        }
        if (this.imageList.length == 0) {
          this.$toast('请上传快递凭单');
          return false;
        }
        this.$dialog
          .confirm({
            title: "",
            message: "确认订单发货？",
            confirmButtonText: "确认",
            confirmButtonColor: "#FF5555",
            cancelButtonText: "取消"
          })
          .then(() => {
            let data = {
              order: this.orderNo,
              express: this.express,
              com: this.expressCom,
              barcode: this.expressBarcode,
              voucher: this.imageList.toString(),
            }
            this.$http({
              method: "post",
              url: '/minle/mall/order/delivery',
              data: this.$qs.stringify(data)
            }).then(res => {
              if (res.data.returnCode == "ERR_0000") {
                this.$toast("发货成功");
                setTimeout(()=>{
                  this.$router.go(-1);
                },2000)
              }
            });
          })
          .catch(() => {});
      },
      scan() {
        // this.$toast("暂不支持自动扫码");
        this.wxInit();
      },
      initWxSign(){
        let url = location.href.split('#')[0];
        this.$http({
          method: 'get',
          url: '/common/wxmp/minle/share?url='+url,
        })
        .then(res => {
          if (res.status == 200) {
            this.appId = res.data.data.appId;
            this.timestamp = res.data.data.timestamp;
            this.nonceStr = res.data.data.nonceStr;
            this.signature = res.data.data.signature;
          }
        }).catch(e => {
          // do-nothing.
        })
      },
      wxInit() {
        var _this = this;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
          appId: this.appId, // 必填，公众号的唯一标识
          timestamp: this.timestamp, // 必填，生成签名的时间戳
          nonceStr: this.nonceStr, // 必填，生成签名的随机串
          signature: this.signature,// 必填，签名
          jsApiList: [
            "scanQRCode"
          ]
        });
        wx.ready(function () {
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function(res) {
              setTimeout(()=>{
                var result = res.resultStr;
                // 当needResult 为 1 时，扫码返回的结果
                _this.expressBarcode = result.split(',')[1];
              },2000)
            }
          });
        });
      },
      onConfirm(value, index) {
        this.express = this.list[index].express;
        this.expressCom = this.list[index].com;
        this.show = false;
        this.defaultIndex = index;
      },
      onCancel() {
        this.show = false;
      }
    },
    created() {
      this.orderNo = this.$route.query.orderNo;
      this.initWxSign();
    },
    components: {
      Tops,
      SimpleCropper
    }
  };
</script>
<style lang="less" scope>
  .cardtt {
    //padding-top: 45px;
    .contenttt {
      padding: 0 2px;
      .firstFiled {
        margin-bottom: 1px;
      }
      .p_popup {
        .top {
          height: 75px;
          position: relative;

          .sent {
            font-size: 14px;
            font-weight: bold;
            padding: 0.466667rem 0.466667rem 0.1rem 0.366667rem;

            .tbs {

            }
          }
        }

        .tbs {
          display: flex;


          &:after {
            content: '';
            width: 93%;
            left: 3.5%;
            height: 1px;
            position: absolute;
            background-color: #f5f5f5;
            bottom: 1px;
          }

          .child {
            height: 1.1rem;
            line-height: 1.1rem;
            padding: 0 0.366667rem;
            font-size: 0.373333rem;
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .active {
            color: #ff5555;
            position: relative;

            &:after {
              content: '';
              width: 60%;
              left: 20%;
              height: 1px;
              position: absolute;
              background-color: #ff5555;
              bottom: 5px;
            }
          }
        }

        .a_scroll {
          height: 85%;
          overflow: hidden;

          .van-index-bar {
            height: 100%;
            overflow-y: scroll;

            .van-cell__value,
            .van-cell__title {
              flex: none;

              .a_arrow {
                float: left;
                color: #ff5555;
                position: relative;
                top: 0;
              }
            }
          }
        }
      }
      .upload-image {
        padding-top: 15px;
        padding-bottom: 15px;
        border-bottom: 0px solid #e4e4e4;
        padding: 15px 8px;
        .title {
          font-size: 14px;
          color: #333333;
          span {
            padding-right:1px;
            color: #FF3444;
          }
          .desc {
            font-size: 14px;
            color: #909090;
            padding-left:36px;
          }
        }
        .image-list {
          display: flex;
          flex-wrap: wrap;
          margin-top: 13px;
          .image-item {
            width: 80px;
            height: 80px;
            margin-right: 20px;
            margin-bottom: 25px;
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
            .close {
              width: 45px;
              height: 45px;
              position: absolute;
              top: -22px;
              right: -22px;
            }
          }
        }
      }

      .tip {
        margin: 0.266667rem;
        line-height: 0.533333rem;
        color:#FF7A00;
      }
    }

    .van-button--normal {
      width: 100%;
    }
    .btnse {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 0;

      button {
        text-align: center;
        margin: 20px 5%;
        width: 90%;
        height: 40px;
        color: #fff;
        line-height: 40px;
        background: -webkit-linear-gradient(right, #FF5555, #FF5555);
        background: linear-gradient(270deg, #FF5555, #FF5555);
        border-radius: 0.8rem;
        font-size: 15px;
        border: none;
        box-shadow: 0 0.106667rem 0.16rem 0 rgba(27, 191, 128, 0.3);
      }

    }

    .simple-cropper {
      width: 80px;
      height: 80px;
      position: relative;
      img {
        width: 80px;
        height: 80px;
      }
      .file {
        position: absolute;
        height: 80px;
        width: 80px;
        right: 0;
        top: 0;
        opacity: 0;
        display: block;
      }
    }

  }
</style>
