// TODO: Passer sur des store

// import fetch from '@/utils/fetch'
import { API_ROUTE } from '@/consts/api'
import { getCommonList } from '@/common/store/list/actions'

export const FAVORITES_URL = 'favorites'
export const COMIC_URI = 'comics'
export const COMIC_ISSUE_URL = 'comic_issues'
export const SOURCE_URL = 'source'
export const READ_URL = 'read'
export const PAGE_URL = 'page'

export const getComicList = (context, options) => {
  return getCommonList(
    context,
    { ...{ id: COMIC_URI, params: {} }, ...options }
  )
}

export const getComic = async (slug) => {
  // const r = await network.get(apiUrl(`${COMIC_URL}/${slug}`))
  // return r.data.manga
}

export const getComicIssue = async (id) => {
  // const r = await network.get(apiUrl(`${COMIC_ISSUE_URL}/${id}`))
  // return r.data.chapter
}

export const getFavorites = async () => {
  // const r = await network.get(apiUrl(`${FAVORITES_URL}`))
  // return r.data
}

// ADMIN FUNCTIONS
export const addSource = async (params) => {
  // const r = await network.post(apiUrl(`${SOURCE_URL}/add`), params)
  // return r.data
}

export const apiUrl = (url) => {
  return `${API_ROUTE}${url}`
}
