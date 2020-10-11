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
      muti:false,
      editshow: false,
      mipuNo: '',
    }
  },
  methods: {
    // 进入详情
    detail(item) {
      this.$router.push({path: '/details', query: {commodityNo: item.commodityNo}})
    },
    returns () {
      this.$router.go(-1)
    },
    // 点击编辑
    editHandle () {
      this.editshow = !this.editshow
    },
    delHandle () {
      let commodityNo = []
      this.ProductList_you.forEach((item,index)=> {
        if(item.check) {
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

        }).catch((e)=> {})
    },
    //优选区1
    getList_you() {
      this.$http({
        method: 'post',
        url: '/minle/mall/dtc/display',
        data: {
          "commodityTagId": 1, //优选
          "type":1,
          "mipuNo": this.mipuNo,
          "pageNum": this.pageNum,
          "pageSize": this.pageSize,
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
    //获取列表数据
    this.getList_you();
  },
  mounted() {
    
  },
}
