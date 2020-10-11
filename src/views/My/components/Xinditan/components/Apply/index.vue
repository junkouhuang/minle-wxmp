<template>
  <div class="Mipu_Open">

    <tops>
      <div slot="left" class="arrow" @click="returns"></div>
      <div slot="center" class="title">服务申请</div>
    </tops>

    <div class="content11">

      <div class="tips">准确填写您的服务申请资料以便平台工作员与您尽快联系</div>

      <div class="content1">
        <div class="name">
          <span>*</span>
          <b>品牌名称</b>
          <input
            v-model="ruleForm.applyMipuName"
            class="mc"
            placeholder="请填写您的品牌名称"
          />
        </div>
        <div class="type">
          <span>*</span>
          <b>经营方式</b>
          <div class="type-item">
            <input
              v-model="waysName"
              maxlength="12"
              class="mc"
              placeholder="请选择经营方式" readonly
            />
            <!--<img src="./img/right.png" class="icon_right" />-->
          </div>
        </div>
        <div class="type">
          <span>*</span>
          <b>经营类型</b>
          <div @click="requsetTypeData" class="type-item">
            <input
              v-model="typeName"
              maxlength="12"
              class="mc"
              placeholder="请选择经营范围" readonly
            />
            <img src="./img/right.png" class="icon_right" />
          </div>
        </div>
      </div>

      <div class="content2">
        <div class="tel">
          <span>*</span>
          <b>联系电话</b>
          <input
            placeholder="请填写联系人或负责人手机号"
            v-model="ruleForm.applyMipuTelephone"
          />
        </div>
        <div class="address" @click="china">
          <span>*</span>
          <b>经营地址</b>
          <div class="dot">
            <input class="choose" :value="`${ruleForm.applyMipuProvince}${ruleForm.applyMipuCity}${ruleForm.applyMipuRegion}`"  placeholder="请选择经营地址" readonly></input>
            <img src="./img/right.png" class="icon_right" />
          </div>
        </div>
        <van-popup v-model="showChina" :style="{width:'100%', height: '65%',borderRadius:'8px',overflow:' hidden' }"  position="bottom" >
          <china @event1="change($event)" ref="childMethod"></china>
        </van-popup>
        <div class="detail">
          <span>*</span>
          <b>详细地址</b>
          <input
            placeholder="如：南门街道天仙路88号"
            v-model="ruleForm.applyMipuAddress"
          />
          <img src="./img/address.png" @click="openDetail"/>
        </div>
        <div class="tip">
         请填写实际经营地址信息，以免影响服务审核结果
        </div>
      </div>
      <van-popup v-model="showDetailAddress" :style="{width:'85%', height: '70%',borderRadius:'8px' }">
        <div class="poisList">
          <div class="title">自动定位<img src="./img/close.png" class="icon_close" @click="closeHandle" v-if="showDetailAddress"/></div>
          <div class="nearbyShops">
            <div v-for="(item,index) in poisList" :key="index" class="poisItem" @click="getDetail(item.address)">
              <div>
                <div class="name">{{item.name}}</div>
                <div class="pname"><img src="./img/address.png" @click="openDetail" class="dot"/>{{item.address}}</div>
              </div>
              <img src="./img/right.png" class="icon_right" />
          </div>
          </div>
        </div>
      </van-popup>

      <div class="content3" >
        <div class="title">
          <div class="left">
            <span>*</span>
            <span class="name">营业执照</span>
            <span class="desc">未办理营业执照可暂不上传</span>
          </div>
          <span class="shili" @click="showPopupHandle1">示例图</span>
        </div>
        <div class="zhizhao">
          <div class="left">
            <img :src="ruleForm.applyMipuLicense"  style="width: 65px;height: 65px;"  v-if="isDelLicense">
            <img src="./img/close_red.png" class="close_red" @click="delLicense"  v-if="isDelLicense"/>
          </div>
          <a href="javascript:;" class="file">
            <simple-cropper  :initParam="uploadParam" @func="getMsgFormSon1"  ref="cropper" style="width: 100%;height: 100%">
              <img src="./img/camera.png" class="default">
            </simple-cropper>
          </a>
        </div>
      </div>

      <van-popup v-model="showPopup2" class="pop">
        <p class="note">营业执照</p>
        <p class="desc">需提供真实有效完整的营业执照</p>
        <div class="bjImg2"></div>
        <img src="./img/close_white.png" class="close_white"/>
      </van-popup>

      <div class="content5" v-if="this.ruleForm.applyMipuWays == 3 || this.ruleForm.applyMipuWays == 4">
        <div class="title">
          <div class="left">
            <span>*</span>
            <span class="name">门脸照</span>
            <span class="desc">请上传门脸照，可更换</span>
          </div>
          <span class="shili" @click="showPopupHandle3">示例图</span>
        </div>
        <div class="zhizhao">
          <div class="left">
            <img :src="ruleForm.applyMipuCover"  style="width: 65px;height: 65px;"  v-if="isDeldpt">
            <img src="./img/close_red.png" class="close_red" @click="deldpt"  v-if="isDeldpt"/>
          </div>
          <a href="javascript:;" class="file">
            <simple-cropper  :initParam="uploadParam" @func="getMsgFormSon3"  ref="cropper" style="width: 100%;height: 100%">
              <img src="./img/camera.png" class="default">
            </simple-cropper>
          </a>
        </div>
      </div>
      <van-popup v-model="showPopup3" class="pop">
        <p class="note">驾驶证照</p>
        <p class="desc">需真实有效、清晰完整的手持驾驶证照</p>
        <div class="bjImg3"></div>
        <img src="./img/close_white.png" class="close_white"/>
      </van-popup>

      <div class="content6" v-if="this.ruleForm.applyMipuWays == 1 || this.ruleForm.applyMipuWays == 2">
        <div class="title">
          <div class="left">
            <span>*</span>
            <span class="name">驾驶证照</span>
            <span class="desc">请上传手持驾驶证照</span>
          </div>
          <span class="shili" @click="showPopupHandle4">示例图</span>
        </div>
        <div class="zhizhao">
          <div class="left">
            <div v-for="(item,index) in  ruleForm.applyMipuPicture" :key="index">
              <div v-if="isDeldphjt" class="isDeldphjt">
                <img :src="item"  style="width: 65px;height: 65px;"   >
                <img src="./img/close_red.png" class="close_red" @click="deldphjt(index)"/>
              </div>
            </div>
          </div>
          <a href="javascript:;" class="file">
            <simple-cropper  :initParam="uploadParam" @func="getMsgFormSon4"  ref="cropper" style="width: 100%;height: 100%">
              <img src="./img/camera.png" class="default">
            </simple-cropper>
          </a>
        </div>
      </div>
      <van-popup v-model="showPopup4" class="pop">
        <p class="note">门脸照</p>
        <p class="desc">门脸品牌头像展示，可更换</p>
        <div class="bjImg4"></div>
        <img src="./img/close_white.png" class="close_white"/>
      </van-popup>

      <div class="content9" >

      </div>

    </div>

    <div class="next_btn">
      <button @click="next" class="btnBT">开始实名认证</button>
      <div class="agree">开通服务表示您已同意<router-link to="/my/xinditan/protocol">《民乐荟服务协议》</router-link></div>
    </div>

    <div class="scope-mask" v-if="showScopeMask">
      <div class="bg" :style="{ opacity: scopeOpacity }" @click="closeScopeMask"></div>
      <div class="mask-shell1" :style="{ bottom: scopeBottom }">
        <div class="type-title">经营类型<span>选择鑫地摊经营类型</span></div>
        <div class="type-list" v-if="typeList[0]">
          <p
            class="type-item"
            :class="{ active: n.isSelect }"
            v-for="(n, i) in typeList"
            :key="i"
            @click="selectScope(i, n)"
          >
            {{ n.name }}
          </p>
        </div>
        <div class="button" @click="closeScopeMask">确定</div>
      </div>
    </div>

  </div>
</template>

<script>
export { default } from "./js/index";
</script>
<style lang="less" scope>
@import "./less/index";
</style>
