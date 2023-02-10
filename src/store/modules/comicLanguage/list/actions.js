import { API_PREFIX } from '@/consts/api'
import { fetchApi } from '@/utils/fetch'

export default function () {
  const retrieveListItems = (context, options = {}) => {
    return fetchApi({ path: API_PREFIX + 'comics' }, { params: options && options.params })
      .then((data) => {
        context.commit('listSetItems', data['hydra:member'])
        context.commit('listSetTotalItems', data['hydra:totalItems'])
      })
  }

  return { retrieveListItems }
}
