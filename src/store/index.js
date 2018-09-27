import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 1,
  users: {},
  dataChange: false,
  token: '5cc915c437c43fb8129c2437db72d734' // token
}
const mutations = {
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
