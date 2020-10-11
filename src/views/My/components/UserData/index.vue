<template>
  <div class="userdata">
    <div class="content">
      <tops>
        <div slot='left' class="arrow" @click="returns"></div>
        <div slot='center' class="title">会员资料</div>
      </tops>
      <div class="headr">
        <div class="a clear">
          <p class="head">头像</p>
          <div class="img">
            <div class="clears">
              <a href="javascript:;" class="file">
                <simple-cropper :initParam="uploadParam" @func="getMsgFormSon" :successCallback="uploadHandle" ref="cropper" style="width: 100%;height: 100%">
                  <img v-if="topic != '' && topic != null" :src="topic"  style="width: 100%;border-radius: 100%;margin-top: 4px;">
                  <img v-if="topic == '' || topic == null" src="../../icon/redtony.png" style="width: 100%;border-radius: 100%;margin-top: 4px;"/>  
                </simple-cropper>
              </a>
              <img class="right" src="../../icon/right.png"/>
            </div>
          </div>
        </div>
      </div>
      <div class="inputs">
        <van-field  disabled label="会员号" style="margin-bottom: 1px">
          <span slot="input" class="uno">{{uno}}</span>
        </van-field>
        <van-field  disabled  label="手机号" >
          <span slot="input" class="telephone">{{telephone}}</span>
        </van-field>
      </div>
      <div class="inputs">
        <van-field v-model="nickname"  clearable label="昵称" placeholder="请输入您的昵称"  style="margin-bottom: 1px"/>
        <van-field v-model="sex"  clearable label="性别" placeholder="请选择性别" @click="showpop1" disabled  />
        <van-field v-model="birthday"  clearable label="生日" placeholder="请选择生日" @click="showpop2" disabled/>
        <van-popup
          v-model="showPopup1"
          position="bottom"
        >
          <div @click="getSex(1)" class="famale">男</div>
          <div @click="getSex(2)" class="famale">女</div>
          <div @click="cancel" class="cancel">取消</div>
        </van-popup>
        <van-popup
          v-model="showPopup2"
          position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm = "getDateTime"
            @cancel = "showPopup2 =false"
          />
        </van-popup>
      </div>
      <div class="btnse2">
        <button @click="updateuser">保存</button>
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

