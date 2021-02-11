import Vue from 'vue'
import Vuex from 'vuex'
import localStoragePlugin, { getDefaultState } from '@/store/plugins/localStoragePlugin'
import modules from './modules'
import actions from '@/store/actions'

// we first import the module
Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    userConfig: getDefaultState(
      'userConfig',
      {
        vertical: false,
        read: 'rtl'
      }
    )
  },
  actions,
  modules,
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV,
  plugins: [localStoragePlugin]
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
