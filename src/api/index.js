import Vue from 'vue'
import axios from 'axios'
import {Toast} from 'vant'
import Router from '@/router'

export var baseURL = ''
import './request'

if (process.env.NODE_ENV === 'development') {
  baseURL = 'api'
} else if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://uat.xinquanjk.com'
}
axios.defaults.timeout = 20000
axios.defaults.baseURL = baseURL
axios.interceptors.request.use(config => {
  //在发送请求之前做某事
  config.headers.Accept = "application/json, text/plain, */*",
  config.headers.Authorization = 'bearer ' + localStorage.getItem('token');
  return config;  //只有return config后，才能成功发送请求
});
axios.interceptors.response.use((rep) => {
  return rep
}, error => {
  if (error.response != undefined) {
    if (error.response.status == '400') {
      if (error.response.data.returnCode == 'ERR_0009') {
        Toast("用户名已存在")
      } else if (error.response.data.returnCode == 'ERR_0010') {
        Toast('账号不存在，请重新输入')
        return false;
      } else if (error.response.data.returnCode == 'ERR_0011') {
        Toast('原密码有误')
        return false;
      } else {
        Toast("参数错误")
      }
      return Promise.reject(error.response.data);
    } else if (error.response.status == '401') {
      if (error.response.data.returnCode == 'ERR_0006') {
        Toast('用户名或密码错误')
        return false;
      } else {
        Toast("您的登录凭证已过期，请重新登录");
        setTimeout(() => {
          Router.push('/login/captcha')
        }, 2000)
        return false;
      }
    } else if (error.response.status == '423') {
      Toast("您的账号密码错误次数过多，账号已被锁定，请在8小时后重新登录");
      return false;
    } else {
      // TODO 系统异常主动返回上报页面
      Toast('网络加载失败，请稍后重试')
    }
  } else {
    if (error.message === 'Network Error') {
      Toast('网络加载失败，请稍后重试！')
      return Promise.reject('网络加载失败，请稍后重试')
    }
  }
})
Vue.prototype.$http = axios
