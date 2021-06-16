import { createStore } from 'vuex'

import { setItem } from '../utils/storage'

export default createStore({
  state: {
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    updateToken(state, newToken) {
      state.token = newToken

      setItem('token', newToken)
    }
  },
  actions: {},
  modules: {}
})
