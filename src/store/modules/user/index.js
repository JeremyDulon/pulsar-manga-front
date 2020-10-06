import getters from '@/store/modules/user/getters'
import actions from '@/store/modules/user/actions'
import mutations from '@/store/modules/user/mutations'
import { getDefaultState } from '@/store/plugins/localStoragePlugin'

export default {
  namespaced: true,
  state: () => {
    const { agency, ...userState } = getDefaultState(
      'user',
      {
        user: {},
        authToken: null,
        prevLogin: []
      }
    )
    return userState
  },
  actions,
  mutations,
  getters
}
