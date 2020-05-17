import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutations'
import getters from '@/store/getters'
import localStoragePlugin from '@/store/plugins/localStoragePlugin'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    CONSTS: {
      mangaCategories: []
    }
  },
  mutations,
  getters,
  plugins: [localStoragePlugin]
})

if (module.hot) {
  module.hot.accept(['./mutations', './getters'], () => {
    const mutations = require('./mutations').default
    const getters = require('./getters').default
    store.hotUpdate({
      mutations,
      getters
    })
  })
}

export default store
