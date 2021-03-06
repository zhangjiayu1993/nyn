import Vue from 'vue'
import Router from 'vue-router'
import TheIndex from '@/views/index/TheHome'
import PaySucess from '@/views/cart/PaySucess'
import PayFailed from '@/views/cart/PayFailed'
import TheMy from '@/views/my/TheHome'
import TheInfo from '@/views/info/TheHome'
import InfoDetal from '@/views/info/InfoDetail'
import TheCart from '@/views/cart/TheHome'
import GoodsList from '@/views/index/GoodsList'
import SearchGoodsList from '@/views/index/SearchGoodsList'
import GoodsDetail from '@/views/index/GoodsDetail'
import AboutUs from '@/views/my/AboutUs'
import AddContact from '@/views/my/AddContact'
import FillingOrder from '@/views/cart/FillingOrder'
import MyOrder from '@/views/my/MyOrder'
import AddressList from '@/views/cart/AddressList'
import AddressEdit from '@/views/cart/AddressEdit'
import TheAgreement from '@/views/cart/TheAgreement'
import TheLogin from '@/views/Login'
// 按需加载路由模块
// const TheMy = () => import('@/views/my/TheHome')
// const TheInfo = () => import('@/views/info/TheHome')
// const InfoDetal = () => import('@/views/info/InfoDetail')
// const TheCart = () => import('@/views/cart/TheHome')
// const GoodsList = () => import('@/views/index/GoodsList')
// const GoodsDetail = () => import('@/views/index/GoodsDetail')
// const AboutUs = () => import('@/views/my/AboutUs')
// const AddContact = () => import('@/views/my/AddContact')
// const MyOrder = () => import('@/views/my/MyOrder')
// const FillingOrder = () => import('@/views/cart/FillingOrder')
// const AddressList = () => import('@/views/cart/AddressList')
// const AddressEdit = () => import('@/views/cart/AddressEdit')
// const PaySucess = () => import('@/views/cart/PaySucess')
// const PayFailed = () => import('@/views/cart/PayFailed')
// const TheAgreement = () => import('@/views/cart/TheAgreement')
// const TheLogin = () => import('@/views/Login')

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TheHome',
      component: TheIndex,
      meta: {
        title: '圆匀和香'
      }
    },
    {
      path: '/my',
      name: 'TheMy',
      component: TheMy,
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/info',
      name: 'TheInfo',
      component: TheInfo,
      meta: {
        title: '资讯'
      }
    },
    {
      path: '/cart',
      name: 'TheCart',
      component: TheCart,
      meta: {
        title: '购物车'
      }
    },
    {
      path: '/infodetail',
      name: 'InfoDetal',
      component: InfoDetal,
      meta: {
        title: '文章详情'
      }
    },
    {
      path: '/goodslist',
      name: 'GoodsList',
      component: GoodsList,
      meta: {
        title: '商品列表'
      }
    },
    {
      path: '/searchgoodslist',
      name: 'SearchGoodsList',
      component: SearchGoodsList,
      meta: {
        title: '商品检索'
      }
    },
    {
      path: '/goodsdetail',
      name: 'GoodsDetail',
      component: GoodsDetail,
      meta: {
        title: '商品详情'
      }
    },
    {
      path: '/aboutus',
      name: 'AboutUs',
      component: AboutUs,
      meta: {
        title: '关于我们'
      }
    },
    {
      path: '/addcontact',
      name: 'AddContact',
      component: AddContact,
      meta: {
        title: '商务合作'
      }
    },
    {
      path: '/myorder',
      name: 'MyOrder',
      component: MyOrder,
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/fillingorder',
      name: 'FillingOrder',
      component: FillingOrder,
      meta: {
        title: '确认订单'
      }
    },
    {
      path: '/addresslist',
      name: 'AddressList',
      component: AddressList,
      meta: {
        title: '地址列表'
      }
    },
    {
      path: '/addressedit',
      name: 'AddressEdit',
      component: AddressEdit,
      meta: {
        title: '填写收货地址'
      }
    },
    {
      path: '/paysucess',
      name: 'PaySucess',
      component: PaySucess,
      meta: {
        title: '支付成功'
      }
    },
    {
      path: '/payfailed',
      name: 'PayFailed',
      component: PayFailed,
      meta: {
        title: '支付失败'
      }
    },
    {
      path: '/agreement',
      name: 'TheAgreement',
      component: TheAgreement,
      meta: {
        title: '用户协议'
      }
    },
    {
      path: '/login',
      name: 'TheLogin',
      component: TheLogin,
      meta: {
        title: '用户登陆'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
