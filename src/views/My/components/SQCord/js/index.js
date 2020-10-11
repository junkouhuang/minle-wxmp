import Tops from "@/components/Top";
export default {
  data() {
    return {
      list:[]
    };
  },
  watch: {

  },
  methods:{
    //箭头回退
    returns(){
      this.$router.go(-1)
    },

    getdata() {
      this.$http({
        url: '/minle/user/agentApply/display',
        method: "post",
        data: {

        }
      }).then(res => {
        if (res.data.returnCode == "ERR_0000") {
          this.list = res.data.data.list;
        }
      });
    },

    myClick(type){
      this.$router.push({
        path: type
      })
    },

    activeEq(level) {
      if (level == 1) {
        this.$router.push('/my/mymichu/activate');
      } else if (level == 2) {
        this.$router.push('/my/mymidian/activate');
      } else if (level == 3) {
        this.$router.push('/my/mymigui/activate');
      } else if (level == 4) {
        this.$router.push('/my/mymicang/activate');
      }
    },
  },
  components: { Tops },
  mounted() {
    this.getdata()
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
      var t = Y + '-' + m + '-' + d + ' ' + H + ':' + i ;
      return t;
    }
  }
};
