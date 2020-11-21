import Vue from 'vue'
import Vuex from 'vuex'
import localStoragePlugin, { getDefaultState } from '@/store/plugins/localStoragePlugin'
import modules from './modules'

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
  modules,
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV,
  plugins: [localStoragePlugin]
})

if (module.hot) {
  module.hot.accept(['./modules'], () => {
    const modules = require('./modules').default
    Store.hotUpdate({ modules })
  })
}

export default Store
