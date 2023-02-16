import * as actionTypes from './action-types'
import * as mutationTypes from './mutation-types'
import router from '@/router'
import { fetchApi, postFetchApi } from '@/utils/fetch'
import { toast } from '@/utils/ui'
import { API_PREFIX } from '@/consts/api'

export default {
  [actionTypes.USER_LOGIN]: async ({ commit, dispatch }, payload) => {
    postFetchApi({ path: API_PREFIX + 'login' }, { body: payload }).then(async (res) => {
      commit(mutationTypes.USER_SET_TOKEN, res)
      commit(mutationTypes.USER_ADD_PREV_LOGIN, payload)
      await dispatch(actionTypes.USER_FETCH).then(() => {
        toast.positive('Bienvenue')
        router.push('/')
      })
    })
  },
  [actionTypes.USER_TOKEN_REFRESH]: async ({ commit, getters: { token } }) => {
    if (!token) {
      throw new Error('Vous devez vous reconnecter')
    }
    postFetchApi({ path: API_PREFIX + 'token/refresh' }, { body: { refresh_token: token.refresh_token } }).then((res) => {
      commit(mutationTypes.USER_SET_TOKEN, res)
    })
  },
  [actionTypes.USER_FETCH]: async ({ commit, dispatch }) => {
    fetchApi({ path: API_PREFIX + 'me' }).then((data) => {
      commit(mutationTypes.USER_SET_USER, data)
    }).then(() => {
      dispatch('comicLanguage/retrieveUserFavorites')
    })
  },
  [actionTypes.USER_LOGOUT]: async ({ commit }) => {
    commit(mutationTypes.USER_SET_USER, null)
    commit(mutationTypes.USER_SET_TOKEN, null)
    await router.push({ name: 'login' })
  },
  [actionTypes.USER_ADD_FAVORITE]: async ({ commit }, mangaData) => {
    alert('todo USER_ADD_FAVORITE')
    // const r = await network.put('api/favorites/add/' + mangaData)
    // commit(mutationTypes.USER_SET_USER, r.data)
  },
  [actionTypes.USER_READ_CHAPTER]: async ({ commit }, chapterData) => {
    alert('todo USER_READ_CHAPTER')
    // const r = await network.put('api/read/chapter/' + chapterData)
    // Besoin de mutation ?
    // console.log(r.data)
  },
  [actionTypes.USER_READ_PAGE]: async ({ commit }, chapterData) => {
    alert('todo USER_READ_PAGE')
    // const r = await network.put(apiUrl(`${READ_URL}/${CHAPTER_URL}/${chapterData.chapter}/${PAGE_URL}/${chapterData.page}`))
    // commit(mutationTypes.USER_SET_USER, r.data)
  }
}
