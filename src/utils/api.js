import network from '@/utils/network'

const LIST_URL = 'list'
const MANGA_URL = 'manga'
const CHAPTER_URL = 'chapter'
const LANGUAGE_URL = '0'

export const getMangaList = async () => {
  const r = await network.get(`${LIST_URL}/${LANGUAGE_URL}`)
  return r.data
}

export const getManga = async (id) => {
  const r = await network.get(`${MANGA_URL}/${id}`)
  return r.data
}

export const getChapter = async (id) => {
  const r = await network.get(`${CHAPTER_URL}/${id}`)
  return r.data
}
