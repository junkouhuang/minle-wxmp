import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  loading: require('../../../common/images/loading.jpg')
})
export default {
  name: "index",
  data() {
    return {
      pageNum:1,
      pageSize:15,
      pages:0,
      keywords: '',
      activeKey: 0,
      list: [],
      ProductList: [],
      loading: false,
      finished: false,
      active: false,
      id:'',
      nomore:'没有更多了',
      noData: '',
      noDataImg:''
    }
  },
  computed: {
    ProductLists(){
     return this.ProductList.filter((item)=>{
        return item.titlePicture!=''
      })
    }
  },
  methods: {
    //下拉加載更多
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.pageNum >= this.pages) {
          this.finished = true;
        } else {
          this.pageNum = this.pageNum + 1;
          this.fl2();
        }
      }, 3000);
    },
    //进入历史搜索
    toHistory(){
      this.$router.push('/history')
      this.$store.state.serachReturnUrl = '/classify';
    },
    //一级分类列表
    async classify1() {
     await this.$http({
        method: 'post',
        url: '/minle/commoditytype/classify',
        data:{
          "typeName":this.keywords,
          "typeLevel":1,
        },
      })
        .then(res => {
          if (res.status == 200) {
            this.list = res.data.data;
            this.check();
            if (this.active) {
              this.classify2(this.$route.query.id);
            } else {
              this.classify2(res.data.data[0].id)
            }
          }
        }).catch(e => {

      })
    },
    async check(){
      if(this.$route.query.id != undefined && this.$route.query.id != null && this.$route.query.id != ""){
        let index = this.list.findIndex(item => item.id == this.$route.query.id);
        this.activeKey = index;    //10 * this.$route.query.pageNum +(this.$route.query.index+1);
        this.active = true;        
      } else {
        this.active = false;
      }
    },
    //二级分类列表（根据commodityTypeId）
    classify2(id) {
      this.id = id;
      this.ProductList=[];
      this.pageNum=1;
      this.fl2();
    },
    fl2(){
      let that = this;
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      let arr = {
        parentTypeId: that.id,
        typeLevel: 2,
       /* pageNum:this.pageNum,
        pageSize:this.pageSize*/
      }
      this.$http({
        method: 'post',
        url: '/minle/commoditytype/classify',
        data: arr
      })
        .then(res => {
          this.$toast.clear();
          if (res.status == 200) {
            this.noData = res.data.data.length==0?'暂无数据':''
            this.ProductList = this.ProductList.concat(res.data.data);
            //this.pages = res.data.data.pages;
          }
        }).catch(e => {

      })
    },
    //去往搜索界面
    search(name) {
      let keyword = localStorage.getItem('keyword');
      let history = "";
      if (keyword != null) {
        history = keyword;
      }
      let arr = history.split(",")
      for(let a of arr){
        //当前关键字不存在与历史记录，存在先删除
        if(a === this.word){
          let index = arr.indexOf(this.word);
          arr.splice(index,1)
        }
      }
      if (arr.length > 0) {
        history = name + ',' + arr
      } else {
        history = name
      }      
      localStorage.setItem('keyword',history)

      this.$router.push({path: '/search', query: {'keyword': name}})
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    this.classify1();
    this.check();
  },
  beforeDestroy(){
    this.$store.state.loadByHistoryWord = true;
    this.$store.state.serachReturnUrl = '/classify';
  }
}
