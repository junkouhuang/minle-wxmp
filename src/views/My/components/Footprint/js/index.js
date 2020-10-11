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
      checked:false
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
    //足迹列表
    footprintlist(){
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      let arr = {pageNum: this.pageNum,pageSize:this.pageSize}
      this.$http({
        method: 'post',
        url: '/minle/user/favorite/display',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: this.$qs.stringify(arr)
      })
        .then(res => {
          this.$toast.clear();
          if (res.status == 200) {
            for (let index of  res.data.data.list) {
              index.check = false;
            }
            this.arr = this.arr.concat(res.data.data.list);
            this.total = res.data.data.total;
          }
        }).catch(e => {
      })
    },
    //下拉加載更多
    onLoad(){
      setTimeout(() => {

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.arr.length >= this.total) {
          this.finished = true;
        }else{
          this.pageNum += this.pageNum;
          this.footprintlist();
        }
      }, 500);
    },
    //刪除
    del(){
      if(this.indexarr.length<=0){
        this.$toast("请选择要删除的足迹");
        return false;
      }
      this.$http({
        method: 'post',
        url: '/minle/user/favorite/deleteBatch',
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
    }
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
   this.footprintlist();
  }
}
