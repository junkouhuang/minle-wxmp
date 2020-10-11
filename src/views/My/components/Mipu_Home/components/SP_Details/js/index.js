var Base64 = require('js-base64').Base64;
export default {
  name: "detail",
  data() {
    return {
      price:'', //选中规格的价钱
      value: 1,
      active: 0,//选项卡
      current: 0,
      banner: [],
      show: false,
      ProductDetail: [],
      routerurl: '/',
      commodityNo: '',
      caramount:0,
      iscollect:false,
      showImagePreview:false, //是否显示图片预览
      imagePreviewChangeIndex:1,//图片预览下标
      startPosition:0, //图片预览起始位置
      userId:'', //返回userId表示购买过该商品返回null表示没有购买过
      showSpecPopup:false ,//商品规格popup
      alreadySel:'',
      guige:'',
      skuGroups:[],
      selectedPropObj:[],
      fatherActive:'-1',
      childActive:'-1',
      mipuNo:'',
      extraData:[],
      selPrice:0,//选中价格
      selPicture:''
    }
  },
  methods: {
    sub1(){

    },
    add1(){},
    //轮播图预览切换
    bannerImgChange(index){
      this.startPosition = index;
    },
    //图片预览切换
    imagePreviewChange(index){
      this.imagePreviewChangeIndex = index+1;
    },
    //显示图片预览
    showImagePreviewHandle(){
      this.showImagePreview = true;
    },
    //创建足迹记录
    createfootprint(){
      let arr = {commodityNo: this.commodityNo}
      this.$http({
        method: 'post',
        url: '/minle/user/favorite/create',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: this.$qs.stringify(arr)
      })
        .then(res => {
          if (res.status == 200) {

          }
        }).catch(e => {
      })
    },
    //详情接口
    getDetailt(commodityNo) {
      let arr = {commodityNo: this.commodityNo}
      this.$http({
        method: 'post',
        url: '/minle/mall/commodity/preview',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: this.$qs.stringify(arr)
      })
        .then(res => {
          if (res.status == 200) {
            this.ProductDetail = res.data.data;
            this.selPrice = res.data.data.price;
            this.selPicture = res.data.data.bannerPicture;
            //字符串剪切为数组
            if (res.data.data.bannerPicture != '' && res.data.data.bannerPicture != null) {
              this.banner = res.data.data.bannerPicture.split(",");//banner轮播图
            } else {
              //没有轮播给几个默认加载图
              this.banner.length = 5
            }
          }
        }).catch(e => {
      })
    },
    //立即购买
    buynow() {
      let arr = new Array();
      arr.push(this.commoditySpecification)
      if(this.skuGroups!=null){
        if(this.skuGroups.length == this.extraData.length){
          this.$router.push({path:'/my/mipu_open/pay',query:{commodityNo:this.commodityNo,openmipu:true,commoditySpecification:arr,mipuNo:this.mipuNo,valueList:this.alreadySel}})
        }else{
          this.$toast("请选择商品规格")
        }
      }else{
        this.$router.push({path:'/my/mipu_open/pay',query:{commodityNo:this.commodityNo,openmipu:true,commoditySpecification:arr,mipuNo:this.mipuNo,valueList:this.alreadySel}})
      }

    },
    //收藏
    collect(){
      let arr = {commodityNo: this.commodityNo}
      this.$http({
        method: 'post',
        url: '/minle/user/commodity/store',
        data: this.$qs.stringify(arr),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
        .then(res => {
          if (res.status == 200) {
            if( !this.iscollect){
            this.$toast('收藏成功');
            this.iscollect = true;
            }else{
              this.iscollect = false;
            }
          }
        }).catch(e => {
        if (e.returnMsg == 'fail') {
          this.$toast('商品已添加到购物车');
        }
      })
    },
    //是否已收藏
    iscollet(){
      let arr = {commodityNo: this.commodityNo}
      this.$http({
        method: 'post',
        url: '/minle/user/commodity/validate',
        data: this.$qs.stringify(arr),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
        .then(res => {
          if (res.status == 200) {
            this.iscollect = res.data;
          }
        }).catch(e => {
        if (e.returnMsg == 'fail') {
          this.$toast('商品已添加到购物车');
        }
      })
    },
    //去往购物车列表
    tocarHandle(){
      this.$router.push('/mipucar?mipuNo='+this.mipuNo)
    },
    //加入购物车
    addCar() {
      if(this.skuGroups!=null){

        if(this.skuGroups.length == this.extraData.length){
          this.joincar();
        }else{
          this.$toast("请选择商品规格")
        }
      }else{
        this.joincar();
      }

    },

    joincar(){
      let arr = {
        commodityNo: this.commodityNo,
        specifications:this.alreadySel,
        mipuNo:this.mipuNo
      }
      this.$http({
        method: 'post',
        url: '/minle/mall/cart/add',
        data: arr,
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnMsg == "success") {
              /*this.$toast('该商品每人每单限购一次');*/
              this.$toast("加入购物车成功")
              this.carlist();
            }
            if (res.data.returnMsg == "fail") {
              this.$toast('该商品每人每单限购一次');
            }
          }
        }).catch(e => {

      })
    },
    //初始化徽标
    carlist() {
      this.$http({
        method: 'post',
        url: '/minle/mall/cart/display',

      })
        .then(res => {
          if (res.status == 200) {
            console.log("+=======")
            this.caramount = res.data.data.length;
            localStorage.setItem('caramount',res.data.data.length)
          }
        }).catch(e => {

      })
    },
    shareFun(){
      this.share();
    },
    //分享
    share(){
      let link = ''
      let title = '标题'
      this.$http({
        method: 'post',
        url: '/minle/mall/commodity/share',
        data: {

        }
      })
        .then(res => {
          if (res.status == 200) {
            this.userId = res.data.data;
            if(res.data.data==null){
              this.$toast("请先购买该商品，完成购买后即可分享");
            }else{
              //分享码scode
              // 会员推荐码code
              this.init(res.data.data.scode,res.data.data.code);
            // alert(res.data.data.code)
            }
          }
        }).catch(e => {

      })
    },
    //自定义分享模板
    init(scode,code){
      let url = location.href.split('#')[0]; //获取锚点之前的链接
      this.$http({
        method: 'get',
        url: '/common/wxmp/minle/share?url='+url,
      })
        .then(res => {
          if (res.status == 200) {
            this.$router.push({
              path:'/share',
              query:{
                commodityNo:this.commodityNo,
                scode:scode,
                code:code,
                appId:res.data.data.appId,
                timestamp:res.data.data.timestamp,
                nonceStr:res.data.data.nonceStr,
                signature:res.data.data.signature,
                isshow:0
              }
            })
          }
        }).catch(e => {

      })
    },
    specHandle(){
      this.getSpec();
      this.showSpecPopup = true;
    },
    /**
     * 获取可选规格
     */

    findNextValue(i,ii,obj,level,attributeValue){
    let that = this;
    this.fatherActive = i;
    this.childActive = ii;

    this.$http({
      method: 'get',
      url: '/minle/mall/commodity/findNextValue?id='+obj.id,
    })
      .then(res => {
        if (res.status == 200) {
          let arr = res.data.data;
          let index = i+1;
          if(index<that.skuGroups.length){
            for(let i in that.skuGroups[index].list){
                for(let j in arr){
                  if(arr[j].attributeValue ==that.skuGroups[index].list[i].attributeValue ){
                    that.skuGroups[index].list[i]['flag']=true;
                  }else{
                    that.skuGroups[index].list[i]['flag']=false;
                  }
                }
              }
          }
          for(let j in that.skuGroups[i].list) {
            if (j == ii) {
              that.skuGroups[i].list[j]['isActive'] = true;
            } else {
              that.skuGroups[i].list[j]['isActive'] = false;
            }
          }
          console.log(that.skuGroups)
          for(let i=i+1;i< that.skuGroups.length>0;i++) {
            for(let j =0; that.skuGroups[i+1].list;j++){
              that.skuGroups[i+1].list[j]['isActive'] = false;
            }
          }

          if(i>=that.extraData.length){
            that.extraData.push(attributeValue)
          }else{
            that.extraData.splice(i,1,attributeValue);
          }
          this.guige = this.extraData;
          this.alreadySel = this.extraData.toString();

          this.commoditySpecification = {"commodityNo": this.commodityNo,"specification": this.alreadySel,"amount": 1}}
          //获取价格

          if(this.extraData.length == this.skuGroups.length){
            this.findInfo();
          }
          //已选规格
          //选中组合



      }).catch(e => {

    })
  },

    //获取价格
  findInfo(){
    this.$http({
      method: 'get',
      url: '/minle/mall/commodity/findInfo?valueList='+this.alreadySel+"&commodityNo="+this.commodityNo,
    })
      .then(res => {
        console.log(res)
        this.selPrice = res.data.data.price;
      }).catch(e => {

    })
  },
    /**
     * 获取商品规格
     */
    getSpec(){
      this.$http({
        method: 'get',
        url: '/minle/mall/commodity/findAttribute?commodityNo='+this.commodityNo
      })
        .then(res => {
          if (res.status == 200) {
            let arr = res.data.data;
            for(let i in arr){
              for(let j in arr[i].list){
                arr[i].list[j]['flag']=true;
                arr[i].list[j]['isActive']=false;
              }
            }
            this.skuGroups = res.data.data;

          }
        }).catch(e => {

      })
    },


    selHandle(){

    }



  },
  mounted() {
    this.commodityNo = this.$route.query.commodityNo;
    this.mipuNo = this.$route.query.mipuNo;
    this.caramount = localStorage.getItem('caramount');
    this.getDetailt();
    //登录账号可以创建足迹，收藏
    if(localStorage.getItem('token') != null && localStorage.getItem('token') != undefined ){
      this.createfootprint();
      this.iscollet();
    }
  },
}





