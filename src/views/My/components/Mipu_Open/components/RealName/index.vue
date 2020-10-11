<template>
  <div class="real-page">
    <tops>
      <div slot="left" class="arrow" @click="returns"></div>
      <div slot="center" class="title">实名认证</div>
    </tops>
    <div class="real-user">
      <p class="title">实名信息</p>
      <div class="real-shell">
        <div class="real-item">
          <p class="left"><span>*</span>真实姓名</p>
          <input type="text" placeholder="请输入真实姓名" v-model="ruleForm.applyAuthRealName" />
        </div>
        <div class="real-item">
          <p class="left"><span>*</span>身份证号码</p>
          <input type="text" placeholder="请输入身份证号码" v-model="ruleForm.applyAuthIdCardNo" maxlength="18"/>
        </div>
      </div>
    </div>

    <div class="upload-message">
      <p class="title">上传证件资料</p>
      <div class="idcard-msg">
          <div class="idcard-item">
            <img src="./image/close_red.png" class="close_red" @click="deldpt1" v-if="ruleForm.applyAuthIdCardFront"/>
            <a href="javascript:;" class="file">
              <simple-cropper  :initParam="uploadParam" @func="getMsgFormSon1"  ref="cropper" style="width: 100%;height: 100%">
                <img :src="ruleForm.applyAuthIdCardFront" alt="" v-if="ruleForm.applyAuthIdCardFront" />
                <img src="./image/front.png" alt="" v-else/>
              </simple-cropper>
            </a>
            <p>身份证正面人头照</p>
          </div>
          <div class="idcard-item">
            <img src="./image/close_red.png" class="close_red" @click="deldpt2"  v-if="ruleForm.applyAuthIdCardBack"/>
            <a href="javascript:;" class="file">
              <simple-cropper  :initParam="uploadParam" @func="getMsgFormSon2"  ref="cropper" style="width: 100%;height: 100%">
                <img :src="ruleForm.applyAuthIdCardBack" alt="" v-if="ruleForm.applyAuthIdCardBack" />
                <img src="./image/black.png" alt="" v-else/>
              </simple-cropper>
            </a>
            <p>身份证背面国徽照</p>
          </div>
          <div class="idcard-item">
            <img src="./image/close_red.png" class="close_red" @click="deldpt3"  v-if="ruleForm.applyAuthIdCardHandheld"/>
            <a href="javascript:;" class="file">
              <simple-cropper  :initParam="uploadParam" @func="getMsgFormSon3"  ref="cropper" style="width: 100%;height: 100%">
                <img :src="ruleForm.applyAuthIdCardHandheld" alt="" v-if="ruleForm.applyAuthIdCardHandheld" />
                <img src="./image/all.png" alt="" v-else/>
              </simple-cropper>
            </a>
            <p>身份证手持正面照</p>
          </div>
      </div>
    </div>

    <div class="ps-tips">
      <p class="title">实名认证说明：</p>
      <p class="msg">
        为满足您的业务需求，需要您使用实名认证服务，在您勾选阅读并同意实名认证服务协议后，服务可能采集如下信息：
      </p>
      <p class="msg">
        • 申请人姓名、证件号<br/>
        • 申请人证件正反两面照、手持证件照（仅身份认证获取）
      </p>
    </div>

    <div class="ps-tips">
      <p class="title">拍摄身份证要求：</p>
      <p class="msg">
        中国公民持有的本人有效二代身份证<br />
        拍摄时确保身份证<span>边缘完整，字体清晰，亮度平均</span>
      </p>
      <div class="image-list">
        <div class="image-item">
          <img src="./image/a.png" alt="" />
          <p>标准</p>
        </div>
        <div class="image-item">
          <img src="./image/b.png" alt="" />
          <p>边角缺失</p>
        </div>
        <div class="image-item">
          <img src="./image/c.png" alt="" />
          <p>照片模糊</p>
        </div>
        <div class="image-item">
          <img src="./image/d.png" alt="" />
          <p>闪光强烈</p>
        </div>
      </div>
    </div>

    <div class="submit">
      <div class="agree">
        <van-checkbox v-model="ischecked" checked-color="#FF5555" shape="square" class="ckbox" icon-size="15px">
          我已阅读并同意<router-link to="/my/real_name/protocol">《实名认证服务协议》</router-link>
        </van-checkbox>
      </div>
      <div class="button" @click="sub">确认提交资料</div>
      <p class="msg">我们会在<span>1-2</span>个工作日审核确认</p>
    </div>

  </div>
</template>

<script>
export { default } from "./js/index";
</script>
<style lang="less" scope>
@import "./less/index";
</style>
