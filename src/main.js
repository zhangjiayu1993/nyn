// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import './assets/iconfont/iconfont.css'
import './assets/css/bass.less'
// import qs from 'qs'
// 引入公共接口
import './api'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
Vue.use(Vant)

// Vue.prototype.qs = qs
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
