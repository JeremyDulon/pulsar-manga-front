import { API_PREFIX } from '@/consts/api'
import { fetchApi } from '@/utils/fetch'

export const getItem = (context, options) => {
  return fetchApi({ path: API_PREFIX + 'comic_issues/' + options.id }, { params: options.params })
    .then((data) => {
      context.commit('showSetItem', data)
    })
}
