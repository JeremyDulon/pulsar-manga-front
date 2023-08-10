import { defineStore } from 'pinia'
import { postFetchApi } from '@/utils/fetch'
import { API_PREFIX } from '@/consts/api'
import { toast } from '@/utils/ui'

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: JSON.parse(localStorage.getItem(TOKEN_KEY))
  }),
  getters: {
    isLogged: (state) => state.token !== null
  },
  actions: {
    getToken () {
      return localStorage.getItem(TOKEN_KEY)
    },
    saveToken (token) {
      this.token = JSON.stringify(token)
      localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
    },
    doLogin (credentials) {
      return postFetchApi({ path: API_PREFIX + 'login' }, { body: credentials })
        .then((response) => {
          this.saveToken(response)
          toast.positive('Bienvenue')
        })
        .catch((err) => err)
    },
    doRefreshToken (token) {
      if (!token) {
        throw new Error('Vous devez vous reconnecter')
      }
      postFetchApi({ path: API_PREFIX + 'token/refresh' }, { body: { refresh_token: token.refresh_token } })
        .then((response) => {
          console.log(response)
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
