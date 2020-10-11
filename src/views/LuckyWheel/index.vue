<template>
  <div class="container">
    <div class="lucky-wheel">
      <div class="lucky-title">
        <img src="./images/ok.png"/>
        <p class="p1">恭喜你，支付成功</p>
        <p class="p2">支付成功，可以获得抽奖机会哦！</p>
      </div>
      <div class="wheel-main">
        <div class="wheel-pointer" @click="beginRotate()"></div>
        <div class="wheel-bg" :style="rotateStyle">
          <div class="prize-list">
            <div
              class="prize-item"
              v-for="(item,index) in prizeList"
              :key="index"
              :style="item.style"
            >
              <div class="prize-pic">
                <img :src="item.prizeUrl"/>
              </div>
              <div class="prize-type">{{item.prizeName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="tip">
        <div class="tip-title">奖品说明</div>
        <div class="tip-content">
          <p class="p1">一等奖<span>2000元，</span>二等奖<span>1000元</span>三等奖<span>500元</span>四等奖<span>200元</span>五等奖<span>100元。</span></p>
          <p class="p2">中奖金额将会直接存入您的钱包，您可以通过会员中心-我的钱包查看奖品金额。</p>
        </div>
      </div>
    </div>
    <div class="toast" v-show="prize">
      <img src="./images/close.png" @click="closeToast()">
      <div class="toast-container">
        <!--<img :src="toastIcon" class="toast-picture" />-->
        <!--<div class="close" @click="closeToast()"></div>-->
        <div class="title">{{index!=5?'恭喜您':'很遗憾'}}</div>
        <div class="toast-title">
          {{toastTitle}}
        </div>
        <div class="toast-btn" v-if="index!=5">
          <div class="toast-cancel" @click="to">立即查看</div>
        </div>
      </div>
    </div>
    <div class="toast-mask" v-show="prize"></div>
  </div>
</template>

<!--<script>
  export {default} from './js/index'
</script>-->

<style lang="less" scoped>
  @import './less/index';
</style>
<script>
  const CIRCLE_ANGLE = 360

  const config = {
    // 总旋转时间
    duration: 4000,
    // 旋转圈数
    circle: 8,
    mode: 'ease-in-out'
  }

  export default {
    data() {
      return {
        count: 1, // 剩余抽奖次数
        duration: 3000, // 转盘旋转时间
        prizeList: [], // 奖品列表
        rotateAngle: 0, // 旋转角度
        index: 0,
        prize: null,
        orderNo:''
      };
    },
    created() {
      // 初始化一些值
      this.angleList = []
      // 是否正在旋转
      this.isRotating = false
      // 基本配置
      this.config = config
      // 获取奖品列表
      this.initPrizeList();
      this.orderNo = this.$route.query.orderNo;
      this.getIndex();
    },
    computed: {
      rotateStyle () {
        return `
        -webkit-transition: transform ${this.config.duration}ms ${this.config.mode};
        transition: transform ${this.config.duration}ms ${this.config.mode};
        -webkit-transform: rotate(${this.rotateAngle}deg);
            transform: rotate(${this.rotateAngle}deg);`
      },
      toastTitle () {
      /*  return this.prize && this.prize.isPrize === 1 && this.index!=5
          ? "恭喜您，获得" +
          this.prize.name
          : "未中奖";*/

        if(this.prize && this.prize.isPrize === 1 && this.index!=5){
          if(this.index == 0) {
            return "获得了2000元大奖去钱包查看吧!";
          }else if(this.index == 1){
            return "获得了1000元大奖去钱包查看吧!";
          }else if(this.index == 2){
            return "获得了500元大奖去钱包查看吧!";
          }else if(this.index == 3){
            return "获得了200元大奖去钱包查看吧!";
          }else if(this.index == 4){
            return "获得了100元大奖去钱包查看吧!";
          }else{}
        }else{
          return "未中奖"
        }
      },
      toastIcon() {
        return this.prize && this.prize.isPrize === 1
          ? require("../../assets/img/congratulation.png")
          : require("../../assets/img/sorry.png");
      }
    },
    methods: {
      initPrizeList() {
        // 这里可以发起请求，从服务端获取奖品列表
        // 这里使用模拟数据
        this.$http({
          method: 'post',
          url: '/minle/mall/lottery/display',
          data: {

            "pageNum": this.pageNum,
            "pageSize": this.pageSize,
          }
        })
          .then(res => {
            if (res.status == 200) {
              res.data.data.list.push({prizeName:'再接再励'})
              this.prizeList = this.formatPrizeList( res.data.data.list);

            }
          }).catch(e => {
        })
      },
      // 格式化奖品列表，计算每个奖品的位置
      formatPrizeList (list) {
        // 记录每个奖的位置
        const angleList = []

        const l = list.length
        // 计算单个奖项所占的角度
        const average = CIRCLE_ANGLE / l

        const half = average

        // 循环计算给每个奖项添加style属性
        list.forEach((item, i) => {

          // 每个奖项旋转的位置为 当前 i * 平均值 + 平均值 / 2
          const angle = -((i * average) + half)
          // 增加 style
          item.style = `-webkit-transform: rotate(${angle}deg);
                      transform: rotate(${angle}deg);`

          // 记录每个奖项的角度范围
          angleList.push((i * average) + half )
        })

        this.angleList = angleList

        return list
      },
      beginRotate() {
        // 添加次数校验

        if(this.count === 0) return;

        // 开始抽奖
        // 这里这里向服务端发起请求，得到要获得的奖
        // 可以返回下标，也可以返回奖品 id，通过查询 奖品列表，最终得到下标

        // 随机获取下标
       // this.getIndex();
        //this.index = this.random(this.prizeList.length - 1);

        console.log(this.index)
        console.log("=====")

        // 减少剩余抽奖次数
        this.count--

        // 开始旋转
        this.rotating()
      },
      random (max, min = 0) {
        return parseInt(Math.random() * (max - min + 1) + min)
      },
      rotating() {
        const { isRotating, angleList, config, rotateAngle, index } = this

        if (isRotating) return

        this.isRotating = true

        // 计算角度
        const angle =
          // 初始角度
          rotateAngle +
          // 多旋转的圈数
          config.circle * CIRCLE_ANGLE +
          // 奖项的角度
          angleList[index] -
          (rotateAngle % CIRCLE_ANGLE)


        this.rotateAngle = angle

        // 旋转结束后，允许再次触发
        setTimeout(() => {

          this.rotateOver()
        }, config.duration + 1000)
      },
      rotateOver () {
        this.isRotating = false

        this.prize = prizeList[this.index]

        console.log(this.prize, this.index)
      },
      //关闭弹窗
      closeToast() {
        this.$router.push('/home')
      },
      to(){
        this.$router.push('/prizelist')
      },

      getIndex() {
        this.$http({
          method: 'post',
          url: '/minle/mall/lottery/prize',
          data: this.$qs.stringify({
            orderNo: this.orderNo
          }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
          .then(res => {
            if (res.status == "200") {
              this.index = res.data.data == null?5 :res.data.data.prizeLevel-1
              console.log(this.index)
              console.log("=======**========")
            }
          }).catch(e => {
        })
      },
    }
  };
</script>


