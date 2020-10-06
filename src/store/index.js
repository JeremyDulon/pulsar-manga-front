import Vue from 'vue'
import Vuex from 'vuex'
import localStoragePlugin, { getDefaultState } from '@/store/plugins/localStoragePlugin'
import modules from './modules'

// we first import the module
Vue.use(Vuex)

export default function (/* { ssrContext } */) {
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

  /*
    if we want some HMR magic for it, we handle
    the hot update like below. Notice we guard this
    code with "process.env.DEV" -- so this doesn't
    get into our production build (and it shouldn't).
  */

  if (module.hot) {
    module.hot.accept(['./modules'], () => {
      const modules = require('./modules').default
      Store.hotUpdate({ modules })
    })
  }
  return Store
}
