import { API_ENTRYPOINT } from '@/consts/api'
import { toast } from '@/utils/ui'
import _ from 'lodash'
import SubmissionError from '@/error/SubmissionError'
import { useAuthStore } from '@/stores/auth'

const MIME_TYPE = 'application/ld+json'

const makeParamArray = (key, arr) =>
  arr.map((val) => `${key}[]=${val}`).join('&')

const debouncedLogout = _.debounce(async () => {
  const authStore = useAuthStore()
  toast.negative('Veuillez vous réauthentifier')
  authStore.doLogout()
}, 500)

export const fetchApi = function ({ path, resource }, options = {}) {
  if (typeof options.headers === 'undefined') {
    Object.assign(options, { headers: new Headers() })
  }

  if (options.headers.get('Accept') === null) {
    options.headers.set('Accept', MIME_TYPE)
  }

  // Inutile pour le moment
  if (
    options.body !== undefined &&
    !(options.body instanceof FormData) &&
    options.headers.get('Content-Type') === null
  ) {
    options.headers.set('Content-Type', MIME_TYPE)
  }

  if (options.params) {
    let queryString = Object.keys(options.params)
      .map((key) =>
        Array.isArray(options.params[key])
          ? makeParamArray(key, options.params[key])
          : `${key}=${options.params[key]}`
      )
      .join('&')
    path = `${path}?${queryString}`
  }

  // enable CORS for all requests
  Object.assign(options, {
    mode: 'cors'
    // credentials: 'include', // when credentials needed
  })

  const authStore = useAuthStore()
  let token = authStore.getToken()
  if (token && token.token) {
    options.headers.set('Authorization', `Bearer ${token.token}`)
  }

  const entryPoint = API_ENTRYPOINT + (API_ENTRYPOINT.endsWith('/') ? '' : '/')

  const url = new URL(path, entryPoint)

  return fetch(url, options).then((response) => {
    if (!response.ok) return handleFetchError(url, response)

    if (response.ok) return response.json()

    return response.json().then((json) => {
      const error = json['hydra:description']
        ? json['hydra:description']
        : response.statusText
      if (!json.violations) throw Error(error)

      const errors = { _error: error }
      json.violations.map((violation) =>
        Object.assign(errors, { [violation.propertyPath]: violation.message })
      )

      throw new SubmissionError(errors)
    })
  })
}

export const fetchCollectionApi = function ({ path, resource }, options = {}) {
  return fetchApi({ path, resource }, options).then((r) => r['hydra:member'])
}

export const postFetchApi = function ({ path, resource }, options = { body: {} }) {
  return fetchApi({ path, resource }, { ...options, method: 'POST', body: JSON.stringify(options.body) })
}

const handleFetchError = async (url, response) => {
  if (response.status === 401 && url.pathname === '/api/token/refresh') {
    debouncedLogout()
    throw new Error('Refresh Token expired')
  }

  const authStore = useAuthStore()
  const token = authStore.token
  if (response.status === 401 && token && token.refresh_token) {
    authStore.doRefreshToken(token).catch(() => debouncedLogout())
    throw new Error('Token expired')
  }

  if (response.status >= 400) {
    toast.negative(response.statusText)
    throw new Error(response.statusText)
  }
}
