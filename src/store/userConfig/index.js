import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import { getDefaultState } from '@/store/plugins/localStoragePlugin'

export default {
  namespaced: true,
  state: getDefaultState(
    'userConfig',
    {
      vertical: false,
      read: 'rtl'
    }
  ),
  getters,
  mutations,
  actions
}
