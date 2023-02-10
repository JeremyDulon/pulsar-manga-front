import { API_ENTRYPOINT } from '@/consts/api'
import store from '@/store'
import { toast } from '@/utils/ui'
import { USER_LOGOUT, USER_TOKEN_REFRESH } from '@/store/modules/user/action-types'
import _ from 'lodash'
import SubmissionError from '@/error/SubmissionError'

const MIME_TYPE = 'application/ld+json'

const makeParamArray = (key, arr) =>
  arr.map((val) => `${key}[]=${val}`).join('&')

const debouncedLogout = _.debounce(async () => {
  toast.negative('Veuillez vous réauthentifier')
  await store.dispatch('user/' + USER_LOGOUT)
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

  const token = store.getters['user/token']
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
  return fetchApi({ path, resource }, { method: 'POST', body: JSON.stringify(options.body) })
}

const handleFetchError = async (url, response) => {
  if (response.status === 401 && url.pathname === '/api/token/refresh') {
    debouncedLogout()
    throw new Error('Refresh Token expired')
  }

  const token = store.getters['user/token']
  if (response.status === 401 && token.refresh_token) {
    store.dispatch('user/' + USER_TOKEN_REFRESH).catch(() => debouncedLogout())
    throw new Error('Token expired')
  }

  if (response.status >= 400) {
    toast.negative(response.statusText)
    throw new Error(response.statusText)
  }
}
