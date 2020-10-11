<template>
  <div class="userdata">
    <div class="content">
      <tops>
        <div slot='left' class="arrow" @click="returns"></div>
        <div slot='center' class="title">修改米铺信息</div>
      </tops>
      <div>
        <div class="headr">
          <div class="a clear">
            <p class="head">米铺头像</p>
            <div class="img">
              <div class="clears">
                <a href="javascript:;" class="file">
                  <simple-cropper :initParam="uploadParam" @func="getMsgFormSon"  ref="cropper" style="width: 100%;height: 100%">
                    <img :src="list.mipuCover"  style="width: 50px;height:50px;border-radius: 4px;margin-top: 9px;">
                  </simple-cropper>
                </a>
                <img class="right" src="./img/right.png"/>
              </div>
            </div>
          </div>
        </div>
        <div class="inputs">
          <van-field  disabled label="米铺名称" >
            <span slot="input" class="applyMipuName">{{list.mipuName}}</span>
          </van-field>
          <van-field  disabled  label="店长">
            <span slot="input" class="applyUserName">{{list.userName}}</span>
          </van-field>
          <van-field  label="米铺电话"  v-model="list.mipuTelephone" type="tel" maxlength="11" class="applyMipuTelephone"  placeholder="请输入手机号码">
          </van-field>
          <van-field   label="营业时间" disabled  v-model="list.mipuHours" class="applyMipuHours" input-align="left" @click="showPickerHandle" >
          </van-field>
          <van-field
            v-model="list.mipuDescribe"
            rows="2"
            autosize
            label="店铺简介"
            type="textarea"
            maxlength="100"
            placeholder="请输入留言"
            show-word-limit
          />
        </div>
        <van-popup position="bottom" v-model="showPicker" closeable  @close="cancelHandle" >
          <div class="hourse"><span class="rest" :class="active==1?'active':''" @click="chooseType(1)">今日休息</span><span class="twenty" :class="active==2?'active':''"  @click="chooseType(2)">24小时服务</span></div>
          <van-picker show-toolbar :columns="columns"  @change="changeHandle" confirm-button-text=" " cancel-button-text=" " />
        </van-popup>
        <div class="btnse">
          <van-button type="danger" @click="updateuser">保存</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export {default} from './js/index'
</script>
<style lang="less" scope>
  @import './less/index';
</style>

