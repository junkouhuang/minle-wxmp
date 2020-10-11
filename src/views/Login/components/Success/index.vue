<template>
  <div class="success">
    <tops>
      <div slot='left' class="arrow" @click="returns"></div>
      <div slot='center' class="title">注册成功</div>
    </tops>
    <div class="content">
      <!-- 进度条 -->
      <div class="jdt">
        <img src="../../image/three.png" alt/>
        <!--<span class="one">验证手机号</span>
        <span class="szmm">设置密码</span>
        <span class="szcg">注册成功</span>-->
      </div>

      <div class="goshopping">
        <img src="../../image/Ok.png" class="gou">
        <p class="suc">注册成功</p>
        <div @click="share" class="btn">开启购物之旅</div>
      </div>

      <div class="ok">
        <div class="title">购物方式</div>
        <div class="bz">
          <p>扫一扫关注公众号</p>
        </div>
        <div class="gzh">
          <img src="../../image/gzh.jpg" alt="">
        </div>
      </div>
      
    </div>
    <!--<Support2></Support2>-->
  </div>
</template>
<script>
  //import Support2 from "@/components/Support/index2";
  import Tops from "@/components/Top";

  export default {
    data() {
      return {
        basecode:'',
        scode:false,
        shareurl:'https://minle.xinquanjk.com/minlewxmp/index.html'
      };
    },
    methods: {
      //箭头回退
      returns() {
        this.$router.go(-1)
      },
      //静默登录
      tologin(username,password){
        let formData = new FormData();
        formData.append("username",username);
        formData.append("password",password);
        formData.append("rookie","");
        formData.append("passcode","");
        this.$http({
          method: 'post',
          url: this.$url.login,
          data: formData
        })
          .then(res => {
            localStorage.setItem('token', res.data.data.token.access_token);
          }).catch(e => {

        })
      },
      share(){
        window.location.href=this.shareurl;
      }
    },
    components: {
      Tops
    },
    mounted() {
      this.basecode = sessionStorage.getItem('basecode') == null?'':sessionStorage.getItem('basecode');
      this.tologin(this.$route.query.username,this.$route.query.password);
      this.scode = sessionStorage.getItem('scode')!=null || sessionStorage.getItem('scode')!=undefined?true:false ;
      this.shareurl = sessionStorage.getItem('shareurl')
    }
  };
</script>
<style lang="less" scope>
  @import './less/index';
</style>
