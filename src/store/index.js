import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loaddefault:true, //是否加载默认地址
    addressDefault: [], //确认订单界面的默认地址
    commodityNoList:[], //订单号
    loadByHistoryWord:false,//开启历史记录关键字搜素
    serachReturnUrl:'', //搜索界面回退地址
    mipulist:[],
    typeData:[] //米铺规格列表
  },
  getters:{
    getMipuList:function (state) {
      return state.mipulist;
    },
    getLoaddefault:function (state) {
      return state.loaddefault;
    },
    getAddressDefalut:function (state) {
      return state.addressDefault;
    },
    getCommodityNoList:function (state) {
    return state.commodityNoList;
   },
    getLoadByHistoryWord:function (state) {
      return state.loadByHistoryWord;
    },
    getSerachReturnUrl:function (state) {
      return state.serachReturnUrl;
    },
    getTypeData:function (state) {
      return state.typeData;
    }
  },
  mutations:{
    /*setLoaddefault:function (state) {
       state.loaddefault;
    },
    setAddressDefalut:function (state) {
       state.addressDefault;
    }*/
  },
  //state,
  actions,
  // mutations,
  //getters
})
