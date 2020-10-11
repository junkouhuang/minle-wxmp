import Tops from "@/components/Top";
import Vue from 'vue'
Vue.filter('formatDate',function(value){
  var date = new Date(value);
  var Y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var H = date.getHours();
  var i = date.getMinutes();
  var s = date.getSeconds();
  if (m < 10) {
    m = '0' + m;
  }
  if (d < 10) {
    d = '0' + d;
  }
  if (H < 10) {
    H = '0' + H;
  }
  if (i < 10) {
    i = '0' + i;
  }
  if (s < 10) {
    s = '0' + s;
  }
  var t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s;
  return t;
})
export default {
  data() {
    return {
      SwipeImg: [],
      open:0,//0:等待审核  1:通过审核   2:审核失败  3:开通店铺（自定义）
      list:[],
      mipuList:[],
      loading:false,
      finished:false,
      pageNum:1,
      pageSize:6,
      pages:0,
      applyMipuName:'',
      longitude:'',//经度
      latitude:'',//维度
    }
  },
  methods: {
    /**
     * 回退
     */
    returns() {
      this.$router.go('-1');
    },
    /**
     * 首页banner
     * @param data
     */
    banner() {
      this.$http({
        method: 'post',
        url: '/minle/mall/banner/find',
        data: {
          position:5
        }
      })
        .then(res => {
          if (res.status == 200) {
            this.SwipeImg = res.data.data;
          }
        }).catch(e => {

      })
    },
    /**
     * 米铺列表
     */
    getList(){
      this.$http({
        method: 'post',
        url: '/minle/mall/mipu/showList',
        data:this.$qs.stringify({
          longitude:this.longitude,
          latitude:this.latitude,
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          name:this.applyMipuName
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          if(res.data.returnCode=="ERR_0000"){
            if(res.data.data.list.length>0){
             let dat = res.data.data.list;
             for(let i in dat){
               let arr = new Array();
               arr = dat[i].applyMipuPictures.split(',');
               dat[i].applyMipuPictures = arr;
               let tag = new Array();
               tag = dat[i].applyMipuTags.split(',');
               dat[i].applyMipuTags = tag;
               if (dat[i].distince) {
                 if(dat[i].distince<1){
                   dat[i].distince = dat[i].distince.toFixed(2)*1000+"m";
                 }else{
                   dat[i].distince = dat[i].distince.toFixed(1)+"km";
                 }
                }
             }
             this.pages = res.data.data.pages;

             this.mipuList = this.mipuList.concat(dat);
            }
          }
        }).catch(e => {
      })
    },
    /**
     * 米铺详情
     */
    info(item){
      this.$store.state.mipulist = item.applyMipuPictures;
      this.$router.push({'path': '/my/mipu_home/new/buyer/index', query: {'mipuNo': item.mipuNo}})
    },
    /**
     * 上拉加载更多
     */
    onLoad() {
      let that = this;
      // 异步更新数据
      setTimeout(() => {
        // 加载状态结束
        that.loading = false;
        // 数据全部加载完成
        that.pageNum = ++that.pageNum;
        if (that.pageNum > that.pages) {
          that.finished = true;
        } else {
          that.getList();
        }
      }, 2000);
    },
    /**
     * 搜索界面
     */
    history(){
      this.$router.push('/my/mipu_home/history')
    }
  },
  mounted() {
    //获取经纬度
    this.longitude = localStorage.getItem('longitude_latitude').split(",")[0];
    this.latitude = localStorage.getItem('longitude_latitude').split(",")[1];
    this.applyMipuName=localStorage.getItem('mipu_kw');
    this.getList();
    this.banner();

  },
  components: {
    Tops
  }
};
