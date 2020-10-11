import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
import {caranimation} from '../../js'
import eventBus from '@/common/js/evenbus'

Vue.use(VueLazyLoad, {
  loading: require('../../../common/images/loading.jpg')
})
export default {
  name: "index",
  data() {
    return {
      pageNum: 1,
      pageNum2: 0,
      pageSize: 12,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,//开始下拉刷新
      SwipeImg: [],//轮播图
      ProductList_bao: [], //产品列表（爆品区）
      ProductList_pai: [], //产品列表（派送区）
      ProductList_jingpin: [], //产品列表(精品区)
      ProductList_you: [], //产品列表（优选区）
      TetList_boutique: [],
      loadFinsh: true, //列表数据加载完毕
      noimg: require('../images/noimg.png'),
      pages: 0, //精品总页数
      classify: [],
      len: 0,
      length: 0,
      classifyList: [],
      more: '',
      baoSeeMore: false,
      paiSeeMore: false,
      jingpinSeeMore:false,
      muti:false,
      advList:[]
    }
  },
  methods: {
    seeMore(type) {
      this.more = type;
      if(type=='bao'){
        this.baoSeeMore = false;
      }
      if(type=='pai'){
        this.paiSeeMore = false;
      }
      if(type=='jingpin'){
        this.jingpinSeeMore = false;
      }
    },
    go(href) {
      window.location.href = href;
    },
    //进入历史搜索
    toHistory() {
      this.$router.push('/history')
      this.$store.state.serachReturnUrl = '/home';
    },
    //获取轮播图
    banner() {
      this.$http({
        method: 'post',
        url: '/minle/mall/banner/find',
        data: {position:3} //京东position:2  淘宝position:3  天猫position:4
      })
        .then(res => {
          if (res.status == 200) {
            this.SwipeImg = res.data.data;

          }
        }).catch(e => {

      })
    },
    //获取广告
    adv() {
      this.$http({
        method: 'post',
        url: '/minle/mall/banner/find',
        data: {position:7}
      })
        .then(res => {
          if (res.status == 200) {
            this.advList = res.data.data;
          }
        }).catch(e => {

      })
    },
    //购物车
    gocar(e, item) {
      /*let w = screen.width//分辨率宽
      let x = e.x
      if (w - e.x < 100) {
        x = x - 50
      }
      let obj = {
        start: {
          top: e.y - 40,
          left: x - 20
        },
        end: {
          top: screen.height - 100,
          left: screen.width - 150
        }
      }, items = {
        src: item.titlePicture,
        width: 85,
        height: 85
      }
      caranimation(items, obj)*/
      //this.addcar(item.commodityNo);
      this.getSpec(item.commodityNo);
    },
    /**
     * 获取商品规格
     */
    async getSpec(commodityNo){
      const res =await  this.$http({
        method: 'get',
        url: '/minle/mall/commodity/findSKU?commodityNo='+commodityNo
      })
      if (res.status == 200) {
        if( res.data.data.length>0){
          this.$router.push({path: '/details', query: {commodityNo: commodityNo, showSpecPopup: true}})
        }else{
          this.addcar(commodityNo);
        }
      }
    },
    // 进入详情
    detail(item) {
      this.$router.push({path: '/details', query: {commodityNo: item.commodityNo}})
    },
    //分类
    service() {
      this.$http({
        method: 'post',
        url: '/minle/mall/commodity/service',
        data: {}
      })
        .then(res => {
          if (res.data.returnCode == "ERR_0000") {
            if (res.data.data.length % 10 == 0) {
              this.length = res.data.data.length / 10
            } else {
              this.length = parseInt(res.data.data.length / 10) + 1;
            }
            this.classify = res.data.data;
            this.onChange(0)
          }
        })
    },
    //mall/commodity/service
    //爆品区4
    getList_bao() {
      this.$http({
        method: 'post',
        url: this.$url.home,
        data: {
          "commodityTagId": 4,//1优选，2精品,3派送，4爆品
          "pageNum": this.pageNum,
          "pageSize": 200,
        }
      })
        .then(res => {
          if (res.status == 200) {
            //  缩略图
            /*for (let i of res.data.data.list) {
              let reg = /\.\w+$/, reg1 = /.+\./;
              let b = i.titlePicture.replace(reg1).replace('undefined', '')
              let a = i.titlePicture.replace(reg).replace('undefined', '') + '_m.' + b
              i.titlePicture = a
            }*/
            if(res.data.data.list.length>9){
              this.baoSeeMore = true;
            }
            if(res.data.data.list.length>1){
              this.muti = true;
            }
            this.ProductList_bao = res.data.data.list;
          }
        }).catch(e => {
      })
    },
    //派送区3
    getList_pai() {
      this.$http({
        method: 'post',
        url: this.$url.home,
        data: {
          "commodityTagId": 3, //1.优选，2精品,3派送，4爆品
          "pageNum": this.pageNum,
          "pageSize": 200,
        }
      })
        .then(res => {
          if (res.status == 200) {
            //  缩略图
            for (let i of res.data.data.list) {
              let reg = /\.\w+$/, reg1 = /.+\./;
              let b = i.titlePicture.replace(reg1).replace('undefined', '')
              let a = i.titlePicture.replace(reg).replace('undefined', '') + '_m.' + b
              i.titlePicture = a
            }
            if(res.data.data.list.length>9){
              this.paiSeeMore = true;
            }
            this.ProductList_pai = res.data.data.list;
          }
        }).catch(e => {
      })
    },
    //精品2
    getList_boutique() {
      this.$http({
        method: 'post',
        url: this.$url.home,
        data: {
          "commodityTagId": 2, //优选，2精品,3派送，4爆品
          "pageNum": this.pageNum,
          "pageSize": 200,
        }
      })
        .then(res => {
          if (res.status == 200) {
            //  缩略图
           /* for (let i of res.data.data.list) {
              let reg = /\.\w+$/, reg1 = /.+\./;
              let b = i.titlePicture.replace(reg1).replace('undefined', '')
              let a = i.titlePicture.replace(reg).replace('undefined', '') + '_m.' + b
              i.titlePicture = a
            }*/
            if(res.data.data.list.length>6){
              this.jingpinSeeMore = true;
            }
            this.ProductList_jingpin = res.data.data.list;
            this.total = res.data.data.total;
          }
        }).catch(e => {

      })
    },
    //优选区1
    getList_you() {
      this.$http({
        method: 'post',
        url: this.$url.home,
        data: {
          "commodityTagId": 1, //优选，2精品,3派送，4爆品
          "pageNum": this.pageNum,
          "pageSize": this.pageSize,
          source:6, //source京东2  source淘宝6 source天猫7
          hotCommodity:1 //hotCommodity京东1  hotCommodity淘宝1 hotCommodity天猫1

        }
      })
        .then(res => {
          if (res.status == 200) {
            //  缩略图
            // for (let i of res.data.data.list) {
            //   let reg = /\.\w+$/, reg1 = /.+\./;
            //   let b = i.titlePicture.replace(reg1).replace('undefined', '')
            //   let a = i.titlePicture.replace(reg).replace('undefined', '') + '_m.' + b
            //   i.titlePicture = a
            // }
            this.ProductList_you = this.ProductList_you.concat(res.data.data.list);
            this.total = res.data.data.total;
          }
        }).catch(e => {
          console.log(e)
        console.log("===")
      })
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        /*this.$toast('刷新成功');*/
        this.isLoading = false;
        this.pageNum = 1;
        this.ProductList = [];
        this.getList();
      }, 500);
    },
    //加入购物车
    addcar(commodityNo) {
      this.$http({
        method: 'post',
        url: '/minle/mall/cart/add',
        data: {commodityNo: commodityNo},
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
        if (e.returnMsg == 'fail') {
          /*this.$toast('商品已添加到购物车');*/
        }
      })
    },
    //获取购物车已有数量
    carlist() {
      this.$http({
        method: 'post',
        url: '/minle/mall/cart/display',
        data: {}
      })
        .then(res => {
          if (res.status == 200) {
            //购物车徽章实时更新
            eventBus.$emit('len', {'caramount': res.data.data.length})
            //购物车徽章刷新时更新
            localStorage.setItem('caramount', res.data.data.length)
          }
        }).catch(e => {

      })
    },
    //下拉加載更多
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.ProductList_you.length >= this.total) {
          this.finished = true;
        } else {
          this.pageNum = this.pageNum + 1;
          this.getList_you();
        }
      }, 2000);
    },
    //获取分类
     getClassify() {
       this.$http({
         method: 'post',
         url: '/minle/commoditytype/thirdDisplay',
         data: {
           pageNum:1,
           pageSize:100,
           source:6
         } //京东source2  淘宝source6 天猫source7
       })
         .then(res => {
           if (res.status == 200) {
             if (res.data.data.list.length % 10 == 0) {
               this.len = res.data.data.list.length / 10
             } else {
               this.len = parseInt(res.data.data.list.length / 10) + 1;
             }
             this.classify = res.data.data.list;
             this.onChange(0)
           }
         }).catch(e => {

       })
     },
    //分类切换
    onChange(index) {
      this.pageNum2 = index;
      this.classifyList = this.classify.slice(index * 10, (index * 10) + 10);
    },
    ///mall/page/redirect
    redirect(){
      this.$http({
        method: 'get',
        url: '/minle/mall/page/redirect',
        data: {}
      })
        .then(res => {
          if (res.status == 200) {
            window.location.href=res.data.data;
          }
        }).catch(e => {

      })
    }
  },
  created() {
    //获取列表数据
    this.getList_you();
    //获取分类
    this.getClassify();
    this.banner();
    this.adv();

  },
  beforeDestroy() {
    this.$store.state.loadByHistoryWord = false;
  }
}
