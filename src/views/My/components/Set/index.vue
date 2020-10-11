<template>
  <div class="set">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">设置</div>
    </tops>
    <div class=" list" >
      <van-cell @click="userData" class="account">
        <span>会员信息</span>
        <img src="./img/right.png" alt style="width: 0.3rem;float: right;margin-top: 7px;"/>
      </van-cell>
      <van-cell @click="account" class="account">
        <span>账号与安全</span>
        <img src="./img/right.png" alt style="width: 0.3rem;float: right;margin-top: 7px;"/>
      </van-cell>
      <van-cell @click="realNameAuth" class="account">
        <span>实名认证</span>
        <img src="./img/right.png" alt style="width: 0.3rem;float: right;margin-top: 7px;"/>
      </van-cell>
    </div>

    <div class=" list2" >
      <van-cell class="account">
        <span>客服热线</span>
        <span style="float: right;color:#666666;">
          <a href="tel:400-833-7998" style="color:#666666;">400-833-7998</a>
        <img src="./img/right.png" alt style="width: 0.3rem;margin-top: 7px;"/></span>
      </van-cell>
      <van-cell @click="feedback" class="account">
        <span>意见反馈</span>
        <img src="./img/right.png" alt style="width: 0.3rem;float: right;margin-top: 7px;"/>
      </van-cell>
    </div>

    <div class=" list2" >
      <van-cell @click="serviceProtocol" class="account">
        <span>服务协议</span>
        <img src="./img/right.png" alt style="width: 0.3rem;float: right;margin-top: 7px;"/>
      </van-cell>
      <van-cell @click="userDataPolicy" class="account">
        <span>隐私政策</span>
        <img src="./img/right.png" alt style="width: 0.3rem;float: right;margin-top: 7px;"/>
      </van-cell>
      <van-cell @click="serviceDesc" class="account">
        <span>应用介绍</span>
        <span style="float: right;color:#666666;">民乐荟商城<img src="./img/right.png" alt style="width: 0.3rem;margin-top: 7px;"/></span>
      </van-cell>
      <van-cell class="account">
        <span>关于民乐荟商城</span>
        <span style="float: right;color:#666666;padding-right:5px;">v1.0</span>
      </van-cell>
    </div>
    <div class="list e" @click="loginout">
        安全退出
    </div>
  </div>
</template>
<script>
  export {default} from './js/index'
</script>

<style lang="less" scoped>
  @import './less/index';
</style>


