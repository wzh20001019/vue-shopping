import { createStore } from 'vuex'

import { setItem, getItem } from '../utils/storage'

export default createStore({
  state: {
    token: getItem('token') || '',
    total: getItem('total') || 0
  },
  mutations: {
    updateToken(state, newToken) {
      state.token = newToken

      setItem('token', newToken)
    },

    updateTotal(state, newTotal) {
      state.total = newTotal

      setItem('total', newTotal)
    }
  },
  actions: {},
  modules: {}
})
