<template>
    <!--<div>深圳鑫泉米科技有限公司◎技术支持</div>-->
    <div>
      <span>注册代表您已同意民乐荟商城<router-link :to="{path: '/protocol/user/service'}" style="color:#FF5555;">用户协议</router-link>、<router-link :to="{path: '/protocol/user/policy'}"  style="color:#FF5555;">隐私政策</router-link></span>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="less">
div {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #c2c2c2;

    span {
      margin-left: 0px;
      cursor: pointer;
      color: #666666;
    }
}


</style>
