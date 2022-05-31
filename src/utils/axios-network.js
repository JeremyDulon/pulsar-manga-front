import axios from 'axios'
import { API_BASE_URL } from '@/consts/api'
import store from '@/store'
import { toast } from '@/utils/ui'
import { USER_LOGOUT, USER_TOKEN_REFRESH } from '@/store/modules/user/action-types'
import _ from 'lodash'

const network = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/ld+json'
  }
})

network.interceptors.request.use((config) => {
  const token = store.getters['user/token']
  if (token) {
    config.headers.Authorization = `Bearer ${token.token}`
  }
  return config
})

const handleApiResponse = (response) => {
  console.log(response)
  if (response.ok) console.log('yo')

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

  return response
}

const handleApiError = async (error) => {
  if (error.response &&
      error.response.status === 401) {
    if (error.response.config.url === 'api/token/refresh') {
      debouncedLogout()
      return
    }

    try {
      await store.dispatch('user/' + USER_TOKEN_REFRESH).catch(e => console.log(e))
      return network(error.config)
    } catch (e) {
      debouncedLogout()
    }
  }
  if (error.response) {
    handleApiResponse(error.response)
  }
  return Promise.reject(error)
}

network.interceptors.response.use((response) => handleApiResponse(response), async (error) => handleApiError(error))

const debouncedLogout = _.debounce(async () => {
  toast.negative('Veuillez vous réauthentifier')
  await store.dispatch('user/' + USER_LOGOUT)
}, 500)

export default network
