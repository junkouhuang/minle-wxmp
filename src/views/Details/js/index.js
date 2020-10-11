import Tops from "@/components/Top";

var Base64 = require('js-base64').Base64;

export default {
  name: "detail",
  data() {
    return {
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
      alreadySelId:'',
      alreadyInventory:0,
      guige:'',
      skuGroups:[],
      selectedPropObj:[],
      fatherActive:'-1',
      childActive:'-1',
      mipuNo:'',//米铺编号
      extraData:[],
      selPrice:0,//选中价格
      selPicture:'',//选中图片
      selNum:1,//选中数量
      currentIndex:0,//当前规格选中的下标
      openmipu:false,
      type:'',
    }
  },
  methods: {
    /**
     * 获取规格
     */
    selGuige(item,index){
      for(let i in this.skuGroups){
        if(this.skuGroups[i]['flag']){
          this.skuGroups[i]['flag'] = false
        }
      }
      this.skuGroups[index]['flag']=true;
      this.selPrice = this.skuGroups[index]['price'];
      // this.showSpecPopup = false;
      this.currentIndex = index;
      this.alreadySel = this.skuGroups[index]["skuList"];
      this.alreadySelId = this.skuGroups[index]["id"];
      this.alreadyInventory = this.skuGroups[index]["inventory"];
      this.selPicture = this.skuGroups[index]["picture"] == null?this.selPicture : this.skuGroups[index]["picture"] ;
      this.selNum = this.skuGroups[index]["amount"];
    },

    /*findNextValue(i,ii,obj,level,attributeValue){
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

            console.log("====================")
            console.log(this.extraData.length )
            console.log(this.skuGroups.length )
            console.log(this.extraData.length == this.skuGroups.length)
            if(this.extraData.length == this.skuGroups.length){
              this.findInfo();
            }
            //已选规格
            //选中组合



        }).catch(e => {

      })
    },*/

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

    //去往购物车列表
    tocarHandle(){
      this.$router.push('/car?mipuNo='+this.mipuNo)
    },
    /**
     * 规格数量减少
     */
    sub1(){
      if (this.skuGroups.length > 0) {
        if (this.alreadySel == '') {
          this.$toast("请选择商品规格")
          return;
        }
        let amount = parseInt(this.skuGroups[this.currentIndex]['amount'])-1;
        if(amount>0){
          this.skuGroups[this.currentIndex]['amount'] = amount;
          this.selNum = amount;
        } else {
          this.selNum = 1;
          this.skuGroups[this.currentIndex]['amount'] = 1;
        }
      } else {
        // TODO
        if (this.selNum > 1) {
          this.selNum = this.selNum - 1;
        } else {
          this.selNum = 1;
        }

      }
    },
    getNum(){
      if(this.selNum>0 && this.selNum<=this.skuGroups[this.currentIndex]['inventory']){
        this.skuGroups[this.currentIndex]['amount'] = this.selNum;
      }else if(this.selNum<=0){
        this.skuGroups[this.currentIndex]['amount'] = 1;
      }else{
        this.$toast("已到最大库存~")
      }
    },
    /**
     * 规格数量增加
     */
    add1(){
      if (this.skuGroups.length > 0) {
        if (this.alreadySel == '') {
          this.$toast("请选择商品规格")
          return;
        }
        let amount = parseInt(this.skuGroups[this.currentIndex]['amount'])+1;
        if(amount<=parseInt(this.skuGroups[this.currentIndex]['inventory'])){
          this.selNum = amount;
          this.skuGroups[this.currentIndex]['amount'] = amount;
        }else{
          this.$toast("已到最大库存~")
        }
      } else {
        // TODO
        this.selNum = this.selNum + 1;
      }
    },
    specHandle(){
      this.getSpec();
      this.showSpecPopup = true;
    },
    /**
     * 获取商品规格
     */
    async getSpec(){
      if(this.skuGroups.length>0) return;
      const res = await this.$http({
        method: 'get',
        url: '/minle/mall/commodity/findSKU?commodityNo='+this.commodityNo
      })
      if (res.status == 200) {
        for(let i in  res.data.data){
          res.data.data[i]['flag']=false;
          res.data.data[i]['amount']=1;
        }
        this.skuGroups = res.data.data;
      }
    },
    //箭头回退
    back() {
      this.$router.go(-1)
    },
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
      let that =this;
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
            let data= res.data.data;
            let data2 = res.data.data;
            that.ProductDetail = data;
            if( this.$route.query.type==1){
              that.ProductDetail.originalPrice=data2.price;
              that.ProductDetail.price=this.ProductDetail.wholesalePrice;
            }
            this.selPrice = res.data.data.price;
            this.selPicture = res.data.data.titlePicture;
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
      if(this.skuGroups.length>0) {
        if (this.alreadySel=='') {
          this.$toast("请选择商品规格")
          this.showSpecPopup = true;
        } else {
          this.buyNow();
        }
      }else{
        this.buyNow();
      }
    },

    async buyNow() {
      let res = await this.$http({
        method: 'post',
        url: '/minle/mall/cart/settlement',
        data: {commodityNoList: [this.commodityNo],specificationId:this.alreadySelId,amount:this.selNum,orderType:this.$route.query.type==1?5:''}
      })
      if (res.status == 200) {
        if(res.data.data.length>0){
          for(let i in res.data.data){
            res.data.data[i].specifications =  this.alreadySel;
            res.data.data[i].specificationId =  this.alreadySelId;
          }
        }
        this.$router.push({
          path: '/orderconfirm',
          query: {
            orderconfirmdata: JSON.stringify( res.data.data),
            mipuNo: this.mipuNo,
            openmipu:this.openmipu
          }
        })
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
              this.$toast('取消收藏');
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

    //跳转购物车
    tocar() {
      this.$router.push({path:'car',query:{mipuNo:this.mipuNo,type:this.$route.query.type}})
    },

    //加入购物车
    addCar() {
      if(this.skuGroups.length>0) {
        if (this.alreadySel=='') {
          this.$toast("请选择商品规格")
          this.showSpecPopup = true;
        } else {
          this.joincar();
        }
      }else{
        this.joincar();
      }
    },
    async joincar() {
      let id =null;
      if(this.skuGroups.length>0){
        id = this.skuGroups[this.currentIndex]['id'];
      }
      let arr = {};
      if(this.$route.query.type==1) {
        arr = {
          commodityNo: this.commodityNo,
          mipuNo: this.mipuNo,
          specificationId: id,
          amount: this.selNum,
          type: 1
        }
      }else {
        arr = {
          commodityNo: this.commodityNo,
          mipuNo: this.mipuNo,
          specificationId: id,
          amount: this.selNum,
          type: 0
        }
      }
      let res = await this.$http({
        method: 'post',
        url: '/minle/mall/cart/add',
        data: arr,
      })
      if (res.status == 200) {
        if (res.data.returnMsg == "success") {
          /*this.$toast('该商品每人每单限购一次');*/
          this.$toast("加入购物车成功")
        }
        if (res.data.returnMsg == "fail") {
          this.$toast('已添加购物车');
        }
        this.carlist();
      }
    },

    //初始化徽标
    carlist() {
      let params = {};
      if(this.$route.query.type==1){
        params = {
          commodityType: 1,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        };
      }else {
        params = {
          commodityType: 0,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        };
      }
      this.$http({
        method: 'post',
        url: '/minle/mall/cart/display?mipuNo='+this.mipuNo,
        // data: {
        //
        // }
        data:this.$qs.stringify(params)
        , headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
        .then(res => {
          if (res.status == 200) {
            this.caramount = res.data.data.list.length;
            localStorage.setItem('caramount',res.data.data.list.length)
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
  },
  async created() {
    this.type = this.$route.query.type;
  },
  mounted() {
    this.mipuNo = this.$route.query.mipuNo;
    this.openmipu = this.$route.query.openmipu;
    this.type = this.$route.query.type;
    if(this.mipuNo == undefined){
      this.mipuNo = "";
    }
    this.commodityNo = this.$route.query.commodityNo;
    this.showSpecPopup = this.$route.query.showSpecPopup;
    this.caramount = localStorage.getItem('caramount');
    this.getDetailt();
    //登录账号可以创建足迹，收藏
    if(localStorage.getItem('token') != null && localStorage.getItem('token') != undefined ){
      this.createfootprint();
      this.iscollet();
    }
    this.getSpec();
    this.carlist();
  },
  components: {
    Tops
  }
}
