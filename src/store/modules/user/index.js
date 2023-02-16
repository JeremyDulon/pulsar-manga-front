import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import state from './state'
import modules from './modules'

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
  modules
}
