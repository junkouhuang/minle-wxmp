<template>
  <div class="protocol">
      <tops>
        <div slot='left' class="arrow" @click="returns"></div>
        <div slot='center' class="title">用户协议</div>
      </tops>
    <div class="list">
      <div class="item">
        一、帐号注册<br/><br/>
        <p>
          1、用户在使用本服务前需要注册“民乐荟”帐号。“民乐荟”帐号应当使用手机号码绑定注册，请用户使用尚未与“民乐荟”帐号绑定的手机号码，以及未被民乐荟根据本协议封禁的手机号码注册“民乐荟”帐号。民乐荟可以根据用户需求或产品需要对帐号注册和绑定的方式进行变更，而无须事先通知用户。</p>
        <p>2、鉴于“民乐荟”帐号的绑定注册方式，您同意民乐荟在注册时将使用您提供的手机号码及/或自动提取您的手机号码及自动提取您的手机设备识别码等信息用于注册。
        <p>
        3、在用户注册及使用本服务时，民乐荟需要搜集能识别用户身份的个人信息以便民乐荟可以在必要时联系用户，或为用户提供更好的使用体验。民乐荟搜集的信息包括但不限于用户的姓名、性别、年龄、出生日期、身份证号、地址、个人说明；民乐荟同意对这些信息的使用将受限于第三条用户个人或隐私信息保护的约束。</p>
      </div>
      <div class="item">
        二、服务内容<br/><br/>
        <p>
          本服务的具体内容由民乐荟根据实际情况提供，包括但不限于授权用户通过其帐号进行即时通讯、购买商品、发布留言。民乐荟可以对其提供的服务予以变更，且民乐荟提供的服务内容可能随时变更；用户将会收到民乐荟关于服务变更的通知。</p>
      </div>
      <div class="item">
        三、用户个人或隐私信息保护<br/><br/>
        <p>
          用户在注册帐号或使用本服务的过程中，可能需要填写或提交一些必要的信息，如法律法规、规章规范性文件（以下称“法律法规”）规定的需要填写的身份信息。如用户提交的信息不完整或不符合法律法规的规定，则用户可能无法使用本服务或在使用本服务的过程中受到限制。</p>
      </div>
    </div>
  </div>

</template>

<script>
  import Tops from "@/components/Top";
  import eventBus from '@/common/js/evenbus'

  export default {
    name: "index",
    data(){
      return {
        frm:[]
      }
    },
    components: {
      Tops
    },
    methods:{
      //回退
      returns() {
        this.$router.go(-1)
      },
      agree(){
        this.$router.back()
      }
    },
    created(){
    },
    mounted(){
      this.frm = this.$route.query.fm;
    },
    destroyed(){
      eventBus.$emit('agree',{'fm':this.frm,'agree':true})
    }
  } 
</script>

<style scoped lang="less">
  .protocol {
    p {
      margin-bottom: 15px;
    }

    .list {
      padding: 1.8rem 28px 122px 28px;
      color: #333333;
      .item {
        color: #333333;
        font-size: 14px;
        text-align: left;
        line-height: 28px;
        margin-bottom: 20px;

      }
    }
  }
</style>
