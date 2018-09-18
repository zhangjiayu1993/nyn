import Vue from 'vue'
import Router from 'vue-router'
import TheIndex from '@/views/index/TheHome'
import TheMy from '@/views/my/TheHome'
import TheInfo from '@/views/info/TheHome'
import TheCart from '@/views/cart/TheHome'

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
    }
  ]
})
