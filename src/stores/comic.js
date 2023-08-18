import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/fetch'
import { API_PREFIX } from '@/consts/api'

export const useComicStore = defineStore('comic', {
  state: () => ({
    item: null,
    list: []
  }),
  actions: {
    doFetchComicLanguage (options = {}) {
      return fetchApi({ path: API_PREFIX + 'comic_languages/' + options.id }, { params: options.params })
        .then((data) => {
          this.item = data
        })
    },
    doFetchComicLanguageList (options = {}) {
      return fetchApi({ path: API_PREFIX + 'comic_languages' }, { params: options.params })
        .then((data) => {
          this.list = data['hydra:member']
        })
    }
  }
})
