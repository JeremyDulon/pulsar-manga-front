import { API_PREFIX } from '@/consts/api'
import { fetchApi } from '@/utils/fetch'

export const getItem = (context, options) => {
  return fetchApi({ path: API_PREFIX + 'comics/' + options.id }, { params: options.params })
    .then((data) => {
      context.commit('showSetItem', data)
    })
}

export const retrieveListItems = (context, options = {}) => {
  return fetchApi({ path: API_PREFIX + 'comics' }, { params: options && options.params })
    .then((data) => {
      context.commit('listSetItems', data['hydra:member'])
      context.commit('listSetTotalItems', data['hydra:totalItems'])
    })
}
