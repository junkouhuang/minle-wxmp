<template>
  <div class="complaint-page">
    <tops>
      <div slot="left" class="arrow" @click="$router.go('-1')"></div>
      <div slot="center" class="title">意见反馈</div>
    </tops>
    <div class="complaint-message">
      <div class="complaint-type2" @click="handleSelectType">
        <div class="complaint-left">
          <p class="name">反馈内容</p>
          <p v-if="selectName!='请选择反馈内容'" class="message2">{{ selectName }}</p>
          <p v-else class="message" style="color: #808080;">{{ selectName }}</p>
        </div>
        <img src="./img/right.png" alt="" />
      </div>
      <div class="upload-image2">
        <p class="title">反馈信息<span class="desc">支持图文，单次最多支持6张图片</span></p>
        <div class="image-list">
          <div class="image-item" v-for="(n, i) in imageList" :key="i">
            <img :src="n" alt="" />
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
            class="simple-cropper"
          >
            <img src="./img/upload.png" alt="" />
          </simple-cropper>
        </div>
      </div>
      <div class="texrarea">
        <textarea
          v-model="description"
          placeholder="补充更多的内容信息，以便我们更好的为您解决问题...（必填）"
        ></textarea>
      </div>
      <div class="submit-button2" @click="handleSubmit">提交</div>
    </div>
  </div>
</template>
<script>
import Tops from "@/components/Top";
import SimpleCropper from "@/components/SimpleCropper";
import { Dialog } from "vant";
export default {
  data() {
    return {
      mipuNo: "",
      selectName: "选择反馈内容",
      type: null,
      imageList: [],
      description: "",
      uploadParam: {
        fileType: "recruit", // 其他上传参数
        uploadURL: this.$dataURL + "uploadAction/qcloudImg", // 上传地址
        scale: 4 // 相对手机屏幕放大的倍数: 4倍
      }
    };
  },
  components: {
    Tops,
    SimpleCropper
  },
  async created() {
    //this.$storage.remove("select__item");
    //this.$storage.remove("select__index");
    this.activated();
  },
  methods: {
    async activated() {
      const selectItem = this.$storage.get("select__item");
      if (selectItem) {
        this.selectName = selectItem.name;
        this.type = selectItem.id;
      }
    },
    handleSelectType() {
      this.$router.push({
        path: "/feedback/type"
      });
    },
    //上传封面图片
    getMsgFormSon(data) {
      if(this.imageList.length<6){
        this.imageList.push(data);
      }else{
        this.$toast("单次最多支持6张图片")
      }
    },
    //删除图片
    handleDelete(index) {
      this.imageList.splice(index, 1);
    },
    async handleSubmit() {
      if (this.selectName === "选择反馈内容") {
        this.$toast("请选择您要反馈的内容");
        return;
      }
      if (!this.description) {
        this.$toast("请详细补充您要反馈的内容信息，以便我们更好的为您解决问题。");
        return;
      }

      const params = {
        mipuNo: this.mipuNo,
        type: this.type,
        description: this.description,
        imgUrl: this.imageList.join(",")
      };
      const resp = await this.$http({
        method: "post",
        url: "/minle/mall/tipoff/add",
        data: params
      });
      if (resp.data.returnCode == "ERR_0000") {
        const that = this;
        this.$dialog
          .alert({
            message: "反馈已受理，平台正在核实...，非常感谢您宝贵的意见。"
          })
          .then(() => {
            that.$router.back()
          });
      }
    }
  }
};
</script>
<style lang="less">
.complaint-page {
  box-sizing: border-box;
  padding-top: 45px;
  .complaint-message {
    box-sizing: border-box;
    padding: 0 8px;
    background-color: #fff;
    .complaint-type2 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #F7F7F7;
      height: 56px;
      padding: 0 11px;
      .complaint-left {
        display: flex;
        align-items: center;
        height: 100%;
        .symbol {
          color: #ff0000;
          font-size: 15px;
        }
        .name {
          font-size: 14px;
          color: #333333;
        }
        .message2 {
          margin-left: 14px;
          color:#FF5555;
          font-size: 14px;
        }
      }
      img {
        width: 8px;
        height: 13px;
      }
    }
    .upload-image2 {
      box-sizing: border-box;
      padding-top: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #F7F7F7;
      padding: 15px 11px;
      .title {
        font-size: 14px;
        color: #333333;
        .desc {
          font-size: 14px;
          color: #909090;
          margin-left: 10px;
        }
      }
      .image-list {
        display: flex;
        flex-wrap: wrap;
        margin-top: 13px;
        .image-item {
          width: 80px;
          height: 80px;
          margin-right: 25px;
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
            top: -23px;
            right: -23px;
          }
        }
      }
    }
    .texrarea {
      box-sizing: border-box;
      padding: 13px 4px;
      textarea {
        width: 350px;
        font-size: 14px;
        line-height: 20px;
        height: 100px;
        border: none;
        resize: none;
      }
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
  .submit-button2 {
    width: 345px;
    height: 40px;
    background: linear-gradient(
      270deg,
      rgba(255, 85, 85, 1) 0%,
      rgba(255, 85, 85, 1) 100%
    );
    position: fixed;
    left: 15px;
    bottom: 25px;
    font-size: 16px;
    color: #fff;
    line-height: 38px;
    border-radius: 22px;
    text-align: center;
  }
}
</style>
