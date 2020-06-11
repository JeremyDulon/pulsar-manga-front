import Vue from 'vue'
import Vuex from 'vuex'
import localStoragePlugin from '@/store/plugins/localStoragePlugin'

// we first import the module
import favorites from './favorites'
import userConfig from './userConfig'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
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

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./favorites'], () => {
      const newFavorites = require('./favorites').default
      Store.hotUpdate({ modules: { favorites: newFavorites } })
    })
    module.hot.accept(['./userConfig'], () => {
      const newuserconfig = require('./userConfig').default
      Store.hotUpdate({ modules: { userconfig: newuserconfig } })
    })
  }

  return Store
}
