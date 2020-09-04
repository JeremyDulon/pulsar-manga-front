import network from '@/utils/network'

const MANGA_URL = 'manga'
const CHAPTER_URL = 'chapter'

export const getMangaList = async () => {
  const r = await network.get(`${MANGA_URL}s`)
  return r.data
}

export const getManga = async (slug) => {
  const r = await network.get(`${MANGA_URL}/${slug}`)
  return r.data.manga
}

export const getChapter = async (id) => {
  const r = await network.get(`${CHAPTER_URL}/${id}`)
  return r.data.chapter
}
