import Tops from "@/components/Top";

export default {
  data() {
    return {
      radio: true,
      arr: [1],
      list: [],
      loading: true,
      error: false,
      finished: true,
      total: 0,
      num: 0,
      nums: 1,
      source:'',//跳转来源
      defalutAddress:[]
    };
  },
  watch: {
    radio() {
      this.$toast({
        message: "设置默认地址成功",
        position: "bottom",
        duration: 1000
      });
    }
  },
  mounted() {
    this.getData(1);
    this.source = this.$route.query.source;
  },
  beforeDestroy(){
    this.$store.state.loaddefault = false;
    if(this.defalutAddress!=""){
      this.$store.state.addressDefault = this.defalutAddress;
    }
  },
  methods: {
    //箭头回退
    returns(){
      this.$router.go('-1');
    },
    //选择地址
    check(item){
      if(this.source == 'orderconfirm'){
        //this.$router.push('/orderconfirm');
        this.$router.go('-1')
        this.defalutAddress = item;
        //同级组件传参
        //this.$store.commit('loaddefault',false);
        //this.$store.commit('addressDefault',item);

       // eventBus.$emit('address',{'obj':item,'moren':false})

      }
      //sessionStorage.checkAdd=JSON.stringify(item)
    },
    //修改
    editor(item){
      this.$router.push({'path':'/addressAdd',query:{type:'update','id':item.id}});
/*
      localStorage.useradd=JSON.stringify(item)*/
    },
    onLoad() {
      if (this.num == this.nums) {
        this.finished = true;
      } else {
        this.nums += 1;
        this.getData(this.nums);
      }
    },
    del(id,index) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定删除该收货地址？"
        })
        .then(() => {
          let data = {
            id: id
          };
          this.$http({
            method: "post",
            url: this.$url.delAddress,
            data: this.$qs.stringify(data)
          }).then(res => {
            if(res.data.returnCode == "ERR_0000"){
              this.list.splice(index,1)
              this.$store.state.addressDefault = []
            }
          });
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    getData(pageNum) {
      this.loading = true;
      let data = {
        pageNum: pageNum,
        pageSize: 6
      };
      this.$http({
        method: "post",
        url: this.$url.addressList,
        data: this.$qs.stringify(data)
      }).then(res => {
        for (let i of res.data.data.list) {
          this.list.push(i);
        }
        this.total = res.data.data.total;
        this.num = parseInt(this.total / 5) + 1;
        this.loading = false;
        this.finished = true;
      });
    }
  },
  components: {
    Tops
  }
};
