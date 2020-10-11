import Tops from "@/components/Top";

export default {
  data() {
    return {
      radio: '-1',
      levelList:[],
      icon:[
        { imgurl:require('../img/p1.png'),name:'推广奖励'},
        { imgurl:require('../img/p2.png'),name:'消费福利'},
        { imgurl:require('../img/p3.png'),name:'分享福利'},
        { imgurl:require('../img/p4.png'),name:'免费开店'},
      ]
    };
  },
  methods: {
    returns(){
      this.$router.go(-1);
    },
    openEq(level) {
      //this.$router.push({path:'/my/xinditan/fllow',query:{'applyAgentLevel':level}});
      this.getUserInfo(level);
    },
    //获取用户
    getUserInfo(level) {
      this.$http({
        method: 'post',
        url: '/authorizes/user/detail',
        data: this.$qs.stringify({
          source: "kx6HIOFE5xtaK85g3JXfg3Nx0q6lZK3mGOxMzBGGCALOLUbvFPjowQ=="
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          if (res.data.returnCode == "ERR_0000") {
            if (res.data.data.level == 0 || res.data.data.level == null) {
              this.openVIP();
            } else {
              this.$router.push({path:'/my/xinditan/fllow',query:{'applyAgentLevel':level}});
            }
          }
        }).catch(e => {

      })
    },
    openVIP(){
        this.$dialog.confirm({
          title: '服务中心',
          message: '您尚未开通VIP会员暂无法申请服务，快去开通VIP吧。',
          confirmButtonText:'开通会员（VIP）',
          cancelButtonText:'取消',
          confirmButtonColor: '#FF5555',
        }).then(() => {
          this.$router.push('/my/myvip/open');
        }).catch(() => {
        });
    },

  },
  mounted() {

  },
  components: {
    Tops
  }
};
