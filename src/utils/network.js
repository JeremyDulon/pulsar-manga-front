import axios from 'axios'
import { API_BASE_URL } from '@/consts/api'
import store from '@/store'
import { toast } from '@/utils/ui'
import { USER_LOGOUT, USER_TOKEN_REFRESH } from '@/store/modules/user/action-types'

const network = axios.create({
  baseURL: API_BASE_URL
})

network.interceptors.request.use((config) => {
  const t = store.getters['user/authToken']
  if (t) {
    config.headers.Authorization = `Bearer ${t.access_token}`
  }
  return config
})

const handleApiError = (response) => {
  if (response.status === 503) {
    toast.warning('Serveur en maintenance')
  }
  const error = _.get(response, ['data', 'detail'])
  if (error) {
    const message = error.message || error
    if (error.code !== 0 || response.status >= 400) {
      toast.negative(message)
      throw new Error(message)
    }
  }
}

network.interceptors.response
  .use(
    (response) => {
      handleApiError(response)
      return response
    },
    async (error) => {
      if (error.response &&
        error.response.status === 401 &&
        error.response.data &&
        error.response.data.error === 'invalid_grant') {
        try {
          await store.dispatch('user/' + USER_TOKEN_REFRESH)
          return network(error.config)
        } catch (e) {
          debouncedLogout()
        }
      }
      if (error.response) {
        handleApiError(error.response)
      }
      return Promise.reject(error)
    }
  )

const debouncedLogout = _.debounce(async () => {
  toast.negative('Veuillez vous réauthentifier')
  await store.dispatch('user/' + USER_LOGOUT)
}, 500)

export default network
