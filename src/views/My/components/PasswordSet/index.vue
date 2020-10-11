<template>
  <div class="passwordset">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">设置密码</div>
    </tops>
    <div class="ps_content">
      <van-cell-group>
        <van-field
          v-model="oldpassword"
          :type="type1"
          required
          label="原密码"
          placeholder="请输入原密码"
        >
          <img src="./images/e02.png"  slot="right-icon" class="eyes1" v-if="seen1" @click="seen1Fun"/>
          <img src="./images/e01.png"  slot="right-icon" class="eyes2" v-else @click="seen1Fun"/>
        </van-field>
        <van-field
          v-model="password"
          :type="type2"
          required
          label="新密码"
          placeholder="请输入新密码"
        >
          <img src="./images/e02.png"  slot="right-icon" class="eyes1"  v-if="seen2" @click="seen2Fun"/>
          <img src="./images/e01.png"  slot="right-icon" class="eyes2"  v-else @click="seen2Fun"/>
        </van-field>
        <van-field
          v-model="conifrmpassword"
          :type="type3"
          required
          label="确认密码"
          placeholder="再次输入新密码"
        >
          <img src="./images/e02.png"  slot="right-icon" class="eyes1"  v-if="seen3" @click="seen3Fun"/>
          <img src="./images/e01.png"  slot="right-icon" class="eyes2"  v-else @click="seen3Fun"/>
        </van-field>
      </van-cell-group>
    </div>
    <p class="tips">密码必须至少6个字符，同时包含字母和数字。</p>
    <div class="btnes">
      <van-button type="danger" @click="setPwd" class="btn">保存</van-button>
    </div>
  </div>
</template>

<script>
  export {default} from './js/index'
</script>
<style lang="less" scope>
  @import './less/index';
</style>
