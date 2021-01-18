import network from '@/utils/network'
import { API_ROUTE } from '@/consts/api'

export const FAVORITES_URL = 'favorites'
export const MANGA_URL = 'manga'
export const CHAPTER_URL = 'chapter'
export const SOURCE_URL = 'source'
export const READ_URL = 'read'
export const PAGE_URL = 'page'

export const getMangaList = async () => {
  const r = await network.get(apiUrl(`${MANGA_URL}s`))
  return r.data
}

export const getManga = async (slug) => {
  const r = await network.get(apiUrl(`${MANGA_URL}/${slug}`))
  return r.data.manga
}

export const getChapter = async (id) => {
  const r = await network.get(apiUrl(`${CHAPTER_URL}/${id}`))
  return r.data.chapter
}

export const getFavorites = async () => {
  const r = await network.get(apiUrl(`${FAVORITES_URL}/`))
  return r.data
}

// ADMIN FUNCTIONS
export const addSource = async (params) => {
  const r = await network.post(apiUrl(`${SOURCE_URL}/add`), params)
  return r.data
}

export const apiUrl = (url) => {
  return `${API_ROUTE}${url}`
}
