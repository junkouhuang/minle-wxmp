import Tops from "@/components/Top";
export default {
  data() {
    return {
      bg:require('../img/rectangle.png'),
      applyAgentLevel: '',
    }
  },
  methods: {
    async validate(){
      this.$router.push({path:'/my/xinditan/apply',query:{'applyAgentLevel':this.applyAgentLevel}});
    }
  },
  mounted() {
    this.applyAgentLevel = this.$route.query.applyAgentLevel;
  },
  components: {
    Tops
  }
};
