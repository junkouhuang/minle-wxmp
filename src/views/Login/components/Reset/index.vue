<template>
  <div class="reset">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">设置新密码</div>
    </tops>
    <div class="content">
      <div class="form">
        <p class="tips1">密码必须至少6个字符，最长不超过18个字符，以字母开头，包含字母、数字或下划线。</p>
        <p class="tips2">设置密码成功后，您可以使用注册时的手机号或会员名及新设置的密码在商城登录。</p>
        <div class="password" @click="passwordHandle">
          <input
            :type="password1"
            :style="{border:telicon1!==require('./images/pass1.png')?'1px solid #dee4e4':'1px solid #FF5555'}"
            v-model="pwd"
            placeholder="设置新密码"
            maxlength="18"
            ref="passwordFocusStatus" style="font-size:15px;"
          />
          <img :src="telicon1" />
          <van-icon name="eye-o" size="22px" class="seepwd" @click="seepwdFun(2)" v-if="seepwd"/>
          <van-icon name="closed-eye" size="22px" class="seepwd"  @click="seepwdFun(1)" v-else/>
        </div>
        <div class="comfirmpassword" @click="comfirmpasswordHandle">
          <input
            :type="password2"
            :style="{border:telicon2!==require('./images/pass1.png')?'1px solid #dee4e4':'1px solid #FF5555'}"
            v-model="confirmpwd"
            placeholder="确认密码"
            maxlength="18"
            ref="comfirmpasswordFocusStatus" style="font-size:15px;"
          />
          <img :src="telicon2" />
          <van-icon name="eye-o" size="22px" class="seeconfirmpwd" @click="seeconfirmpwdFun(2)" v-if="seeconfirmpwd"  color="#cccccc"/>
          <van-icon name="closed-eye" size="22px" class="seeconfirmpwd" @click="seeconfirmpwdFun(1)" v-else  color="#cccccc"/>
        </div>
        <van-button @click="setNew">完成</van-button>
      </div>
    </div>
    <Support></Support>
  </div>
</template>
<script>
  export {default} from './js/index'
</script>
<style lang="less" scope>
  @import './less/index';
</style>
