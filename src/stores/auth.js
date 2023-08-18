import { defineStore } from 'pinia'
import { postFetchApi } from '@/utils/fetch'
import { API_PREFIX } from '@/consts/api'
import { toast } from '@/utils/ui'
import { useUserStore } from '@/stores/user'

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: JSON.parse(localStorage.getItem(TOKEN_KEY)) ?? null
  }),
  getters: {
    isLogged: (state) => state.token !== null
  },
  actions: {
    getToken () {
      return JSON.parse(localStorage.getItem(TOKEN_KEY))
    },
    saveToken (token) {
      this.token = JSON.stringify(token)
      localStorage.setItem(TOKEN_KEY, this.token)
    },
    doLogin (credentials) {
      return postFetchApi({ path: API_PREFIX + 'login' }, { body: credentials })
        .then((response) => {
          this.saveToken(response)
          toast.positive('Bienvenue')
        })
        .then(() => {
          const userStore = useUserStore()
          userStore.doFetchUser()
        })
    },
    doRefreshToken (token) {
      if (!token) {
        throw new Error('Vous devez vous reconnecter')
      }
      return postFetchApi({ path: API_PREFIX + 'token/refresh' }, { body: { refresh_token: token.refresh_token } })
        .then((response) => {
          console.log('doRefresh', response)
        })
    },
    doLogout () {
      this.token = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
      this.$router.push({ name: 'login' })
    }
  }
})
