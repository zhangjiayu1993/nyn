/* ************** 所有api的配置文档 ***************/
export const BASE_URL = 'http://mjwhqt.hjw988.com'// base url

/* ************** 前台接口 ***************/

export const GET_RULES = BASE_URL + '/api/getAllRules' // =获取权限
export const LOGIN = BASE_URL + '/api/login' // 登录接口
export const GOODS_LIST = BASE_URL + '/api/goods/list' // 商品列表
export const GOODS_NEWST = BASE_URL + '/api/goods/newest' // 最新商品
export const GOODS_INDEX = BASE_URL + '/api/goods/index' // 商品推荐
export const GOODS_DETAIL = BASE_URL + '/api/goods/detail'// 商品详情页
export const CONTACT = BASE_URL + '/api/contact/add'// 商务合作
export const INFO_LIST = BASE_URL + '/api/info/list'// 资讯列表
export const INFO_DETAIL = BASE_URL + '/api/info/detail'// 资讯详情
export const INFO_INDEX = BASE_URL + '/api/info/index'// 主页咨询
export const ADDRESS_ADD = BASE_URL + '/api/address/add'// 添加收货地址
export const ADDRESS_UPDATE = BASE_URL + '/api/address/update'// 修改收货地址
export const ADDRESS_LIST = BASE_URL + '/api/address/list'// 收货地址列表
export const ADDRESS_DETAIL = BASE_URL + '/api/address/detail'// 收货地址详情
export const ADDRESS_DELETE = BASE_URL + '/api/address/delete'// 删除收货地址
export const ADDRESS_STATUS = BASE_URL + '/api/address/status'// 默认收货地址
export const ORDER_ADD = BASE_URL + '/api/order/add'// 添加订单
export const ORDER_LIST = BASE_URL + '/api/order/list'// 订单列表
export const PAY_WECHAT = BASE_URL + '/api/pay/wechat'// 支付订单
export const CART_ADD = BASE_URL + '/api/cart/add'// 添加购物车
export const CART_UPDATE = BASE_URL + '/api/cart/update'// 修改购物车的接口
export const CART_LIST = BASE_URL + '/api/cart/list'// 购物车列表的接口
export const CART_DELETE = BASE_URL + '/api/cart/delete'// 删除购物车的接口
export const CART_DETAIL = BASE_URL + '/api/cart/detail'// 结算购物车的接口
export const USER_DETAIL = BASE_URL + '/api/user/detail'// 用户详情的接口
export const ALL_CATEGORY = BASE_URL + '/api/getAllCategory'// 获取所有分类
export const BANNER_LIST = BASE_URL + '/api/banner/list' // banner列表
export const GOODS_KEYWORD = BASE_URL + '/api/goods/keyword' // 商品检索列表
