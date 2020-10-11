<template>
  <div class="protocol">
      <tops>
        <div slot='left' class="arrow" @click="returns"></div>
        <div slot='center' class="title">米铺服务协议</div>
      </tops>
    <div class="list">
      <div class="item">
        导语<br/><br/>
        <p>
          欢迎阅读《民乐荟米铺服务协议》（下称“本协议”）是用户（下称“您”）与深圳米满仓健康产业有限公司（下称“民乐荟”或“我们”）之间的协议，民乐荟将严格依照本协议条款提供的米铺展示与支付服务（下称“本服务”），您应当阅读并遵守本协议，并充分理解各项条款内容，除非您已阅读并接受本协议所有条款，否则您无权使用本服务。
        </p>
      </div>
      <div class="item">
        一、声明与承诺<br/><br/>
        <p>
          1、您确认，您在申请入驻民乐荟米铺之前，已充分阅读、理解并接受本协议的全部条款内容，一旦您使用本服务，即表示同意遵循本协议的全部条款内容。
        </p>
        <p>
          2、您同意，民乐荟有权对本协议内容进行变更，并以在民乐荟商城公告的方式予以公布，不再另行单独通知您；若您在本协议内容公告变更后继续使用本服务的，表示您已充分阅读、理解并接受修改后的协议内容，也将遵循修改后的协议内容以使用本服务；若您不同意修改后的协议内容，应停止使用本服务。
        <p>
          3、您声明，您在同意接受本协议，您是具有法律规定的完全民事权利能力和民事行为能力，能够独立承担民事责任的自然人、法人或其他组织；本协议内容不受您所属国家或地区的排斥。不具备前述条件的，你应立即终止注册或停止使用本服务。
        </p>
      </div>
      <div class="item">
        二、服务费用<br/><br/>
        <p>
          1、鉴于民乐荟平台为您提供了曝光、营销、推广等服务，向您提供该服务付出了成本，您通过民乐荟平台完成的交易订单中，我们将按照您开通米铺时所选择的服务费波比收取对应比例的服务费。
        </p>
        <p>
          2、您知悉，民乐荟平台有权根据业务规划及业务发展对上述收费及收费方式进行调整，届时您如继续使用本服务的将按照最新的收费费率及收费方式执行。
        </p>
      </div>
      <div class="item">
        三、交易争议解决<br/><br/>
        <p>
          您与消费者因交易产生纠纷，可以通过自主协商、向法院起诉等方式解决。
        </p>
      </div>
      <div class="item">
        四、信息发布与承诺<br/><br/>
        <p>
          1、【信息的发布】您声明并保证，您对您所上传的信息拥有相应合法的权利。否则，民乐荟可对您上传的信息依法或依本协议进行删除或屏蔽。
        </p>
        <p>
          2、【禁止性信息】您应当确保您所上传的信息不包含以下内容：
        </p>
        <p>
          （1）违反国家法律法规禁止性规定的；
        </p>
        <p>
          （2）政治宣传、封建迷信、淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；
        </p>
        <p>
          （3）欺诈、虚假、不准确或存在误导性的；
        </p>
        <p>
          （4）侵犯他人知识产权或涉及第三方商业秘密及其他专有权利的；
        </p>
        <p>
          （5）侮辱、诽谤、恐吓、涉及他人隐私等侵害他人合法权益的；
        </p>
        <p>
          （6）存在可能破坏、篡改、删除、影响民乐荟平台任何系统正常运行或未经授权秘密获取民乐荟平台及其他用户的数据、个人资料的病毒、木马、爬虫等恶意软件、程序代码的；
        </p>
        <p>
          （7）其他违背社会公共利益、公共道德、依据相民乐荟平台协议规则的规定不适合在民乐荟平台上发布的。
        </p>
      </div>
      <div class="item">
        五、赔偿责任<br/><br/>
        <p>
          如您的行为使民乐荟遭受损失（包括自身的直接经济损失、商誉损失及对外支付的赔偿金、和解款、律师费、诉讼费等间接经济损失），您应赔偿民乐荟及的上述全部损失。
        </p>
      </div>
    </div>
<!--    <div class="agree">
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
      padding: 1.8rem 28px 1.8rem 28px;
      background-color: #ffffff;

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
      height: 100px;
      background-color: rgba(255, 255, 255, .85);
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;

      div {
        color: #ffffff;
        background: linear-gradient(270deg,#ec1212,#ff5040);
        box-shadow: 0 0.106667rem 0.16rem 0 rgba(255, 85, 85, 0.3);
        border-radius: 25px;
        font-size: 19px;
        width: 186px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin: auto;
        position: relative;
        top: 25px;
        left: 0;
        right: 0;
      }
    }
  }
</style>
