<template>
  <div class="protocol">
      <tops>
        <div slot='left' class="arrow" @click="returns"></div>
        <div slot='center' class="title">民乐荟商城服务协议</div>
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
          1、用户在注册帐号或使用本服务的过程中，可能需要填写或提交一些必要的信息，如法律法规、规章规范性文件（以下称“法律法规”）规定的需要填写的身份信息。如用户提交的信息不完整或不符合法律法规的规定，则用户可能无法使用本服务或在使用本服务的过程中受到限制。</p>
        <p>
          2、个人或隐私信息是指涉及用户个人或身份或个人或隐私的信息，比如，用户真实姓名、证件号、手机号码、手机设备识别码、IP地址。非个人或隐私信息是指用户对本服务的操作状态以及使用习惯等明确且客观反映在民乐荟服务器端的基本记录信息、个人或隐私信息范围外的其它普通信息，以及用户同意公开的上述隐私信息。</p>
        <p>
          3、尊重用户个人或隐私信息的私有性是民乐荟的一贯制度，民乐荟将采取技术措施和其他必要措施，确保用户个人或隐私信息安全，防止在本服务中收集的用户个人或隐私信息泄露、毁损或丢失。在发生前述情形或者民乐荟发现存在发生前述情形的可能时，将及时采取补救措施。</p>
        <p>4、民乐荟未经用户同意不向任何第三方公开、透露用户个人或隐私信息。但以下特定情形除外：</p>
        <p>(1) 民乐荟根据法律法规规定或有权机关的指示提供用户的个人或隐私信息；</p>
        <p>(2) 由于用户将其用户密码告知他人或与他人共享注册帐户与密码，由此导致的任何个人或信息的泄漏，或其他非因民乐荟原因导致的个人或隐私信息的泄露；</p>
        <p>(3) 用户自行向第三方公开其个人或隐私信息；</p>
        <p>(4) 用户与民乐荟及合作单位之间就用户个人或隐私信息的使用公开达成约定，民乐荟因此向合作单位公开用户个人或隐私信息；</p>
        <p>(5) 任何由于黑客攻击、电脑病毒侵入及其他不可抗力事件导致用户个人或隐私信息的泄露。</p>
        5、用户同意民乐荟可在以下事项中使用用户的个人或隐私信息：
        <p>(1) 民乐荟向用户及时发送重要通知，如软件更新、本协议条款的变更；</p>
        <p>(2) 民乐荟内部进行审计、数据分析和研究等，以改进民乐荟的产品、服务和与用户之间的沟通；</p>
        <p>(3) 依本协议约定，民乐荟管理、审查用户信息及进行处理措施；</p>
        <p>(4) 适用法律法规规定的其他事项。</p>
        <p>除上述事项外，如未取得用户事先同意，民乐荟不会将用户个人或隐私信息使用于任何其他用途。</p>
      </div>
    </div>
    <!--
    <div class="agree">
      <div @click="agree">同意</div>
    </div>-->
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

      .item {
        color: #333333;
        font-size: 14px;
        text-align: left;
        line-height: 28px;
        margin-bottom: 20px;

      }
    }

    .agree {
      width: 100%;
      height: 80px;
      background-color: rgba(255, 255, 255, .85);
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;

      div {
        color: #ffffff;
        background: linear-gradient(270deg,#FF5555,#FF5555);
        box-shadow: 0 0.106667rem 0.16rem 0 rgba(27, 191, 128, 0.3);
        border-radius: 25px;
        font-size: 16px;
        width: 169px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        margin: auto;
        position: relative;
        top: 17px;
        left: 0;
        right: 0;
      }
    }
  }
</style>
