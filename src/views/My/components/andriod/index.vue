<template>
  <div class="download">
    <tops>
      <div slot='left' class="arrow" @click="$router.go('-1')"></div>
      <div slot='center' class="title"></div>
    </tops>
    <img class="bgimg" src="./guide.png"/>
    <div class="btn">
      <a :href="appUrl">
        APP下载
<!--        <img src="./download.png" class="icon">-->
      </a>
    </div>
  </div>
</template>

<script>
import Tops from "@/components/Top";

export default {
  name: "index",
  data() {
    return {
      appUrl: ''
    };
  },
  components: {Tops},
  created() {
    this.getAppUrl();
  },
  methods: {
    getAppUrl() {
      this.$http({
        method: 'get',
        url: '/common/app/version/upgrade?appName=minle-android-release&versionName=1.0.0&type=1',

      })
        .then(res => {
          if (res.status == 200) {
            console.log(res.data.data.apkUrl);
            this.appUrl = res.data.data.apkUrl;
          }
        }).catch(e => {

      })
    }
  }
}
</script>

<style lang="less" scoped>
.top {
  background: none !important;
  border-bottom: none !important;

  .arrow::after {
    border: 0.026667rem solid #fff !important;
    border-width: 0.043rem 0 0 0.043rem !important;
  }

  .title {
    color: #fff !important;
  }


}

.download {
  width: 100%;
  height: 100vh;

  .bgimg {
    width: 100%;
    padding-bottom: 50px;
  }

  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    background: #f55;

    .icon {
      width: 120px;
      margin-right: 10px;
    }

    a {
      width: 80%;
      background: rgba(255,255,255,.8);
      color: #ff5555;
      font-weight: bold;
      font-size: 16px;
      height: 46px;
      line-height: 46px;
      border-radius: 8px;
    }

    span {
      font-size: 16px;
    }

  }
}
</style>
