import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
import {caranimation} from "../../js";
import eventBus from '@/common/js/evenbus'

Vue.use(VueLazyLoad, {
  loading: require('../../../common/images/loading.jpg')
})

export default {
  name: "index",
  data() {
    return {
      pageNum: 1,
      pageSize:10,
      loading: false,
      finished: false,
      isLoading: false,//开始下拉刷新
      navBarFixed: false,
      ispx:'-1', //2是销量升序排序，2是销量降序排序
      isSort: '-1',
      sort: '',//0是价格降序1是价格升序
      active:'',
      SearchList: [],
      taglist:[], //标签列表
      swit: false,
      value1: 0,
      option1: [
        {text: '筛选', value: 0},
        {text: '新款商品', value: 1},
        {text: '活动商品', value: 2}
      ],
      show:true,
      showSx:false,
      hotgoodlist:[],
      hotindex:'-1',//筛选，0为牙膏，1为面膜
      keyword:'',//搜索关键字
      classifyList:[],
      active1:'-1',
      type:'',
      noimg: require('../images/noimg.png'),
      commodityTypeId:''
    }
  },
  methods: {
    //返回箭头
    back(){
      this.$router.push(this.$store.getters.getSerachReturnUrl)
    },
    //实现导航栏吸顶效果
    watchScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //  当滚动超过 50 时，实现吸顶效果
      if (scrollTop > 49) {
        this.navBarFixed = true
      } else {
        this.navBarFixed = false
      }
    },
    //按标签查找
    labelSearch(id,index){
      debugger
      this.commodityTypeId = id;
      console.log(this.commodityTypeId )
      this.hotindex = index;
      this.sort = "";
      this.showSx = false;
      this.SearchList = [];
      this.search();
    },
    //选择分类
    choose(id,index){
      this.type = id;
      this.active1 = index;
      this.index = index;
      this.sort = "";
      this.showSx = false;
      this.SearchList = [];
      this.search();
    },
    //导航点击事件
    handleBar(index){
      debugger
      if(index === 2) {
        this.ispx = !this.ispx;
        this.isSort = "-1";
        this.sort = this.ispx?2:3;
        this.active = index;
        this.showSx = false;
        this.hotindex = "";
        //this.commodityTypeId = ''
      }else if(index === 3) {
        this.ispx = "-1";
        this.isSort = !this.isSort;
        this.sort = this.isSort?0:1;
        this.active = ""
        this.showSx = false;
        this.hotindex = "";
        this.type = "";
        //this.commodityTypeId = ''
      } else if(index == 4){
        this.ispx = "-1";
        this.isSort = "-1";
        this.sort = "";
        this.active = index
        this.showSx = !this.showSx;
        this.handleFL();
      }else{
        this.ispx = "-1";
        this.isSort = "-1";
        this.sort = "";
        this.active = index
        this.showSx = false;
        this.hotindex = "";
        this.keyword= ""
        this.name= ""
        this.commodityTypeId = ''
        this.type = "";
      }
      console.log(this.commodityTypeId)
      this.SearchList=[];
      this.search();
    },
    //分类列表
    handleFL(index) {
      this.$http({
        method: 'post',
        url: this.$url.classify,
        data:{
          "pageNum":"",
          "pageSize":"",
          "typeName":'',
          "typeStatus":1,
        },
      })
        .then(res => {
          if (res.status == 200) {
            this.classifyList =res.data.data.list;

          }
        }).catch(e => {

      })
    },
    //进入详情
    detail(item) {
      this.$router.push({path: '/details', query: {commodityNo: item.commodityNo}})
    },
    //列表切换
    switchs() {
      this.swit = !this.swit;
      this.showSx = false;
    },
    //加载更多
    onLoad() {
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.SearchList.length >= this.total) {
          this.finished = true;
        } else {
          this.pageNum = this.pageNum + 1;
          this.search();
        }
      }, 500);
    },
    //搜索列表
    search() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.$http({
        method: 'post',
        url: this.$url.search,
        data: {
          commodityTypeId:this.type ,
          commodityTagId:this.commodityTypeId,
          hotCommodity: '',
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          status: '',
          keyword:this.keyword,
          sort:this.sort,
        }
      })
        .then(res => {
          this.$toast.clear();
          if (res.status == 200) {
           /* for (let i of res.data.data.list) {
              let reg = /\.\w+$/, reg1 = /.+\./;
              let b = i.titlePicture.replace(reg1).replace('undefined', '')
              let a = i.titlePicture.replace(reg).replace('undefined', '') + '_m.' + b
              i.titlePicture = a
            }*/
            if(res.data.data.list.length>0){
              this.SearchList = this.SearchList.concat(res.data.data.list);
              this.total = res.data.data.total;
            }else{
              this.SearchList =[];
              this.total = 0;
            }

          }
        }).catch(e => {
      })
    },
    //模糊查询
    goSearch() {
      this.search();
    },
    //获取标签
    tag(){
      this.$http({
        method: 'post',
        url: this.$url.tag,
        data: { }
      })
        .then(res => {
          if (res.status == 200) {
            this.hotgoodlist = res.data.data.list;
          }
        }).catch(e => {
      })
    },
    //购物车
    gocar(e, item) {
      let w = screen.width//分辨率宽
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
      //caranimation(items, obj)
      this.addcar(item.commodityNo);
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
  },
  mounted() {
    //this.num = this.$route.query.num;
    // 事件监听滚动条
    window.addEventListener('scroll', this.watchScroll);
    /*if(this.$store.getters.getLoadByHistoryWord){
      this.keyword = localStorage.getItem('keyword').split(",")[0]
    }*/
    this.keyword = this.$route.query.keyword;
    this.search();
    this.tag();

  }
}
