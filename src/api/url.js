const home = '/minle/mall/commodity/display' //民乐荟首页
const detail = '/minle//mall/commodity/preview'//民乐荟商品详情
const addcar = '/minle/mall/cart/add' //是否已经加入购物车
const carlist ='/minle/mall/cart/display' //购物车列表
const search ='/minle/mall/commodity/search' //搜索界面
const classify ='/minle/commoditytype/display' //分类
const delcar = '/minle/mall/cart/deleteBath' //购物车删除
const settlement = '/minle/mall/cart/settlement' //提交订单
const submitOrder = '/minle//mall/order/submitOrder' //立即支付
const pay = '/minle/mall/order/pay' //結算
const env = '/authorizes/user/wx/validate' //检测是否登录
const token = '/common/wxmp/minle/token' //获取token
const getcode = '/authorizes/security/code' //获取手机验证码
const verify  ='/authorizes/security/validate' //校验短信验证码
const userOrder='/minle/mall/order/queryUserOrder'//查询用户订单
const deletOrder='/minle/mall/order/delete'//取消订单
const wxpay='/minle/mall/order/pay' //結算'
const userinfo='/minle/user/center'//会员信息
const saveAdd='/minle/user/address/save'//地址保存
const province='/common/province/display?country=1'//查询省
const area='/common/area/display'//查询区
const city='/common/city/display'//查询城市
const editAdr='/minle/user/address/edit'//编辑地址

const login ='/authorize/security/user/passport' //登录
const checkphone  = '/authorizes/user/simple/validate' //校验手机验证码是否合法
const register = '/authorizes/user/simple/register' //注册
const wxuserinfo = '/common/wxmp/minle/userinfo' //获取微信用户信息


const banner = '/minle/mall/banner/find' //获取首页轮播图

const defaultaddress = '/minle/user/address/default' //获取默认地址
const saveAddress = "/minle/user/address/save" //保存会员地址
const editAddress = "/minle/user/address/edit" //修改会员地址
const delAddress = '/minle/user/address/delete' //刪除地址
const addressList = '/minle/user/address/display' //地址列表
const createAddress = '/minle/user/address/create' //添加地址
const mlmx='/minle/user/xqm/display'//米粒明细

const loginout = '/authorize/security/revoke' //退出
const tag = '/minle/commoditytag/display'

const  queryUserOrderWholesaleMarket='/minle/mall/order/queryUserOrderWholesaleMarket';


export default {
  home,
  editAdr,
  mlmx,
  deletOrder,
  wxuserinfo,
  login,
  wxpay,
  province,
  city,
  userOrder,
  area,
  userinfo,
  saveAdd,
  detail,
  addcar,
  carlist,
  search,
  classify,
  delcar,
  settlement,
  submitOrder,
  pay,
  env,
  token,
  getcode,
  verify,
  checkphone,
  register,
  defaultaddress,
  banner,
  saveAddress,
  editAddress,
  delAddress,
  addressList,
  createAddress,
  loginout,
  tag,
  queryUserOrderWholesaleMarket
}
