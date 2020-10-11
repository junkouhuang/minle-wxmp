import Tops from "@/components/Top";

export default {
  name: "detail",
  data() {
    return {
      pageNum:1,
      pageSize:10,
      state:true,
      arr:[],
      loading:false,
      finished:false,
      total:0,
      indexarr:[],
      checked:false,
      active:1,
      immediate_check:false,
      show:0
    }
  },
  components: {
    Tops
  },
  methods: {
    //箭头回退
    returns(){
      this.$router.go(-1)
    },
    //收藏列表
    colletlist(){
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.$http({
        method: 'post',
        url: '/minle/user/commodity/display',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: this.$qs.stringify({pageNum: this.pageNum,pageSize:this.pageSize})
      })
        .then(res => {
          this.$toast.clear();
          for (let index of  res.data.data.list) {
            index.check = false;
          }
          if(res.data.data.pages>0){
            this.show = 1
            this.arr = this.arr.concat(res.data.data.list);
            this.total = res.data.data.total;
          }else{
            this.show = 2
          }
        }).catch(e => {
      })
    },
    //米铺收藏列表
    mipu_colletList(){
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.$http({
        method: 'post',
        url: '/minle/user/commodity/display ',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: this.$qs.stringify({pageNum: this.pageNum,pageSize:this.pageSize,storeType:1,longitude:'113.8170770000',latitude:'22.7178440000'})
      })
        .then(res => {
          this.$toast.clear();
          if (res.status == 200) {
            if(res.data.data.pages>0){
              this.show = 1
              //this.arr = this.arr.concat(res.data.data.list);
              this.total = res.data.data.total;
              let dat = res.data.data.list;
              for(let i in dat){
                let tag = new Array();
                tag = dat[i].mipuTags.split(',');
                dat[i].mipuTags = tag;
                /*
                if(dat[i].distince<1){
                  dat[i].distince = dat[i].distince.toFixed(2)*1000+"米";
                }else{
                  dat[i].distince = dat[i].distince.toFixed(2)+"公里";
                }*/
              }
              this.arr = this.arr.concat(res.data.data.list);
              this.total = res.data.data.total;
            }else{
              this.show = 2
            }
          }
        }).catch(e => {
      })
    },
    /**
     * 米铺详情
     */
    detail(mipuNo){
      this.$router.push({'path': '/my/mipu_home/info', query: {'mipuNo': mipuNo}})
    },
    //下拉加載更多
    onLoad(){
      setTimeout(() => {

        // 加载状态结束
        this.loading = false;
        console.log(this.arr.length)
        console.log(this.total)
        // 数据全部加载完成
        if (this.arr.length >= this.total) {
          this.finished = true;
        }else{
          this.pageNum += this.pageNum;
          this.colletlist();
        }
      }, 500);
    },
    //刪除
    del(){
      if(this.indexarr.length<=0){
        this.$toast("请选择要删除的商品");
        return false;
      }
      this.$http({
        method: 'post',
        url: '/minle/user/commodity/deleteBatch',
        data: this.indexarr
      })
        .then(res => {
          if (res.status == 200) {
            this.$toast('删除成功')
            for(let num of this.indexarr) {
              this.arr.splice(this.arr.findIndex(item => item.id == num), 1)
            }
          }
        }).catch(e => {
      })
    },
    //单选
    singlecheck(index) {
      this.arr[index].check = !this.arr[index].check;//取反

      let flag = this.arr.some(function(arr){
        return !arr.check;
      })
      if (flag) {
        this.checked = false;
      } else {
        this.checked = true;
      }
      this.indexarr = [];
      this.chooseid();
    },
    //全选
    checkAll(){
      this.checked = !this.checked;
      if(this.checked){
        for(let index in this.arr) {
          this.arr[index]['check'] = true;
        }
        this.indexarr = [];
        this.chooseid();
      }else{
        for(let index in this.arr) {
          this.arr[index]['check'] = false;
        }
        this.indexarr = [];
      }


    },
    //获取选中记录
    chooseid(){
      for(let i in this.arr){
        if(this.arr[i].check){
          this.indexarr.push(this.arr[i].id)
        }
      }
      console.log(this.indexarr)
    },
    //去往详情
    toDetail(item){
      let arr = {commodityNo: item.commodityNo}
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
            if(res.data.data.status == 0) {
              this.$toast("该商品已下架")
            }else{
              this.$router.push({path: '/details', query: {commodityNo: item.commodityNo}})
            }
          }
        }).catch(e => {
      })
    },
    /**
     * tab切换
     */
    change(e){
      this.arr = [];
      this.pageNum =1;
      if(e==1){
        this.colletlist()
      }
      if(e==2){
        this.mipu_colletList();
      }
    },
  },
  created() {

  },
  filters: {
    //格式化时间戳
    formatDate: function (value) {
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
    }
  },
  mounted() {
    //1：商品收藏  2：米铺收藏
    this.colletlist(1);
  }
}
