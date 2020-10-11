<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    <NavBar v-if="showToolbars" ></NavBar>
  </div>
  <!--  <div id="app">
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
          <router-view  v-if="!$route.meta.keepAlive"/>
      <NavBar v-if="showToolbars" ></NavBar>
    </div>-->
</template>

<script>
  import NavBar from './components/NavBar/index'
  export default {
    name: 'App',
    data() {
      return{
        showToolbars:false,
        keep:false
      }
    },
    components: {
      NavBar
    },
    created(){

    },
    watch: {
      $route(to, from) {
        if(to.path=="/home"||to.path=='/car'||to.path=='/my'||to.path=='/classify'){
          this.showToolbars = true;
        }else{
          this.showToolbars = false;
        }
        /*  if(to.meta.keep){
            this.keep=true
          }else{
            this.keep=false
          }*/
      }
    }
  }
</script>

<style>

</style>
