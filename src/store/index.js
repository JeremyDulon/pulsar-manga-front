import Vue from 'vue'
import Vuex from 'vuex'
import localStoragePlugin, { getDefaultState } from '@/store/plugins/localStoragePlugin'

// we first import the module
import favorites from './favorites'
import userConfig from './userConfig'

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
    modules: {
      // then we reference it
      favorites,
      userConfig
    },

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
    module.hot.accept(['./favorites', './userConfig'], () => {
      const newFavorites = require('./favorites').default
      const newuserconfig = require('./userConfig').default
      Store.hotUpdate({ modules: {
        favorites: newFavorites,
        userConfig: newuserconfig
      } })
    })
  }
  return Store
}
