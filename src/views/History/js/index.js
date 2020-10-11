export default {
  data() {
    return {

      historyData: [], //历史记录

      word: '',//搜索关键字

      recommendData: [],//推荐商品

      returnUrl: '',

     // spmsg: '' //可描述提示文字

    };
  },
  methods: {

    //箭头回退
    returns() {
      this.$router.push('/search');
    },

    //清除缓存
    delStroage() {
      localStorage.removeItem("keyword");
      this.historyData = [];
    },

    //选择历史记录
    historyChoose(name) {

      let index = this.historyData.indexOf(name);

      this.historyData.splice(index, 1);

      this.historyData = name + ',' + this.historyData;

      if (this.historyData.endsWith(",")) {
        this.historyData = this.historyData.substring(0, this.historyData.length - 1);
      }

      localStorage.setItem('keyword', this.historyData)

      this.$router.push({'path': '/search', query: {'keyword': name}});
    },

    //选择推荐商品
    recommendChoose(name) {
      let index = this.historyData.indexOf(name);

      if (index != -1) {
        this.historyData.splice(index, 1);
      }

      this.historyData = name + ',' + this.historyData;

      if (this.historyData.endsWith(",")) {
        this.historyData = this.historyData.substring(0, this.historyData.length - 1);
      }

      localStorage.setItem('keyword', this.historyData)

      this.$router.push({'path': '/search', query: {'keyword': name}});

    },

    //搜索
    search() {
      if (this.word != '' && this.word != undefined) {
        //获取keyword缓存
        let keyword = localStorage.getItem('keyword');
        let history = "";
        if (keyword != null && keyword != '') {
          if (keyword.indexOf(',') > 0) {
            let arr = keyword.split(",")
            for(let a of arr){
              //当前关键字不存在与历史记录，存在先删除
              if(a === this.word){
                let index = arr.indexOf(this.word);
                arr.splice(index,1)
              }
            }       
            history = this.word + ',' + arr   
          } else {
            if (keyword === this.word) {
              history = this.word
            } else {
              history = this.word + ',' + keyword
            }
          }
        } else {
          history = this.word
        }
        localStorage.setItem('keyword', history)
        this.$router.push({'path': '/search', query: {'keyword': this.word}});
      } else {
        this.$router.push('/search');
      }
    },

    //获取推荐商品数据
    getRecommend() {
      this.$http({
        method: 'get',
        url: '/minle/mall/commodity/popular',
        data: {}
      })
        .then(res => {
          if (res.status == 200) {
            this.recommendData = res.data.data;
            //this.spmsg = this.recommendData[0].name;
          }
        }).catch(e => {

      })
    }

  },
  created() {
    
    let keyword = localStorage.getItem('keyword');

    //-------历史记录------
    if (keyword != null && keyword != undefined && keyword != "") {
      this.historyData = keyword.split(',')
    }
  },
  mounted() {
    document.getElementById('sword').focus();
    this.word = this.$route.query.word;

    //-----推荐商品------
    this.getRecommend();
  },
  components: {},
  beforeDestroy() {
    this.$store.state.loadByHistoryWord = true;
  }
}
;
