<template>
    <div class="set">
      <tops>
        <div slot='left' class="arrow" @click="returns"></div>
        <div slot='center' class="title">账号与安全</div>
      </tops>
      <div class="s_content">
        <div class="s_item">
          <span>会员号</span>
          <div  class="odiv">
            <span>{{username}}</span>
            <!--<img src="./images/right.png" alt/>-->
          </div>
        </div>
        <div class="s_item">
          <span>手机号</span>
          <div class="odiv">
            <span>{{telephone}}</span>
           <!-- <img src="./images/right.png" alt/>-->
          </div>
        </div>
        <div class="s_item2" @click="$router.push('/passwordset')">
          <span>账号密码</span>
          <div  class="odiv">
            <span>已设置</span>
            <img src="./images/right.png" alt/>
          </div>
        </div>
        <p class="tips">如果遇到账号被盗、忘记密码、无法登录等账号问题，可联系民乐荟公众号客服。</p>
      </div>
    </div>
</template>

<script>
  export {default} from './js'
</script>
<style lang="less" scope>
  @import 'less/index';
</style>
