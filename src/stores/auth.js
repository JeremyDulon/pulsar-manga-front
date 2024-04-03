import { defineStore } from 'pinia'
import { extractJWTData, postFetchApi } from '@/utils/fetch'
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
          let extractedJWT = extractJWTData(response.token)
          response.expiration = extractedJWT.exp
          this.saveToken(response)
          toast.positive({ message: 'Bienvenue', timeout: 200 })
        })
        .then(() => {
          const userStore = useUserStore()
          userStore.doFetchUser()
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
