import Tops from "@/components/Top";

export default {
  data() {
    return {

    };
  },
  methods:{
    returns(){
      this.$router.go(-1)
    }
  },
  components: {
    Tops
  }
}
