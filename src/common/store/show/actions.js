import { fetchApi } from '@/utils/fetch'

export const retrieveCommon = (
  { commit },
  { id, ep, params }
) => {
  return fetchApi({ id }, { params })
    .then((data) => {
      commit('listSetItems', data['hydra:member'])
    })
}
