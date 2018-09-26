import Vue from 'vue'
import Router from 'vue-router'
import TheIndex from '@/views/index/TheHome'

// 按需加载路由模块
const TheMy = () => import('@/views/my/TheHome')
const TheInfo = () => import('@/views/info/TheHome')
const InfoDetal = () => import('@/views/info/InfoDetail')
const TheCart = () => import('@/views/cart/TheHome')
const GoodsList = () => import('@/views/index/GoodsList')
const GoodsDetail = () => import('@/views/index/GoodsDetail')
const AboutUs = () => import('@/views/my/AboutUs')
const AddContact = () => import('@/views/my/AddContact')
const MyOrder = () => import('@/views/my/MyOrder')
const FillingOrder = () => import('@/views/cart/FillingOrder')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TheHome',
      component: TheIndex
    },
    {
      path: '/my',
      name: 'TheMy',
      component: TheMy
    },
    {
      path: '/info',
      name: 'TheInfo',
      component: TheInfo
    },
    {
      path: '/cart',
      name: 'TheCart',
      component: TheCart
    },
    {
      path: '/infodetail',
      name: 'InfoDetal',
      component: InfoDetal
    },
    {
      path: '/goodslist',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/goodsdetail',
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/aboutus',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/addcontact',
      name: 'AddContact',
      component: AddContact
    },
    {
      path: '/myorder',
      name: 'MyOrder',
      component: MyOrder
    },
    {
      path: '/fillingorder',
      name: 'FillingOrder',
      component: FillingOrder
    }
  ]
})
