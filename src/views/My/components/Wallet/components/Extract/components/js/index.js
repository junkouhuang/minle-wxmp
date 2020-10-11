import Tops from "@/components/Top";

export default {
  data() {
    return {
      amount:0,
      showTig:false
    };
  },
  methods: {
    //箭头回退
    returns(){
      this.$router.go('-1');
    },
  },
  components: {
    Tops
  },
  created() {

  },
  activated() {

  },
  mounted(){
    this.amount = this.$route.query.amount;

  }
};
