<template>
  <div class="store-page">
    <tops>
      <div slot="left" class="arrow" @click="$router.go('-1')"></div>
      <div slot="center" class="title">我的鑫地摊</div>
    </tops>

    <div class="mipu-cover">
      <div class="title">
        <div class="left">
          <span class="name">品牌门脸照</span>
          <span class="desc">请上传品牌门脸照，可更换</span>
        </div>
        <span class="shili" @click="showPopupHandle3">示例图</span>
      </div>
      <div class="cover-detial">
        <img v-if="mipuData.applyMipuCover != '' && mipuData.applyMipuCover != null" class="cover-item" alt="" :src="mipuData.applyMipuCover" />
        <img v-else src="./img/default.png"/>
        <simple-cropper :initParam="uploadParam"
          @func="getMsgFormSon"
          ref="cropper"
          class="simple-cropper"
        >
          <img src="./img/upload.png" alt="" />
        </simple-cropper>
      </div>
    </div>

    <van-popup v-model="showPopup4" class="pop">
      <p class="note">品牌门脸照</p>
      <p class="desc">品牌头像展示，可更换</p>
      <div class="bjImg4"></div>
      <img src="./img/close_white.png" class="close_white"/>
    </van-popup>

    <div class="mipu-msg">
      <div class="msg-item">
        <p class="name"><b>品牌名称</b></p>
        <p class="xq">{{ mipuData.applyMipuName }}</p>
      </div>
      <div class="msg-item">
        <p class="name"><b>经营方式 </b></p>
        <p class="xq">{{ mipuData.applyMipuWays | applyMipuWays }}</p>
      </div>
      <div class="msg-item">
        <p class="name"><b>经营范围 </b></p>
        <p class="xq">{{ mipuData.applyMipuType | applyMipuType }}</p>
      </div>
      <div class="msg-item">
        <p class="name"><b>经营地址</b></p>
        <p class="address">
          {{ mipuData.applyMipuProvince }}{{ mipuData.applyMipuCity }}{{ mipuData.applyMipuRegion }}{{ mipuData.applyMipuAddress }}
        </p>
      </div>
    </div>

    <div class="userinfo">
      <div class="user-item">
        <div class="item-left">
          <p class="name" style="color:#333333;"><b>联系电话</b></p>
          <input
            type="number"
            maxlength="11"
            placeholder="请输入电话号码"
            v-model="mipuData.applyMipuTelephone"
            readonly
          />
        </div>
        <img src="./img/right.png" alt="" />
      </div>
    </div>

    <div class="business-license" >
      <p class="title"><b>营业执照</b></p>
      <img :src="mipuData.mipuLicense" alt="" @click="handleImagelicense(mipuData.mipuLicense)"/>
    </div>

    <div class="store-environment">
      <div class="title">
        <div class="title-left">
          <p class="text"><b>驾驶证照</b></p>
          <p class="tip"></p>
        </div>
      </div>
      <div class="image-shell">
        <div class="image-list">
          <div
            class="image-item"
            v-for="(n, i) in mipuData.applyMipuPictures"
            :key="i"
          >
            <img class="xq" :src="n" alt="" />
            <div class="angle-sign" v-if="i == 0">
              {{ mipuData.applyMipuPictures.length }}/6
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="bottom-button">
      <div class="save" @click="handleSubmit">确认修改信息</div>
      <div class="cancellation" @click="handleCancellation">注销服务</div>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from "vant";
import Tops from "@/components/Top";
import { Uploader, Picker, Popup } from "vant";
import SimpleCropper from "@/components/SimpleCropper";
export default {
  data() {
    return {
      text: "",
      uploadParam: {
        fileType: 'recruit', // 其他上传参数
        uploadURL: this.$dataURL + 'uploadAction/qcloudImg', // 上传地址
        scale: 4  // 相对手机屏幕放大的倍数: 4倍
      },
      showPicker: false,
      active: null,
      mipuNo: '',
      ways:0,
      mipuData: {},
      userImg: this.$dataURL + "test.png",
      image: "123",
      showPopup4: false,
    };
  },
  components: {
    Tops,
    Uploader,
    Picker,
    Popup,
    SimpleCropper
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
  },
  async created() {
    this.ways = this.$route.query.ways;
    this.mipuNo = this.$route.query.mipuNo;
    await this.requsetMipuMessage();
  },
  methods: {
    //营业执照
    async handleImagelicense(mipuLicense){
      ImagePreview({
        images:[mipuLicense] ,
        startPosition: 0,
        closeable: true,
        loop: false
      });
    },
    //上传米铺照片
    async uploadPicture(file) {
      try {
        let imageSuffix,
          imageData = file.content;
        if (imageData.includes("image/png")) {
          imageData = imageData.split("data:image/png;base64,")[1];
          imageSuffix = "png";
        } else if (imageData.includes("image/jpeg")) {
          imageData = imageData.split("data:image/jpeg;base64,")[1];
          imageSuffix = "jpg";
        }
        this.$toast.loading({
          message: "上传中...",
          forbidClick: true,
          loadingType: "spinner"
        });
        const res = await this.$http({
          method: "post",
          url: "/common/image/upload",
          data: this.$qs.stringify({
            imageSuffix,
            imageData
          }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });

        if (res.data.returnCode == "ERR_0000") {
          this.ruleForm.applyMipuPicture.push(res.data.data);
          this.$toast.clear();
        }
      } catch (err) {
        this.$toast.clear();
        console.log(err);
      }
    },
    //选择营业时间
    handleSelectTime() {
      this.showPicker = true;
    },
    //选择全天
    chooseType(type) {
      this.active = type;
      if (type == 1) {
        this.mipuData.applyMipuHours = "00:00～00:00";
      }
      if (type == 2) {
        this.mipuData.applyMipuHours = "00:00～23:59";
      }
      this.showPicker = false;
    },
    changeHandle(epicker, value, index) {
      this.active = -1;
      //此时返回的value就是个对象了
      let firstTime =
        parseInt(value[0].split(":")[0] * 60) +
        parseInt(value[0].split(":")[1]);
      let secoedTime =
        parseInt(value[1].split(":")[0] * 60) +
        parseInt(value[1].split(":")[1]);
      if (firstTime > secoedTime) {
        this.$toast("起始时间不能大于结束时间");
      } else {
        this.mipuData.applyMipuHours = value[0] + "～" + value[1];
      }
    },
    //查询店铺详情信息
    async requsetMipuMessage(index) {
      const params = {
        mipuNo:this.mipuNo
      };
      const resp = await this.$http({
        method: "post",
        data: this.$qs.stringify(params),
        url: "/minle/mall/dtc/mipuShow",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      if (resp.data.returnCode == "ERR_0000") {
        console.log(resp);
        this.mipuData = resp.data.data;
        this.mipuData.applyMipuTags = this.mipuData.applyMipuTags.split(",");
        this.mipuData.applyMipuPictures = this.mipuData.applyMipuPictures.split(
          ","
        );
      }
    },
    //删除店铺图片
    async handleDeleteImage(index) {
      this.$dialog
        .confirm({
          title: "",
          message: "确认删除？",
          confirmButtonText: "确认",
          cancelButtonText: "取消"
        })
        .then(() => {
          this.mipuData.applyMipuPictures.splice(index, 1);
        })
        .catch(() => {});
    },
    //上传封面图片
    getMsgFormSon(data) {
      this.mipuData.applyMipuCover = data;
    },
    /**
     * 店铺图示例图
     */
    showPopupHandle3(){
      this.showPopup4 = true;
    },
    //上传米铺图片
    getMsgFormSonTwo(data) {
      this.mipuData.applyMipuPictures.push(data);
    },
    //上传资料
    async handleSubmit() {
      /*
      const params = Object.assign(this.mipuData, {
        mipuNo: this.mipuNo
      });*/
      const params = {
          applyMipuCover:this.mipuData.applyMipuCover,
          mipuNo: this.mipuNo
      };
      const resp = await this.$http({
        method: "post",
        data: params,
        url: "/minle/mall/dtc/updateInfo"
      });
      if (resp.data.returnCode == "ERR_0000") {
        this.$toast("修改成功");
        /*
        setTimeout(() => {
          this.$router.go("-2");
        }, 500);*/
      }
    },
    //注销米铺
    async handleCancellation() {
      const result = await this.$dialog.confirm({
        title: "确认注销服务？",
          message: "服务注销后，数据将全部清除",
          confirmButtonText: "确认",
          confirmButtonColor: "#FF5555",
          cancelButtonText: "取消"
      });
      if (result) {
        const params = {
          mipuStatus: 0,
          mipuNo: this.mipuNo
        };
        const resp = await this.$http({
          method: "post",
          data: params,
          url: "/minle/mall/dtc/updateInfo"
        });
        if (resp.data.returnCode == "ERR_0000") {
          this.$toast("注销成功");
          setTimeout(() => {
            this.$router.go("-2");
          }, 500);
        }
      }
    }
  }
};
</script>
<style lang="less">
.store-page {
  box-sizing: border-box;
  padding-bottom: 100px;
  .mipu-cover {
    margin-top: 45px;
    border-top: 1px solid #dcdddc;
    box-sizing: border-box;
    padding: 18px 10px;
    background-color: #fff;
    .title {
      color: #333333;
      font-size: 14px;
      line-height: 15px;
    }
    .title-left {
      display: flex;
      align-items: center;
      .text {
        color: #333333;
        font-size: 14px;
      }
      .tip {
        margin-left: 10px;
        color: #909090;
        font-size: 14px;
      }
      .right {
        display: flex;
        font-size: 13px;
        color: #FF7A00;
        margin-right: 0px;
      }
    }
    .title {
      display: flex;
      justify-content: space-between;
      .left {
        span {
          color: #FF3444;
          margin-right: 0.106667rem;
        }
        .name {
          font-size: 0.373333rem;
          color: #333333;
          font-weight: bold;
        }
        .desc {
          font-size: 0.373333rem;
          color: #909090;
          margin-left: 10px;
        }
      }
      .shili {
        color: #FF5555;
        font-size: 13px;
      }
    }
    .cover-detial {
      margin-top: 19px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 65px;
        height: 65px;
      }
    }
  }
  .pop {
    width: 80%;
    border-radius:12px;

    .note {
      color: #333333;
      font-size: 15px;
      font-weight: bold;
      margin:20px 20px 0 20px;
    }
    .desc {
      color: #333333;
      font-size: 12px;
      margin:8px 20px 0 20px;
    }
    .bjImg4 {
      margin:22px 20px 30px 20px;
      background: url("./img/shili04.png");
      display: flex;
      height: 126px;
      background-size: cover;
    }
    .close_white {
      width: 26px;
      height: 26px;
      position: absolute;
      bottom:-30px ;
      left: 50%;
      margin-left: -13px;
      // z-index:2040;
      display: none;
    }
  }
  .mipu-msg {
    box-sizing: border-box;
    margin-top: 8px;
    background-color: #fff;
    padding-left: 10px;
    .msg-item {
      height: 55px;
      margin: 0px 10px 0px 0px;
      border-bottom: 1px solid #f5f5f5;
      //   align-items:center;
      box-sizing: border-box;
      padding-top: 20px;
      display: flex;
      &:last-child {
        border-bottom: none;
        height: 70px;
      }
      .item-left {
        display: flex;
        .time {
          font-size: 14px;
          color: #333333;
        }
        .sj {
          font-size: 14px;
          color: #333333;
          margin-left: 5px;
        }
      }
      .name {
        font-size: 14px;
        color: #333333;
      }
      .xq {
        font-size: 14px;
        color: #333333;
        margin-left: 15px;
      }

      img {
        width: 8px;
        height: 13px;
        margin-right: 23px;
      }
      .address {
        width: 255px;
        line-height: 26px;
        margin-left: 15px;
        margin-top: -5px;
        color: #333333;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;

      }
    }
  }
  .userinfo {
    margin-top: 8px;
    box-sizing: border-box;
    padding-left: 10px;
    background-color: #fff;
    .user-item {
      height: 55px;
      border-bottom: 1px solid #e4e4e4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:last-child {
        border-bottom: none;
      }
      .item-left {
        display: flex;
        align-items: center;
        .name {
          font-size: 14px;
          color: #333333;
        }
        .xq {
          font-size: 14px;
          color: #909090;
          margin-left: 5px;
        }
        input {
          border: none;
          font-size: 14px;
          margin-left: 10px;
        }
      }
      img {
        width: 6px;
        height: 11px;
        margin-right: 23px;
      }
    }
  }
  .business-license {
    background-color: #fff;
    box-sizing: border-box;
    padding: 18px 10px;
    margin-top: 8px;
    .title {
      font-size: 14px;
      color: #333;
    }
    img {
      width: 65px;
      height: 65px;
      margin-top: 20px;
    }
  }
  .introduce {
    background-color: #fff;
    margin-top: 8px;
    box-sizing: border-box;
    padding: 17px 20px 11px 15px;

    .title {
      font-size: 14px;
      color: #333333;
    }

    .title-left {
      display: flex;
      align-items: center;
      .text {
        color: #333333;
        font-size: 14px;
      }
      .tip {
        margin-left: 10px;
        color: #909090;
        font-size: 14px;
      }
    }

    textarea {
      width: 340px;
      height: 90px;
      font-size: 14px;
      color: #333;
      line-height: 23px;
      margin-top: 10px;
      border: none;
      resize: none;
    }
    .number {
      color: #808080;
      font-size: 13px;
      text-align: right;
      margin-top: 18px;
    }
  }
  .store-environment {
    box-sizing: border-box;
    background-color: #fff;
    padding-left: 10px;
    .title {
      margin-right: 10px;
      border-top: 1px solid #f5f5f5;
      padding-top: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title-left {
        display: flex;
        align-items: center;
        .text {
          color: #333333;
          font-size: 14px;
        }
        .tip {
          margin-left: 10px;
          color: #909090;
          font-size: 14px;
        }
      }
      .right {
        font-size: 13px;
        color: #FF7A00;
        margin-right: 0px;
      }
    }
    .image-shell {
      display: flex;
      align-items: center;
      position: relative;
      padding-bottom: 20px;
      justify-content: space-between;
      height: 85px;
      margin: 0px 10px 0px 0px;
      border-bottom: 1px solid #f5f5f5;
      .image-list {
        width: 280px;
        display: flex;
        align-items: center;
        display: -webkit-box;
        overflow-x: scroll;
        overflow-y: hidden;
        height: 85px;
        -webkit-overflow-scrolling: touch;
        .image-item {
          width: 65px;
          height: 65px;
          position: relative;
          margin-right: 15px;
          margin-top: 20px;
          &:last-child {
            margin-right: 0;
          }
          .xq {
            width: 65px;
            height: 65px;
          }
          .close {
            position: absolute;
            right: -22.5px;
            top: -22.5px;
            width: 45px;
            height: 45px;
          }
          .audit {
            position: absolute;
            top: 0;
            left: 0;
            width: 65px;
            height: 65px;
            background-color: #000;
            text-align: center;
            line-height: 65px;
            color: #fff;
            font-size: 12px;
            opacity: 0.5;
          }
          .angle-sign {
            position: absolute;
            font-size: 11px;
            color: #fff;
            bottom: 5px;
            right: 5px;
            opacity: 0.8;
          }
        }
      }
      .right {
        width: 65px;
        height: 65px;
        margin-top: 20px;
        margin-right: 10px;
      }
      .right1 {
        width: 65px;
        height: 65px;
        margin-top: 10px;
        margin-right: 10px;
      }
      .right__image {
        margin-right: 0px;
      }
    }
    .label-msg {
      box-sizing: border-box;
      padding-top: 18px;
      padding-bottom: 15px;
      .label-title {
        font-size: 14px;
        color: #333333;
      }
      .label-list {
        display: flex;
        margin-top: 20px;
        align-items: center;
        font-size:12px;
        .item {
          padding: 0 12px;
          height: 25px;
          background-color: #FFECEC;
          border-radius: 13px;
          text-align: center;
          line-height: 25px;
          margin-right: 12px;
          color: #FF5555;
        }
      }
    }
  }
  .service-msg {
    margin-top: 8px;
    background-color: #fff;
    box-sizing: border-box;
    padding-left: 10px;
    .service-item {
      height: 55px;
      margin: 0px 10px 0px 0px;
      border-bottom: 1px solid #f5f5f5;
      color: #333333;
      font-size: 14px;
      line-height: 55px;
      &:last-child {
        border-bottom: none;
      }
    }
  }
  .bottom-button {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 90px;
    background-color: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    box-shadow: 1px 1px 10px 2px #ddd;
    .save {
      width: 345px;
      height: 40px;
      line-height: 38px;
      font-size: 0.373333rem;
      background: linear-gradient(
        270deg,
        rgba(255, 85, 85, 1) 0%,
        rgba(255, 85, 85, 1) 100%
      );
      opacity: 1;
      border-radius: 20px;
      text-align: center;
      line-height: 40px;
      color: #fff;
    }
    .cancellation {
      margin-top: 10px;
      color: #333333;
      font-size: 14px;
    }
  }

  .hourse {
    height: 46px;
    line-height: 46px;
    font-size: 12px;
    text-align: center;
    margin-bottom: -40px;
    position: relative;
    z-index: 1000;
    background-color: #fff;
    .rest {
      border-radius: 18px;
      padding: 4px 8px;
      border: 1px solid #707070;
      margin-right: 20px;
    }
    .twenty {
      border-radius: 18px;
      padding: 4px 8px;
      border: 1px solid #707070;
      margin-left: 20px;
    }
    .active {
      background-color: #FFECEC;
      color: #FF5555;
      border: 1px solid #FF5555;
    }
  }

  .simple-cropper {
    width: 65px;
    height: 65px;
    position: relative;
    img {
      width: 65px;
      height: 65px;
    }
    .file {
      position: absolute;
      height: 65px;
      width: 65px;
      right: 0;
      top: 0;
      opacity: 0;
      display: block;
    }
  }
}
</style>
