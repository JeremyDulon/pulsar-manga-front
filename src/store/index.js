import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import actions from '@/store/actions'
import createPersistedState from 'vuex-persistedstate'
import { STORAGE_KEY } from '@/consts/app'

// we first import the module
Vue.use(Vuex)

const userState = createPersistedState({
  key: STORAGE_KEY,
  paths: ['user', 'userConfig']
})

const Store = new Vuex.Store({
  actions,
  modules,
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV,
  plugins: [userState]
})

if (module.hot) {
  module.hot.accept(['./actions', './modules'], () => {
    const actions = require('./actions').default
    const modules = require('./modules').default
    Store.hotUpdate({
      actions,
      modules
    })
  })
}

export default Store
