import { API_PREFIX } from '@/consts/api'
import { fetchApi } from '@/utils/fetch'

export const retrieveListItems = (context, options = {}) => {
  return fetchApi({ path: API_PREFIX + 'comic_languages' }, { params: options && options.params })
    .then((data) => {
      context.commit('listSetItems', data['hydra:member'])
      context.commit('listSetTotalItems', data['hydra:totalItems'])
    })
}

export const getItem = (context, options) => {
  return fetchApi({ path: API_PREFIX + 'comic_languages/' + options.id }, { params: options.params })
    .then((data) => {
      context.commit('showSetItem', data)
    })
}