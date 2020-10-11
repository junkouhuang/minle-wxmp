<template>
  <div class="complaint-page">
    <tops>
      <div slot="left" class="arrow" @click="$router.go('-1')"></div>
      <div slot="center" class="title">举报商家</div>
    </tops>
    <div class="complaint-message">
      <div class="complaint-type" @click="handleSelectType">
        <div class="complaint-left">
          <p class="symbol">*</p>
          <p class="name">举报类型</p>
          <p v-if="selectName != '' && selectName != '选择举报类型'" class="message2">{{ selectName }}</p>
          <p v-else class="message">{{ selectName }}</p>
        </div>
        <img src="../img/right.png" alt="" />
      </div>
      <div class="upload-image">
        <p class="title"><span style="color:#ff0000;">*</span>举报凭证<span class="desc">最多支持6张图片</span></p>
        <div class="image-list">
          <div class="image-item" v-for="(n, i) in imageList" :key="i">
            <img :src="n" alt="" />
            <img
              src="../img/close.png"
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
            <img src="../img/upload.png" alt="" />
          </simple-cropper>
        </div>
      </div>
      <div class="texrarea">
        <textarea
          v-model="description"
          placeholder="补充更多信息以便我们更快帮您解决...（必填）"
        ></textarea>
      </div>
      <div class="submit-button" @click="handleSubmit">提交</div>
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
      selectName: "选择举报类型",
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
    this.mipuNo = this.$route.query.mipuNo;
    this.$storage.remove("select__item");
    this.$storage.remove("select__index");
  },
  async activated() {
    const selectItem = this.$storage.get("select__item");
    if (selectItem) {
      this.selectName = selectItem.name;
      this.type = selectItem.id;
    }
  },
  methods: {
    handleSelectType() {
      this.$router.push({
        path: "/my/mipu_home/new/buyer/select"
      });
    },
    //上传封面图片
    getMsgFormSon(data) {
      if(this.imageList.length<6){
        this.imageList.push(data);
      }else{
        this.$toast("单次提交最多支持6张图片")
      }
    },
    //删除图片
    handleDelete(index) {
      this.$dialog
        .confirm({
          title: "",
          message: "确认删除图片",
          confirmButtonText: "确认",
          cancelButtonText: "取消"
        })
        .then(() => {
          this.imageList.splice(index, 1);
        })
        .catch(() => {});
    },
    async handleSubmit() {
      if (this.selectName === "选择举报类型") {
        this.$toast("请选择举报类型");
        return;
      }
      if (!this.description) {
        this.$toast("请输入举报信息");
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
            message: "举报已受理，平台正在核实处理"
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
    .complaint-type {
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
          color: #ff5555;
          font-size: 15px;
        }
        .name {
          font-size: 14px;
          color: #333333;
        }
        .message {
          margin-left: 14px;
          color: #808080;
          font-size: 14px;
        }
        .message2 {
          margin-left: 14px;
          color: #333333;
          font-size: 14px;
        }
      }
      img {
        width: 8px;
        height: 13px;
      }
    }
    .upload-image {
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
  .submit-button {
    width: 345px;
    height:40px;
    line-height:38px;
    font-size:16px;
    background: linear-gradient(270deg,#f55,#f55);
    color: #FFFFFF;
    position: fixed;
    left: 15px;
    bottom: 25px;
    border-radius: 22px;
    text-align: center;
  }
}
</style>
