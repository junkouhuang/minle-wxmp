<template>
  <div class="Mipu_Open">

    <tops>
      <div slot="left" class="arrow" @click="returns"></div>
      <div slot="center" class="title">米铺申请</div>
    </tops>

    <div class="content11">

      <div class="tips">准确填写您的米铺经营信息以便平台业务经理与您尽快联系</div>

      <div class="content1" >
        <div class="name">
          <span>*</span>
          <b>米铺名称</b>
            <input
              v-model="ruleForm.applyMipuName"
              class="mc"
              placeholder="请填写您的米铺名称"
            />
        </div>
        <div class="type">
          <span>*</span>
          <b>经营方式</b>
          <div @click="requestWaysData" class="type-item">
            <input
              v-model="waysName"
              maxlength="12"
              class="mc"
              placeholder="请选择米铺经营方式" readonly
            />
            <img src="./img/right.png" class="icon_right" />
          </div>
        </div>
        <div class="type">
          <span>*</span>
          <b>经营范围</b>
          <div @click="requsetTypeData" class="type-item">
            <input
              v-model="typeName"
              maxlength="12"
              class="mc"
              placeholder="请选择米铺经营范围" readonly
            />
            <img src="./img/right.png" class="icon_right" />
          </div>
          <!--
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="typeList"
              @cancel="showPicker = false"
              @confirm="onConfirm"
              value-key="name"
            />
          </van-popup>
          -->
        </div>
      </div>

      <div class="content2">
        <div class="tel">
          <span>*</span>
          <b>联系电话</b>
          <input
            placeholder="请填写米铺联系人或负责人手机号"
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
        <van-popup v-model="showChina" :style="{width:'100%', height: '65%',borderRadius:'8px 8px 0 0',overflow:' hidden' }"  position="bottom" >
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
          米铺经营地址需与实际注册地址一致，以免影响米铺审核结果
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

      <div class="content3" v-if="this.ruleForm.applyMipuWays == 1 || this.ruleForm.applyMipuWays == 2 || this.ruleForm.applyMipuWays == 3 || this.ruleForm.applyMipuWays == 5">
        <div class="title">
          <div class="left">
            <span>*</span>
            <span class="name">营业执照</span>
            <span class="desc">请上传营业执照或经营许可证</span>
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
      <van-popup v-model="showPopup1" class="pop" >
        <p class="note">米铺门脸</p>
        <p class="desc">提供完整的门脸照，牌匾及门框清晰可见</p>
        <div class="bjImg1"></div>
        <img src="./img/close_white.png" class="close_white"/>
      </van-popup>

      <div class="content4" v-if="this.ruleForm.applyMipuWays == 3">
        <div class="title">
          <div class="left">
            <span>*</span>
            <span class="name">米铺门脸</span>
            <span class="desc">请上传您的米铺门脸照</span>
          </div>
          <span class="shili" @click="showPopupHandle2">示例图</span>
        </div>
        <div class="zhizhao">
          <div class="left">
            <img :src="ruleForm.applyMipuEntrancePicture"  style="width: 65px;height: 65px;"  v-if="isDelmlt">
            <img src="./img/close_red.png" class="close_red" @click="delmlt"  v-if="isDelmlt"/>
          </div>
          <a href="javascript:;" class="file">
            <simple-cropper  :initParam="uploadParam" @func="getMsgFormSon2"  ref="cropper" style="width: 100%;height: 100%">
              <img src="./img/camera.png" class="default">
            </simple-cropper>
          </a>
        </div>
      </div>
      <van-popup v-model="showPopup2" class="pop">
        <p class="note">营业执照 / 经营许可证</p>
        <p class="desc">需提供真实有效完整的营业执照或许可证照</p>
        <div class="bjImg2"></div>
        <img src="./img/close_white.png" class="close_white"/>
      </van-popup>

      <div class="content5" v-if="this.ruleForm.applyMipuWays == 1 || this.ruleForm.applyMipuWays == 2 || this.ruleForm.applyMipuWays == 3 || this.ruleForm.applyMipuWays == 5">
        <div class="title">
          <div class="left">
            <span>*</span>
            <span class="name">米铺橱面</span>
            <span class="desc">请上传米铺橱面照，可更换</span>
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
        <p class="note">米铺环境</p>
        <p class="desc">需真实反映米铺实地实景环境</p>
        <div class="bjImg3"></div>
        <img src="./img/close_white.png" class="close_white"/>
      </van-popup>

      <div class="content6" v-if="this.ruleForm.applyMipuWays == 3">
        <div class="title">
          <div class="left">
            <span>*</span>
            <span class="name">米铺环境</span>
            <span class="desc">请上传米铺环境，最多6张</span>
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
        <p class="note">米铺橱面</p>
        <p class="desc">米铺品牌头像展示，可更换</p>
        <div class="bjImg4"></div>
        <img src="./img/close_white.png" class="close_white"/>
      </van-popup>

      <div class="content7"  v-if="this.ruleForm.applyMipuWays == 3">
        <div class="title">
          <div class="left">
            <span>*</span>
            <span class="name">服务标签</span>
            <span class="desc">请选择米铺特色标签，最多可选4个</span>
          </div>
        </div>
        <div class="content1">
          <div v-for="(n, i) in ruleForm.applyMipuTag" :key="i" >
            <div v-if="isDeldpbq">
              <div class="item">
                {{ n }}
              </div>
              <img src="./img/close_red.png" class="close_red" @click="deldpbq(n,i)"/>
            </div>
          </div>
          <div @click="handleAddTags">
            <img src="./img/add.png" class="icon_add" />
          </div>
        </div>
      </div>

      <div class="content9"  v-if="this.ruleForm.applyMipuWays == 1 || this.ruleForm.applyMipuWays == 2 || this.ruleForm.applyMipuWays == 3">
        <div class="type">
          <span>*</span>
          <b>服务费率</b>
          <div @click="getService" class="type-item">
            <input
              v-model="feeName"
              maxlength="12"
              class="mc"
              placeholder="请选择服务费波比"
              readonly
            />
            <img src="./img/right.png" class="icon_right" />
          </div>
          <!--
          <van-popup v-model="showFl" position="bottom">
            <van-picker
              show-toolbar
              :columns="columnsFl"
              @cancel="showFl = false"
              @confirm="onConfirmFl"
              value-key="name"
            />
          </van-popup>
          -->
        </div>
        <div class="type">
          <span>*</span>
          <b>结算周期</b>
          <div @click="periods" class="type-item">
            <input
              v-model="ruleForm.mipuSettlePeriod"
              maxlength="12"
              class="mc"
              placeholder="请选择您的结算周期"
              readonly
            />
            <img src="./img/right.png" class="icon_right" />
          </div>
          <!--
          <van-popup v-model="showZq" position="bottom">
            <van-picker
              show-toolbar
              :columns="columnsZq"
              @cancel="showZq = false"
              @confirm="onConfirmZq"
              value-key="name"
            />
          </van-popup>
          -->
        </div>
      </div>

    </div>

    <div class="next_btn">
      <button @click="next" class="btn">下一步，完成实名认证</button>
      <div class="agree">申请米铺代表您已同意<router-link to="/my/mipu_open/protocol">《民乐荟米铺服务协议》</router-link></div>
    </div>

    <div class="ways-mask" v-if="showWaysMask">
      <div class="bg" :style="{ opacity: waysOpacity }" @click="closeWaysMask"></div>
      <div class="mask-shell1" :style="{ bottom: waysBottom }">
        <div class="type-title">经营方式<span>选择米铺经营方式</span></div>
        <div class="type-list" v-if="waysList[0]">
          <p
            class="type-item"
            :class="{ active: n.isSelect }"
            v-for="(n, i) in waysList"
            :key="i"
            @click="selectWays(i, n)"
          >
            {{ n.name }}
          </p>
        </div>
        <div class="button" @click="closeWaysMask">确定</div>
      </div>
    </div>

    <div class="scope-mask" v-if="showScopeMask">
      <div class="bg" :style="{ opacity: scopeOpacity }" @click="closeScopeMask"></div>
      <div class="mask-shell1" :style="{ bottom: scopeBottom }">
        <div class="type-title">经营范围<span>米铺经营行业范围</span></div>
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

    <div class="bobi-mask" v-if="showBobiMask">
      <div class="bg" :style="{ opacity: bobiOpacity }" @click="closeBobiMask"></div>
      <div class="mask-shell1" :style="{ bottom: bobiBottom }">
        <div class="type-title">服务费<span>平台结算服务费率</span></div>
        <div class="type-list" v-if="serviceFees[0]">
          <p
            class="type-item"
            :class="{ active: n.isSelect }"
            v-for="(n, i) in serviceFees"
            :key="i"
            @click="selectFees(i, n)"
          >
            {{ n.name }}
          </p>
        </div>
        <div class="button" @click="closeBobiMask">确定</div>
      </div>
    </div>

    <div class="settle-mask" v-if="showSettleMask">
      <div class="bg" :style="{ opacity: settleOpacity }" @click="closeSettleMask"></div>
      <div class="mask-shell1" :style="{ bottom: settleBottom }">
        <div class="type-title">结算周期<span>平台结算周期自然交易日</span></div>
        <div class="type-list" v-if="settleTrans[0]">
          <p
            class="type-item"
            :class="{ active: n.isSelect }"
            v-for="(n, i) in settleTrans"
            :key="i"
            @click="selectTrans(i, n)"
          >
            {{ n.name }}
          </p>
        </div>
        <div class="button" @click="closeSettleMask">确定</div>
      </div>
    </div>

    <div class="type-mask" v-if="showMask">
      <div class="bg" :style="{ opacity: opacity }" @click="closeMask"></div>
      <div class="mask-shell1" :style="{ bottom: bottom }">
        <div class="type-title">服务标签<span>可同时选择四种服务标签</span></div>
        <div class="type-list" v-if="typeList[0]">
          <p
            class="type-item"
            :class="{ active: n.isSelect }"
            v-for="(n, i) in tagsList"
            :key="i"
            @click="selectType(i, n)"
          >
            {{ n.name }}
          </p>
        </div>
        <div class="button" @click="closeMask">确定</div>
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
