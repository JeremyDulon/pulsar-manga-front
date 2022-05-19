import * as actionTypes from './action-types'
import * as mutationTypes from './mutation-types'
import network from '@/utils/network'
import router from '@/router'
import { apiUrl, CHAPTER_URL, PAGE_URL, READ_URL } from '@/utils/api'

export default {
  [actionTypes.USER_LOGIN]: async ({ commit, dispatch }, payload) => {
    await network.post('api/login', {
      ...payload
    }).then(async (res) => {
      commit(mutationTypes.USER_SET_TOKEN, res.data)
      commit(mutationTypes.USER_ADD_PREV_LOGIN, payload)
      await dispatch(actionTypes.USER_FETCH).then(() => {
        router.push('/')
      })
    })
  },
  [actionTypes.USER_TOKEN_REFRESH]: async ({ commit, getters: { token } }) => {
    if (!token) {
      throw new Error('Vous devez vous reconnecter')
    }
    await network.post('api/token/refresh', {
      refresh_token: token.refresh_token
    }).then(async (res) => {
      alert(JSON.stringify(res.data))
      commit(mutationTypes.USER_SET_TOKEN, res.data)
    })
  },
  [actionTypes.USER_FETCH]: async ({ commit }) => {
    const r = await network.get('api/me')
    console.log(r)
    commit(mutationTypes.USER_SET_USER, r.data)
  },
  [actionTypes.USER_LOGOUT]: async ({ commit }) => {
    commit(mutationTypes.USER_SET_USER, null)
    commit(mutationTypes.USER_SET_TOKEN, null)
    await router.push({ name: 'login' })
  },
  [actionTypes.USER_ADD_FAVORITE]: async ({ commit }, mangaData) => {
    const r = await network.put('api/favorites/add/' + mangaData)
    commit(mutationTypes.USER_SET_USER, r.data)
  },
  [actionTypes.USER_READ_CHAPTER]: async ({ commit }, chapterData) => {
    const r = await network.put('api/read/chapter/' + chapterData)
    // Besoin de mutation ?
    console.log(r.data)
  },
  [actionTypes.USER_READ_PAGE]: async ({ commit }, chapterData) => {
    const r = await network.put(apiUrl(`${READ_URL}/${CHAPTER_URL}/${chapterData.chapter}/${PAGE_URL}/${chapterData.page}`))
    commit(mutationTypes.USER_SET_USER, r.data)
  }
}
