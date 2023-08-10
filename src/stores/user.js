import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/fetch'
import { API_PREFIX } from '@/consts/api'
// import { toast } from '@/utils/ui'

const USER_KEY = 'user'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem(USER_KEY))
  }),
  actions: {
    saveUser (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    },
    doFetchUser () {
      fetchApi({ path: API_PREFIX + 'me' }).then((data) => {
        this.saveUser(data)
      })
    }
  }
})
