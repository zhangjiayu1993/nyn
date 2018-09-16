import Vue from 'vue'
import Router from 'vue-router'
import TheIndex from '@/views/index/TheHome'
import TheMy from '@/views/my/TheHome'

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
    }
  ]
})
