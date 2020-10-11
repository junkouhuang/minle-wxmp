import Tops from "@/components/Top";

export default {
  data() {
    return {
      username:'',
      telephone:''
    };
  },
  methods: {
    //回退
    returns(){
      this.$router.go('-1');
    },
    getMessage() {
      this.$http({
        method: 'post',
        url: '/authorizes/user/detail',
        data:  this.$qs.stringify({
          source: "kx6HIOFE5xtaK85g3JXfg3Nx0q6lZK3mGOxMzBGGCALOLUbvFPjowQ=="  
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
        .then(res => {
          if (res.status == 200) {
            this.username = res.data.data.uno;
            this.telephone = res.data.data.telephone;
          }
        }).catch(e => {

      })
    }
  },
  mounted() {
    this.getMessage()
  },
  components: {
    Tops
  }
};
