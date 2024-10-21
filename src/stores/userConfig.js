import { defineStore } from 'pinia'

export const USER_CONFIG_KEY = 'read_mode'
export const ISSUES_SORT_DESC = 'issue_sort_desc'

export const useUserConfigStore = defineStore('userConfig', {
  state: () => ({
    readMode: JSON.parse(localStorage.getItem(USER_CONFIG_KEY)) ?? { direction: 'ltr', mode: 'auto' },
    issuesSortDesc: JSON.parse(localStorage.getItem(ISSUES_SORT_DESC)) ?? false
  })
})
