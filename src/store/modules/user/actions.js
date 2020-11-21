import * as actionTypes from './action-types'
import * as mutationTypes from './mutation-types'
import network from '@/utils/network'
import router from '@/router'

let refreshRequest = null

export default {
  [actionTypes.USER_LOGIN]: async ({ commit, dispatch }, payload) => {
    const r = await network.post('oauth/v2/token', {
      grant_type: 'password',
      client_id: '1_5w8zrdasdafr4tregd454cw0c0kswcgs0oks40s',
      client_secret: 'sdgggskokererg4232404gc4csdgfdsgf8s8ck5s',
      ...payload
    })
    commit(mutationTypes.USER_SET_TOKEN, r.data)
    commit(mutationTypes.USER_ADD_PREV_LOGIN, payload)
    await dispatch(actionTypes.USER_FETCH).then(() => {
      router.push('/')
    })
  },
  [actionTypes.USER_TOKEN_REFRESH]: async ({ commit, getters: { authToken } }) => {
    if (!authToken) {
      throw new Error('Vous devez vous reconnecter')
    }
    if (refreshRequest) {
      await refreshRequest
    } else {
      refreshRequest = network.post('oauth/v2/token', {
        grant_type: 'refresh_token',
        client_id: '1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4',
        client_secret: '4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k',
        refresh_token: authToken.refresh_token
      })
      try {
        const r = await refreshRequest
        commit(mutationTypes.USER_SET_TOKEN, r.data)
        refreshRequest = null
      } catch (e) {
        refreshRequest = null
        throw new Error(`Échec du rafraîchissement du token...`)
      }
    }
  },

  [actionTypes.USER_FETCH]: async ({ commit, dispatch }) => {
    const r = await network.get('api/user')
    commit(mutationTypes.USER_SET_USER, r.data)
  },
  [actionTypes.USER_LOGOUT]: async ({ commit }) => {
    commit(mutationTypes.USER_SET_USER, null)
    commit(mutationTypes.USER_SET_TOKEN, null)
    await router.push({ name: 'login' })
  }
}
