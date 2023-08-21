import { defineStore } from 'pinia'

export const USER_CONFIG_KEY = 'read_mode'

export const useUserConfigStore = defineStore('userConfig', {
  state: () => ({
    readMode: JSON.parse(localStorage.getItem(USER_CONFIG_KEY)) ?? 'ltr'
  })
})
