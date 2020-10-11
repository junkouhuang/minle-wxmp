<template>
  <div>
    <iframe
      id="test"
      :src="'https://m.amap.com/picker/?key=608d75903d29ad471362f8c58c550daf&center='+longitude_latitude"
      frameborder="0"
      class="iframe"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      longitude_latitude:''
    };
  },
  created(){
    //获取经纬度，找到附近商家
    this.longitude_latitude =localStorage.getItem('longitude_latitude')
  },
  mounted() {
      const that = this
      var iframe = document.getElementById("test").contentWindow;
      document.getElementById('test').onload = function(){
          iframe.postMessage('hello','https://m.amap.com/picker/');
      };
      window.addEventListener(
        "message",
        function(e) {
          if (e.data.name && e.data.location) {
            that.$storage.set('address_data',e.data)
            that.$router.back()
          }
        },
        false
      );
  }
};
</script>

<style lang="less">
.iframe {
  width: 100%;
  height: 100vh;
}
</style>
