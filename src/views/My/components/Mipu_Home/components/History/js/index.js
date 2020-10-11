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
      this.$router.go('-1');
    },

    //清除缓存
    delStroage() {
      localStorage.removeItem("mipu_keyword");
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

      localStorage.setItem('mipu_keyword', this.historyData)


      if(name == ""){
        localStorage.setItem('mipu_kw', '')
      }else{
        localStorage.setItem('mipu_kw', name)
      }



      this.$router.go('-1');
    },


    //搜索
    search() {

      //获取keyword缓存
      let keyword = localStorage.getItem('mipu_keyword');
      let history = "";
      if (keyword != null) {
        history = keyword;
      }

      //当文本框不输入时，取placeholder
     // this.word = this.word !== "" ? this.word : this.spmsg;

      let arr = history.split(",")

      for(let a of arr){
        //当前关键字不存在与历史记录，存在先删除
        if(a === this.word){
          let index = arr.indexOf(this.word);
          arr.splice(index,1)

        }
      }
      if(this.word !=""){
        history = this.word + ',' + arr
      }


      if (history.endsWith(",")) {
        history = history.substring(0, history.length - 1);
      }

      localStorage.setItem('mipu_keyword', history)
      if(this.word == ""){
        localStorage.setItem('mipu_kw', '')
      }else{
        localStorage.setItem('mipu_kw', this.word)
      }

      this.$router.go('-1');
    },


  },


  mounted() {

    //-------历史记录------

    let keyword = localStorage.getItem('mipu_keyword');

    if (keyword != null && keyword != undefined && keyword != "") {
      this.historyData = keyword.split(',')
    }

  },

  beforeDestroy() {

  }
}
;
