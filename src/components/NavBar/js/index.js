import eventBus from '@/common/js/evenbus'
export default {
  name: "index",
  data() {
    return {
      isActive:0,
      toolbars: [
        {
          id: 0,
          icon1:require('../images/home2xa.png'),
          icon2:require('../images/home2xb.png'),
          url: '/home',
          isActive: true,
          text: '首页'
        },
        {
          id: 1,
          icon1:require('../images/classfy2xa.png'),
          icon2:require('../images/classfy2xb.png'),
          url: '/classify',
          isActive: false,
          text: '品类'
        },
        {
          id: 2,
          icon1:require('../images/car2xa.png'),
          icon2:require('../images/car2xb.png'),
          url: '/car',
          isActive: false,
          text: '购物车'
        },
        {
          id: 3,
          icon1:require('../images/my2xa.png'),
          icon2:require('../images/my2xb.png'),
          url: '/my',
          isActive: false,
          text: '我的'
        }
      ],
      caramount:''
    }
  },
  methods: {
    handleClick(index,e) {
      for (let i in this.toolbars) {
        this.toolbars[i].isActive = false;
      }
      this.toolbars[index].isActive = !this.toolbars[index].isActive;
    },
    lock(e) {
      //锁定tobar
      for (let i of e) {
        if (i.url === this.$route.path) {
          i.isActive = true
        } else {
          i.isActive = false
        }
      }
    },
  },
  watch: {
    $route(e) {
      this.lock(this.toolbars)
    }
  },
  created() {
    let that = this;
    eventBus.$on("len", (val) => {
      this.caramount = val.caramount;
    })
  },
  mounted() {
    this.caramount = localStorage.getItem('caramount');
    this.lock(this.toolbars)
  }
}
