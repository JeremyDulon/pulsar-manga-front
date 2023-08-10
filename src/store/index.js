import modules from './modules'
import actions from '@/store/actions'
import createPersistedState from 'vuex-plugin-persistedstate'
import { STORAGE_KEY } from '@/consts/app'

import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

const userState = createPersistedState({
  key: STORAGE_KEY,
  paths: ['user']
})

export default store(function () {
  const Store = createStore({
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

  return Store
})
