import { fetchApi } from '@/utils/fetch'

export const getCommonList = (
  { commit },
  { id, ep, params }
) => {
  return fetchApi({ id }, { params })
    .then((data) => {
      commit('listSetItems', data['hydra:member'])
      commit('listSetTotalItems', data['hydra:totalItems'])
      return data
    })
}
