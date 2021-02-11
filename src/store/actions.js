import * as actionTypes from './action-types'
import { USER_FETCH } from '@/store/modules/user/action-types'

export default {
  [actionTypes.REFRESH_DATA]: async ({ state, dispatch, commit }) => {
    if (state.user.authToken === null) return
    await dispatch('user/' + USER_FETCH)
  }
}
