import { fetchApi } from '@/utils/fetch'
import { API_PREFIX } from '@/consts/api'

export const retrieveUserFavorites = (context, options = {}) => {
  let userId = context.rootState.user.user['@id']
  return fetchApi({ path: API_PREFIX + 'user_comic_languages' }, { params: { user: userId, ...options.params } })
    .then((data) => {
      context.commit('listSetItems', data['hydra:member'])
      context.commit('listSetTotalItems', data['hydra:totalItems'])
    })
}

export const setUserFavorite = (context, options = {}) => {
  let body = {
    comicLanguage: options.body.comicLanguage,
    user: context.rootState.user.user['@id'],
    favorite: options.body.favorite,
    lastPage: options.body.lastPage,
    lastComicIssue: options.body.lastComicIssue
  }
  let method = 'POST'
  let endpoint = API_PREFIX + 'user_comic_languages'
  let userComicLanguage = context.rootGetters['user/comicLanguage/item']
  if (userComicLanguage) {
    method = 'PUT'
    endpoint = userComicLanguage['@id']
  }
  let headers = new Headers()
  headers.set('Content-Type', 'application/json')
  return fetchApi({ path: endpoint }, {
    method: method,
    body: JSON.stringify(body),
    headers
  })
    .then((data) => {
      context.commit('showSetItem', data)
    })
}
