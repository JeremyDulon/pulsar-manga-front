import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import * as mutations from './mutations'
import modules from './modules'

export default {
  namespaced: true,
  actions: actions,
  getters: getters,
  state,
  mutations,
  modules
}
