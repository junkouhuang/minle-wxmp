import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
import {caranimation} from '../js'
import eventBus from '@/common/js/evenbus'
import Tops from "@/components/Top";

Vue.use(VueLazyLoad, {
  loading: require('../images/loading.jpg')
})
export default {
  components: {
    Tops,
  },
  data() {
    return {
      pageNum: 1,
      pageNum2: 0,
      pageSize: 12,
      radio: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,//开始下拉刷新
      SwipeImg: [],//轮播图
      ProductList_you: [], //产品列表（优选区）
      loadFinsh: true, //列表数据加载完毕
      noimg: require('../images/noimg.png'),
      pages: 0, //精品总页数
      len: 0,
      length: 0,
      more: '',
      muti: false,
      editshow: false,
      mipuNo: '',
      keyword: '',
      navBarFixed: false,
      shopNumber: 0,
    }
  },
  methods: {
    //实现导航栏吸顶效果
    watchScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //  当滚动超过 366 时，实现吸顶效果
      if (scrollTop > 20) {
        this.navBarFixed = true
      } else {
        this.navBarFixed = false
      }
    },
    //搜索
    search() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.$http({
        method: 'post',
        url: '/minle/mall/dtc/search',
        data: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          keyword: this.keyword,
          commodityType: 1,

        }
      })
        .then(res => {
          this.$toast.clear();
          if (res.status == 200) {
            if (res.data.data.list.length > 0) {
              //this.ProductList_you = this.ProductList_you.concat(res.data.data.list);
              this.ProductList_you = res.data.data.list;
              this.total = res.data.data.total;
            } else {
              this.ProductList_you = [];
              this.total = 0;
            }

          }
        }).catch(e => {
      })
    },
    //购物车
    gocar(e, item) {
      this.getSpec(item.commodityNo);
    },
    /**
     * 获取商品规格
     */
    async getSpec(commodityNo) {
      const res = await this.$http({
        method: 'get',
        url: '/minle/mall/commodity/findSKU?commodityNo=' + commodityNo
      })
      if (res.status == 200) {
        if (res.data.data.length > 0) {
          this.$router.push({path: '/details', query: {commodityNo: commodityNo, showSpecPopup: true,type:1}})
        } else {
          this.addcar(commodityNo);
        }
      }
    },
    //加入购物车
    addcar(commodityNo) {
      this.$http({
        method: 'post',
        url: '/minle/mall/cart/add',
        data: {commodityNo: commodityNo, type: 1},
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnMsg == "success") {
              /*this.$toast('该商品每人每单限购一次');*/
              this.$toast("加入购物车成功")
              this.carlist();
            }
            if (res.data.returnMsg == "fail") {
              this.$toast('已加入购物车');
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
      const params = {
        commodityType: 1,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$http({
        method: 'post',
        url: '/minle/mall/cart/display',
        data: this.$qs.stringify(params)
        , headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
        .then(res => {
          if (res.status == 200) {
            //购物车徽章实时更新
            eventBus.$emit('len', {'caramount': res.data.data.length})
            //购物车徽章刷新时更新
            localStorage.setItem('caramount', res.data.data.length)
            this.shopNumber = res.data.data.list.length;
          }
        }).catch(e => {

      })
    },
    //去购物车
    async handleGoCard() {
      this.$router.push({
        path: "/car", query: {mipuNo: this.mipuNo, openmipu: this.mipuNo, type: 1}
      });
    },
    // 进入详情
    detail(item) {
      this.$router.push({path: '/details', query: {commodityNo: item.commodityNo,type:1}})
    },
    returns() {
      this.$router.go(-1)
    },
    // 点击编辑
    editHandle() {
      this.editshow = !this.editshow
    },
    delHandle() {
      let commodityNo = []
      this.ProductList_you.forEach((item, index) => {
        if (item.check) {
          commodityNo.push(item.commodityNo)
        }
      })
      if (commodityNo.length == 0) {
        this.$toast("请选择要删除的商品");
        return
      }
      let dataObj = {
        "mipuNo": this.mipuNo,
        "commodityNos": commodityNo,
      }
      this.$http({
        method: 'post',
        url: '/minle/mall/dtc/delete',
        data: dataObj
      })
        .then(res => {
          if (res.data.returnCode == "ERR_0000") {
            this.$toast("删除成功");
          }
          this.onRefresh();

        }).catch((e) => {
      })
    },
    //优选区1
    getList_you() {
      this.$http({
        method: 'post',
        url: '/minle/mall/dtc/search',
        data:{
          // "commodityTagId": 1, //优选
          // "type":1,
          "commodityType": 1,
          // "mipuNo": this.mipuNo,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }

      })
        .then(res => {
          if (res.status == 200) {
            this.ProductList_you = this.ProductList_you.concat(res.data.data.list);
            this.total = res.data.data.total;
          }
        }).catch(e => {

      })
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        /*this.$toast('刷新成功');*/
        this.isLoading = false;
        this.pageNum = 1;
        this.ProductList_you = [];
        this.getList_you();
      }, 500);
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
  },
  created() {
    this.mipuNo = this.$route.query.mipuNo;
    this.carlist();
    //获取列表数据
    this.getList_you();
  },
  mounted() {
    window.addEventListener('scroll', this.watchScroll);
  },
}
