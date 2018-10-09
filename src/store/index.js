import Vue from 'vue'
import Vuex from 'vuex'
// import { CART_LIST } from '@/api/api-type'
// import axios from 'axios'

Vue.use(Vuex)

const state = {
  count: 1,
  users: {},
  dataChange: false,
  // token: window.localStorage.getItem('TOKEN'), // token
  // token: '5cc915c437c43fb8129c2437db72d734', // token
  cartFooterCount: 0, // 页脚购物车显示的数量（按照购物的种类来区分）
  cartId: [], // 结算购物车ID
  chosenAddressId: '' // 默认已选择地址ID
}
const mutations = {
  cartFooterCount(state, data) {
    // state.cartFooterCount = data
    state.cartFooterCount++
  },
  add(state, num) {
    state.count += num
  },
  reduce(state, num) {
    state.count -= num
  },
  dataChangeM(state, dataChange) {
    state.dataChange = dataChange
  },
  setUsers(state, users) {
    state.users = users
  }
}
const actions = {
  getCount({commit, state}) {
    // axios.post(CART_LIST, {token: state.token, page: 1, pagesize: 10}).then(res => {
    //   if (res.data.error_code == 0) {
    //     commit('cartFooterCount', res.data.count)
    //   }
    //   // state.cartFooterCount = res.data.count
    // })
    commit('cartFooterCount', 4)
  },
  addAction(store, num) {
    store.commit('add', num)
  },
  reduceAction(store, num) {
    store.commit('reduce', num)
  },
  dataChangeA(store, dataChange) {
    store.commit('dataChangeM', dataChange)
  }
}
const getters = {
  cartFooterCount(state) {
    return state.cartFooterCount
  },
  count(state) {
    return state.count
  },
  dataChange(state) {
    return state.dataChange
  },
  users(state) {
    return state.users
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
