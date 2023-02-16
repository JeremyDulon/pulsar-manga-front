import * as actionTypes from './action-types'
import { USER_FETCH } from '@/store/modules/user/action-types'

export default {
  [actionTypes.REFRESH_DATA]: async ({ state, dispatch, commit }) => {
    if (state.user.token === null) return Promise.reject()
    await dispatch('user/' + USER_FETCH)
  }
}
