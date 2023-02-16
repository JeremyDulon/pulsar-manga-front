import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import * as mutations from './mutations'
import modules from './modules'

export default {
  namespaced: true,
  state,
  actions: actions,
  getters: getters,
  mutations: mutations,
  modules
}
