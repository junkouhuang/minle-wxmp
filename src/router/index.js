import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{
        'title':'民乐荟商城'
      },
      redirect: "/home"
    },
    {
      path: '/login',
      name: '密码登录',
      meta:{
        'title':'密码登录'
      },
      component: () => import('@/views/Login/index')
    },
    {
      path: '/login/verification',
      name: '验证手机号',
      meta:{
        'title':'验证手机号'
      },
      component: () => import('@/views/Login/components/verification')
    },
    {
      path: '/login/set',
      name: '设置密码',
      meta:{
        'title':'设置密码'
      },
      component: () => import('@/views/Login/components/Set')
    },
    {
      path: '/login/pwd/verificationphone',
      name: '验证手机号',
      meta:{
        'title':'找回登录密码'
      },
      component: () => import('@/views/Login/components/VerificationPhone')
    },
    {
      path: '/login/captcha',
      name: '验证码登录',
      meta:{
        'title':'验证码登录'
      },
      component: () => import('@/views/Login/components/CaptchaLogin')
    },
    {
      path: '/login/pwd/reset',
      name: '设置新密码',
      meta:{
        'title':'找回登录密码'
      },
      component: () => import('@/views/Login/components/Reset')
    },
    {
      path: '/my/set',
      name: '设置',
      meta:{
        'title':'设置'
      },
      component: () => import('@/views/My/components/Set')
    },
    {
      path: '/feedback',
      name: '意见反馈',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/Feedback')
    },
    {
      path: '/feedback/type',
      name: '反馈内容',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/Feedback/select-type')
    },
    {
      path: '/my/myvip',
      name: '我的会员',
      meta:{
        'title':'我的会员'
      },
      component: () => import('@/views/My/components/MyVip')
    },
    {
      path: '/my/dlapplay',
      name: '升级会员',
      meta:{
        'title':'我的会员'
      },
      component: () => import('@/views/My/components/DLApplay')
    },
    {
      path: '/my/myvip/open',
      name: '开通会员',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/VIP')
    },
    {
      path: '/my/mymichu/activate',
      name: '激活米橱',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/VIP/components/michu')
    },
    {
      path: '/my/mymidian/activate',
      name: '激活米铺',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/VIP/components/midian')
    },
    {
      path: '/my/mymigui/activate',
      name: '激活米柜',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/VIP/components/migui')
    },
    {
      path: '/my/mymicang/activate',
      name: '激活米仓',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/VIP/components/micang')
    },
    {
      path: '/my/commissionSettlement',
      name: '分享福利',
      meta:{
        'title':'分享福利'
      },
      component: () => import('@/views/My/components/CommissionSettlement')
    },
    {
      path: '/my/salesPerformance',
      name: '销售业绩',
      meta:{
        'title':'销售业绩'
      },
      component: () => import('@/views/My/components/SalesPerformance')
    },
    {
      path: '/my/card',
      name: '银行卡',
      meta:{
        'title':'提现设置'
      },
      component: () => import('@/views/My/components/Card')
    },
    {
      path: '/my/applyinfo',
      name: '申请信息',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/ApplayInfo')
    },
    {
      path: '/my/wallet/record',
      name: '提现记录',
      meta:{
        'title':'提现记录'
      },
      component: () => import('@/views/My/components/Wallet/components/Record')
    },
    {
      path: '/my/sqcord',
      name: '我的权益',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/SQCord')
    },
    {
      path: '/login/success',
      name: '注册成功',
      meta:{
        'title':'注册成功'
      },
      component: () => import('@/views/Login/components/Success/index')
    },
    {
      path: '/details',
      name: '商品详情',
      meta:{
        'title':'商品详情'
      },
      component: () => import('@/views/Details')
    },
    {
      path: '/share',
      name: '分享商品',
      meta:{
        'title':'分享商品'
      },
      component: () => import('@/views/Share')
    },
    {
      path: '/orderDetail',
      name: '订单详情',
      meta:{
        'title':'订单详情'
      },
      component: () => import('@/views/My/components/OrderDetail')
    },
    {
      path: '/mipuOrderDetail',
      name: '米铺订单',
      meta:{
        'title':'米铺订单'
      },
      component: () => import('@/views/My/components/OrderDetail/mipuOrderDetail')
    },
    {
      path: '/orderStatus',
      name: '物流信息',
      meta:{
        'title':'物流信息'
      },
      component: () => import('@/views/My/components/OrderStatus')
    },
    {
      path: '/order',
      name: '订单',
      meta:{
        'title':'订单'
      },
      component: () => import('@/views/My/components/Order')
    },
    {
      path: '/replacement',
      name: '退换货',
      meta:{
        'title':'退换货'
      },
      component: () => import('@/views/My/components/Replacement')
    },
    {
      path: '/passwordset',
      name: '设置密码',
      meta:{
        'title':'设置密码'
      },
      component: () => import('@/views/My/components/PasswordSet')
    },
    {
      path: '/account',
      name: '账号与安全',
      meta:{
        'title':'账号与安全'
      },
      component: () => import('@/views/My/components/Account')
    },
    {
      path: '/addressAdd',
      name: '新建地址',
      meta:{
        'title':'新建地址'
      },
      component: () => import('@/views/My/components/AddressAdd')
    },
    {
      path: '/footprint',
      name: '足迹',
      meta:{
        'title':'足迹'
      },
      component: () => import('@/views/My/components/Footprint')
    },
    {
      path: '/qrCODE',
      name: '分享二维码',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/QRCODE')
    },
    {
      path: '/address',
      name: '地址管理',
      meta:{
        'title':'地址管理'
      },
      component: () => import('@/views/My/components/Address')
    },
    {
      path: '/userdata',
      name: '会员信息',
      meta:{
        'title':'会员信息'
      },
      component: () => import('@/views/My/components/UserData')
    },
    {
      path: '/my/mipu_home/new/index',
      name: 'mili_list',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/new-mipu/index')
    },
    {
      path: '/my/mipu_home/new/audit_details',
      name: 'audit_details',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/new-mipu/audit-details')
    },
    {
      path: '/my/mipu_home/new/buyer/index',
      name: 'buyer',
      meta:{
        'title':'民乐荟商城',
      },
      component: () => import('@/views/My/components/new-mipu/buyer/index')
    },
    {
      path: '/my/mipu_home/new/buyer/payment',
      name: 'payment',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/new-mipu/buyer/payment')
    },
    {
      path: '/my/mipu_home/new/buyer/phone',
      name: 'phone',
      meta:{
        'title':'修改手机号码'
      },
      component: () => import('@/views/My/components/new-mipu/buyer/changePhone')
    },
    {
      path: '/my/mipu_home/new/buyer/complaint',
      name: 'complaint',
      meta:{
        'title':'投诉商家',
        keepAlive:true
      },
      component: () => import('@/views/My/components/new-mipu/buyer/complaint')
    },
    {
      path: '/my/mipu_home/new/buyer/select',
      name: 'select',
      meta:{
        'title':'投诉商家'
      },
      component: () => import('@/views/My/components/new-mipu/buyer/select-type')
    },
    {
      path: '/my/mipu_home/new/mipu_details',
      name: 'mili_details',
      meta:{
        'title':'我的米铺'
      },
      component: () => import('@/views/My/components/new-mipu/mipu-details')
    },
    {
      path: '/my/mipu_home/sp_details',
      name: '商品详情',
      meta:{
        'title':'商品详情'
      },
      component: () => import('@/views/My/components/Mipu_Home/components/SP_Details')
    },
    {
      path: '/luckywheel',
      name: '幸运抽奖',
      meta:{
        'title':'幸运抽奖'
      },
      component: () => import('@/views/LuckyWheel')
    },
    {
      path: '/my/prizelist',
      name: '奖品列表',
      meta:{
        'title':'奖品列表'
      },
      component: () => import('@/views/My/components/PrizeList')
    },
    {
      path: '/follow',
      name: '我的关注',
      meta:{
        'title':'我的关注'
      },
      component: () => import('@/views/My/components/Follow')
    },
    {
      path: '/RetrievePass',
      name: '找回密码',
      meta:{
        'title':'找回密码'
      },
      component: () => import('@/views/RetrievePass')
    },
    {
      path: '/home',
      name: '首页',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/Home/index')
    },
    {
      path: '/home_taobao',
      name: '首页',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/Taobao/index')
    },
    {
      path: '/home_jd',
      name: '首页',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/JD/index')
    },
    {
      path: '/home_tmall',
      name: '首页',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/TMall/index')
    },
    {
      path: '/classify',
      name: '品类',
      meta:{
        'title':'品类'
      },
      component: () => import('@/views/Classify/index')
    },
    {
      path: '/car',
      name: '购物车',
      meta:{
        'title':'购物车'
      },
      component: () => import('@/views/Car/index')
    },
    {
      path: '/mipucar',
      name: '购物车',
      meta:{
        'title':'购物车'
      },
      component: () => import('@/views/MiPuCar/index')
    },
    {
      path: '/my',
      name: '我的',
      meta:{
        'title':'我的',
        keep:true
      },
      //meta: { requiresAuth: true }, // 添加表示需要验证(因为没登录后台返回401，这里暂时废弃)
      component: () => import('@/views/My/index')
    },
    {
      path: '/app_download',
      name: 'app下载',
      meta:{
        'title':'app下载'
      },
      component: () => import('@/views/My/components/andriod/index')
    },
    {
      path: '/search',
      name: '搜索',
      meta:{
        'title':'搜索'
      },
      component: () => import('@/views/Search/index')
    },
    {
      path: '/orderconfirm',
      name: '确认订单',
      meta:{
        'title':'确认订单'
      },
      component: () => import('@/views/OrderConfirm/index')
    },
    {
      path: '/protocol',
      name: '服务条款',
      meta:{
        'title':'服务条款'
      },
      component: () => import('@/views/Protocol')
    },
    {
      path: '/protocol/user/service',
      name: '服务协议',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/Protocol/serviceProtocol')
    },
    {
      path: '/protocol/user/policy',
      name: '隐私政策',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/Protocol/userDataPolicy')
    },
    {
      path: '/protocol/service/description',
      name: '应用介绍',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/Protocol/serviceDesc')
    },
    {
      path: '/my/wallet',
      name: '钱包',
      meta:{
        'title':'钱包'
      },
      component: () => import('@/views/My/components/Wallet/index')
    },
    {
      path: '/my/wallet/list',
      name: '钱包明细',
      meta:{
        'title':'钱包明细'
      },
      component: () => import('@/views/My/components/Wallet/components/List/index')
    },
    {
      path: '/my/micoupon/recharge',
      name: '一卡通充值明细',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/Baimi/recharge/index')
    },
    {
      path: '/my/micoupon',
      name: '真的省',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/Baimi/index')
    },
    {
      path: '/my/mili',
      name: '米粒',
      meta:{
        'title':'米粒'
      },
      component: () => import('@/views/My/components/Mili/index')
    },
    {
      path: '/my/commission',
      name: '佣金结算',
      meta:{
        'title':'佣金结算'
      },
      component: () => import('@/views/My/components/Commission/index')
    },
    {
      path: '/my/withdraw',
      name: '提现',
      meta:{
        'title':'提现'
      },
      component: () => import('@/views/My/components/Commission/components/Withdraw')
    },
    {
      path: '/my/finsh',
      name: '提现成功',
      meta:{
        'title':'提现成功'
      },
      component: () => import('@/views/My/components/Commission/components/Finsh')
    },
    {
      path: '/my/mipu_open/card',
      name: '开通米铺',
      meta:{
        'title':'开通米铺'
      },
      component: () => import('@/views/My/components/Mipu_Open/components/Card')
    },
    {
      path: '/my/mipu_open/protocol',
      name: '米铺开店协议',
      meta:{
        'title':'米铺开店协议'
      },
      component: () => import('@/views/My/components/Mipu_Open/components/Protocol')
    },
    {
      path: '/my/mipu_open/product/index',
      name: '商品管理',
      meta:{
        'title':'商品管理',

      },
      component: () => import('@/views/My/components/Mipu_Open/components/product/index')
    },
    {
      path: '/my/mipu_home/new/sales_performance',
      name: '销售业绩',
      meta:{
        'title':'销售业绩'
      },
      component: () => import('@/views/My/components/new-mipu/Sales_Performance')
    },
    {
      path: '/my/mipu_home/new/confirm_delivery',
      name: '确认发货',
      meta:{
        'title':'确认发货'
      },
      component: () => import('@/views/My/components/new-mipu/confirm_delivery')
    },
    {
      path: '/my/mipu_open/midetail',
      name: '米铺',
      meta:{
        'title':'米铺',
         keepAlive: true
      },
      component: () => import('@/views/My/components/Mipu_Open/components/MiDetail/index')
    },
    {
      path: '/my/mipu_open/product/addproduct',
      name: '添加商品',
      meta:{
        'title':'添加商品'
      },
      component: () => import('@/views/My/components/Mipu_Open/components/product/addProduct')
    },
    {
      path: '/my/mipu_open/product/editorproduct',
      name: '编辑商品',
      meta:{
        'title':'编辑商品'
      },
      component: () => import('@/views/My/components/Mipu_Open/components/product/editorproduct')
    },
    {
      path: '/my/mipu_open/product/addtype',
      name: '添加商品类型',
      meta:{
        'title':'添加商品类型'
      },
      component: () => import('@/views/My/components/Mipu_Open/components/product/addType')
    },
    {
      path: '/my/mipu_home/new/store',
      name: 'store-management',
      meta:{
        'title':'店铺管理'
      },
      component: () => import('@/views/My/components/new-mipu/store-management')
    },
    {
      path: '/my/mipu_home/new/skcord',
      name: '收款记录',
      meta:{
        'title':'收款记录'
      },
      component: () => import('@/views/My/components/new-mipu/SKCord')
    },
    {
      path: '/my/mipu_home/new/sales_order',
      name: '销售订单',
      meta:{
        'title':'销售订单'
      },
      component: () => import('@/views/My/components/new-mipu/Sales_Order')
    },
    {
      path: '/my/mipu_home',
      name: '米铺',
      meta:{
        'title':'米铺'
      },
      component: () => import('@/views/My/components/Mipu_Home')
    },
    {
      path: '/my/mipu_home/detail',
      name: '米铺信息',
      meta:{
        'title':'米铺信息'
      },
      component: () => import('@/views/My/components/Mipu_Home/components/Detail/index')
    },
    {
      path: '/my/map/index',
      name: '高德地图',
      meta:{
        'title':'高德地图'
      },
      component: () => import('@/views/My/components/map/index')
    },
    {
      path: '/my/china',
      name: '省市区',
      meta:{
        'title':'省市区'
      },
      component: () => import('@/components/China/index')
    },
    {
      path: '/my/real_name/index',
      name: '实名认证',
      meta:{
        'title':'实名认证'
      },
      component: () => import('@/views/My/components/Mipu_Open/components/RealName/index')
    },
    {
      path: '/my/real_name/protocol',
      name: '实名认证协议',
      meta:{
        'title':'实名认证协议'
      },
      component: () => import('@/views/My/components/Mipu_Open/components/RealName/protocol')
    },
    {
      path: '/my/mipu_home/verification',
      name: '米铺信息',
      meta:{
        'title':'米铺信息'
      },
      component: () => import('@/views/My/components/Mipu_Home/components/Verification/index')
    },
    {
      path: '/my/mipu_home/history',
      name: '米铺信息',
      meta:{
        'title':'米铺信息'
      },
      component: () => import('@/views/My/components/Mipu_Home/components/History/index')
    },
    {
      path: '/my/mipu_open/fllow',
      name: '我的米铺',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/Mipu_Open/components/Fllow/index')
    },
    {
      path: '/my/mipu_home/fail',
      name: '我的米铺',
      meta:{
        'title':'我的米铺'
      },
      component: () => import('@/views/My/components/Mipu_Home/components/Fail/index')
    },
    {
      path: '/my/mipu_home/wait',
      name: '我的米铺',
      meta:{
        'title':'我的米铺'
      },
      component: () => import('@/views/My/components/Mipu_Home/components/Wait/index')
    },
    {
      path: '/my/mipu_home/info',
      name: '米铺信息',
      meta:{
        'title':'米铺信息'
      },
      component: () => import('@/views/My/components/Mipu_Home/components/Info/index')
    },
    {
      path: '/my/mipu_home/editorInfo',
      name: '米铺信息',
      meta:{
        'title':'米铺信息'
      },
      component: () => import('@/views/My/components/Mipu_Home/components/EditorInfo/index')
    },
    {
      path: '/my/mipu_record',
      name: '米铺交易记录',
      meta:{
        'title':'米铺交易记录'
      },
      component: () => import('@/views/My/components/Mipu_Home/components/Mipu_Record/index')
    },
    {
      path: '/my/migang',
      name: '米满仓',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/MiGang')
    },
    {
      path: '/my/confirmwithdraw',
      name: '确认提现',
      meta:{
        'title':'确认提现'
      },
      component: () => import('@/views/My/components/Commission/components/confirmwithdraw')
    },
    {
      path: '/my/wallet/extract',
      name: '提现',
      meta:{
        'title':'提现'
      },
      component: () => import('@/views/My/components/Wallet/components/Extract/index')
    },
    {
      path: '/my/wallet/extract/success',
      name: '提现成功',
      meta:{
        'title':'提现成功'
      },
      component: () => import('@/views/My/components/Wallet/components/Extract/components/index')
    },
    {
      path: '/loginhelp',
      name: '登录帮助',
      meta:{
        'title':'登录帮助'
      },
     component: () => import('@/views/Lelp/LoginHelp/index')
    },
    {
      path: '/registerhelp',
      name: '注册帮助',
      meta:{
        'title':'注册帮助'
      },
      component: () => import('@/views/Lelp/RegisterHelp/index')
    },
    {
      path: '/extracthelp',
      name: '提现帮助',
      meta:{
        'title':'提现帮助'
      },
      component: () => import('@/views/Lelp/ExtractHelp/index')
    },
    {
      path: '/history',
      name: '搜索历史',
      meta:{
        'title':'搜索历史'
      },
      component: () => import('@/views/History/index')
    },
    {
      path: '/hope',
      name: '敬请期待',
      meta:{
        'title':'敬请期待'
      },
      component: () => import('@/views/Hope/index')
    },
    {
      path: '/accountAdmin/enterpriseOpenAccount',
      name: '企业开户',
      meta:{
        'title':'企业开户',
        'keepAlive': false // 需要被缓存
      },

      component: () => import('@/views/accountAdmin/enterpriseOpenAccount')
    },
    {
      path: '/accountAdmin/bandCard',
      name: '绑定银行卡',
      meta:{
        'title':'绑定银行卡'
      },
      component: () => import('@/views/accountAdmin/bandCard')
    },
    {
      path: '/accountAdmin/bohaiBank',
      name: '线上渤海银行',
      meta:{
        'title':'线上渤海银行'
      },
      component: () => import('@/views/accountAdmin/bohaiBank')
    },
    {
      path: '/accountAdmin/index',
      name: '会员中心',
      meta:{
        'title':'会员中心'
      },
      component: () => import('@/views/accountAdmin/index')
    },
    {
      path: '/accountAdmin/setting',
      name: '渤海账户管理',
      meta:{
        'title':'渤海账户管理'
      },
      component: () => import('@/views/accountAdmin/setting')
    },
    {
      path: '/my/xinditan',
      name: '鑫地摊',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/Xinditan')
    },
    {
      path: '/my/xinditan/fllow',
      name: '鑫地摊申请流程',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/Xinditan/components/Fllow')
    },
    {
      path: '/my/xinditan/apply',
      name: '鑫地摊申请',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/Xinditan/components/Apply')
    },
    {
      path: '/my/xinditan/protocol',
      name: '鑫地摊协议',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/Xinditan/components/Protocol')
    },
    {
      path: '/my/xinditan/Audit',
      name: '鑫地摊审核列表',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/Xinditan/components/Audit/index')
    },
    {
      path: '/my/xinditan/audit/details',
      name: '鑫地摊审核详情',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/Xinditan/components/Audit/audit-details')
    },
    {
      path: '/my/xinditan/desktop',
      name: '鑫地摊主页',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/Xinditan/components/Audit/xdt-details')
    },
    {
      path: '/my/xinditan/store',
      name: '鑫地摊信息管理',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/Xinditan/components/Audit/xdt-store')
    },
    {
      path: '/my/xinditan/product',
      name: '在线选品',
      meta:{
        'title':'民乐荟商城',
      },
      component: () => import('@/views/My/components/Xinditan/components/Product')
    },
    {
      path: '/my/xinditan/productstore',
      name: '选品管理',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/Xinditan/components/ProductStore')
    },
    {
      path: '/my/xinditan/product/home',
      name: '鑫地摊商品',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/Xinditan/components/ProductHome')
    },
    {
      path: '/my/mipu_home/new/purchase_order/index',
      name: '采购订单',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/new-mipu/Purchase_Order')
    },
    {
      path: '/my/mipu_home/new/wholesale_mall/index',
      name: '批发商城',
      meta:{
        'title':'民乐荟商城'
      },
      component: () => import('@/views/My/components/new-mipu/Wholesale_Mall')
    }

  ]
})
