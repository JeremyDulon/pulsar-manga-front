import * as actionTypes from './action-types'
import * as mutationTypes from './mutation-types'
import network from '@/utils/network'

export default {
  [actionTypes.USER_LOGIN]: async ({ commit, dispatch }, payload) => {
    console.log(payload)
    const r = await network.post('oauth/v2/token', {
      grant_type: 'password',
      client_id: '1_5w8zrdasdafr4tregd454cw0c0kswcgs0oks40s',
      client_secret: 'sdgggskokererg4232404gc4csdgfdsgf8s8ck5s',
      ...payload
    })
    commit(mutationTypes.USER_SET_TOKEN, r.data)
    commit(mutationTypes.USER_ADD_PREV_LOGIN, payload)
    // await dispatch(REFRESH_DATA)
  }
}
