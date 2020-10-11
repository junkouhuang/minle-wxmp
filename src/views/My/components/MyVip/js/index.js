import Tops from "@/components/Top";

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      total: 0,
      pageNum: 1,
      pageSize: 14,
      status:0, //0普通会员 4VIP会员 5省代理 6市代理 7区县代理 8社区代理
      active:0,
      luckywheel:true,
      currMonthFans: 0,
      currWeekFans: 0,
      todayFans: 0,
      totalFans: 0,
      yesterdayFans: 0,
    };
  },
  methods: {
    //箭头回退
    returns() {
      this.$router.push('/my');
    },
    //当前激活的标签改变时触发
    tabChange(index) {
      this.list = [];
      this.pageNum = 1;
      this.navBarFixed = false;
      this.finished = false;
      this.loading = false;
      this.status = index;
      this.active = index;
      this.getdata();
      //0普通会员 4VIP会员 5省代理 6市代理 7区县代理 8社区代理
      //let level = index == 0?'':index == 1?0:index == 2?4:index == 3?5:index == 4?6:index == 5?6:index == 6?7:index == 7?8:'';
      this.$router.push({"path": "/my/myvip", query: {status: index}});
    },
    //加载更多
    onLoad() {
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;
        if (this.list.length >= this.total) {
          this.finished = true;
        } else {
          this.pageNum += 1;
          this.getdata();
        }
      },500)
    },
    //实现导航栏吸顶效果
    watchScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //  当滚动超过 366 时，实现吸顶效果
      if (scrollTop > 366) {
        this.navBarFixed = true
      } else {
        this.navBarFixed = false
      }
    },
    //分享二维码
    qrcode(){
        this.$dialog.confirm({
          title: '',
          message: '您尚未开通VIP无法分享二维码，快去开通会员获取更多粉丝吧。',
          confirmButtonText:'开通会员（VIP）',
          cancelButtonText:'取消',
          confirmButtonColor: '#FF5555',
        }).then(() => {
          this.$router.push('/my/myvip/open');
        }).catch(() => {
        });
    },
    code(){
      this.$http({
        method: 'post',
        url:'/authorizes/user/code',
        data: this.$qs.stringify({
          source: "kx6HIOFE5xtaK85g3JXfg3Nx0q6lZK3mGOxMzBGGCALOLUbvFPjowQ=="
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      })
        .then(res => {
          if (res.status == 200) {
            if (res.data.returnCode == "ERR_0021") {
              this.qrcode();
            } else if (res.data.returnCode == "ERR_0000") {
              //localStorage.setItem('qrcodeImg', res.data.data)
              this.share(res.data.data);
            }
          }
        }).catch(e => {

      })
    },
    //分享
    share(qrcode){
      let url = encodeURIComponent(location.href.split('#')[0]); //获取锚点之前的链接
      this.$http({
        method: 'get',
        url: '/common/wxmp/minle/share?url='+url,
      })
        .then(res => {
          if (res.status == 200) {
            this.$router.push({
              path: '/qrCODE',
              query: {
                qrcode:qrcode,
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
    //获得粉丝
    getFans() {
      this.$http({
        method: 'post',
        url:'/authorizes/user/fans',
        data: this.$qs.stringify({
          source: "kx6HIOFE5xtaK85g3JXfg3Nx0q6lZK3mGOxMzBGGCALOLUbvFPjowQ=="
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
          if (res.status == 200) {
              this.currMonthFans=res.data.data.currMonthFans;
              this.currWeekFans=res.data.data.currWeekFans;
              this.todayFans=res.data.data.todayFans;
              this.totalFans=res.data.data.totalFans;
              this.yesterdayFans=res.data.data.yesterdayFans;
          }
        }).catch(e => {

      })
    },
    //获取列表数据
    getdata() {
      /*this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      });*/
      this.$http({
        url: '/authorizes/user/groups',
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: this.$qs.stringify({
          level: this.status == 0?'':this.status == 1?0:this.status == 2?1:this.status == 3?2:this.status == 4?3:this.status == 5?4:'',
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          source: "kx6HIOFE5xtaK85g3JXfg3Nx0q6lZK3mGOxMzBGGCALOLUbvFPjowQ=="
        })

      }).then(res => {
        this.$toast.clear();
        if (res.data.returnCode == "ERR_0000") {
          this.list = this.list.concat(res.data.data.list);
          this.total = res.data.data.total;
        } else {
          this.list = [];
          this.total = 0;
        }
      });
    }
  },
  mounted() {
    // 事件监听滚动条
    window.addEventListener('scroll', this.watchScroll);
    this.status = this.$route.query.status;
    this.active = this.$route.query.status;
    this.getdata();
    this.getFans();
  },
  filters: {
    //格式化时间戳
    formatDate: function (value) {
      return value.substring(0,10);
    }
  },
  components: {
    Tops
  }
};
