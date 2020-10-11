import Vue from 'vue'
import App from './App'
import router from './router'
import './common/less/common.less'
import Vant from 'vant'
import 'lib-flexible'
import 'vant/lib/index.css'
import './common/iconfont/iconfont.css'
import FastClick from 'fastclick'
import store from './store'
import './index.css'
import './api/index'
import VLAZY from 'vue-lazyload'
import qs from 'qs'
import url from '@/api/url'
import wx from 'weixin-js-sdk'
import storage from './assets/js/storage'
import axios from 'axios'
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios

Vue.prototype.$storage = storage

Vue.use(Vant)
Vue.prototype.$qs = qs
Vue.prototype.$url = url


//图片懒加载
Vue.use(VLAZY,{
  error:'static/no.png',
  loading:'static/no.png'
})
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
//点击延迟解决
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}
// 根据路由设置标题
router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    document.title = to.meta.title
  }
  next();
})




