import { defineStore } from 'pinia'

export const USER_CONFIG_KEY = 'user_config'

const defaultSettings = {
  vertical: false,
  read: 'ltr'
}

export const useUserConfigStore = defineStore('userConfig', {
  state: () => ({
    readSettings: JSON.parse(localStorage.getItem(USER_CONFIG_KEY)) ?? defaultSettings
  })
})
