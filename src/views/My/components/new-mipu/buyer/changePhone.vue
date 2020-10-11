<template>
  <div class="phone-page">
    <tops>
      <div slot="left" class="arrow" @click="$router.go('-1')"></div>
      <div slot="center" class="title">修改手机号码</div>
    </tops>
    <div class="top-phone">
        <p class="name">当前手机登陆密码</p>
        <p class="phone">13800000000</p>
    </div>
    <div class="input-list">
        <div class="input-item">
            <div class="item-left">
               <p class="name">手机号码</p>
               <input type="请输入手机号码">
            </div>
        </div>
        <div class="input-item">
            <div class="item-left">
                <p class="name">认证码</p>
                <input type="请输入认证码">
            </div>
            <p>点击发送认证码</p>
        </div>
    </div>
  </div>
</template> 
<script>
import Tops from "@/components/Top";
export default {
    data(){
        return{

        }
    },
    components:{
        Tops
    }
}
</script>
<style lang="less">
.phone-page{
    box-sizing: border-box;
    padding-top:45px;
    .top-phone{
        height:60px;
        background-color: #fff;
        display: flex;
        box-sizing: border-box;
        padding:0 15px;
        align-items: center;
        justify-content: space-between;
        .name{
            font-size:15px;
            color:#333333;
        }
        .phone{
            font-size:15px;
            color:#808080;
        }
    }
    .input-list{
        margin-top:10px;
        box-sizing: border-box;
        padding:10px 15px 0;
        background-color: #fff;
        .input-item{
            display: flex;
            align-items: center;
            border-bottom:1px solid #E4E4E4;
            height:44px;
            &:last-child{
                border:none
            }
            .item-left{
                display: flex;
                align-items: center;
                .name{
                    width:83px;
                    font-size:14px;
                    color:#333333;
                }
                input{
                    border: none;
                    font-size:14px;
                    color:#333;
                    height:100%;
                    &::placeholder{
                        color:#C7C7C7
                    }
                }
            }
        }
    }
}
</style>