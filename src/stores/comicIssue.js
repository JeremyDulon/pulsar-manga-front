import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/fetch'
import { API_PREFIX } from '@/consts/api'

export const useComicIssueStore = defineStore('comicIssue', {
  state: () => ({
    item: null
  }),
  actions: {
    doFetchComicIssue (options = {}) {
      return fetchApi({ path: API_PREFIX + 'comic_issues/' + options.id }, { params: options.params })
        .then((data) => {
          this.item = data
        })
    }
  }
})
