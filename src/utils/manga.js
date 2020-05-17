import { getMangaList } from '@/utils/api'
import { CDN_BASE_URL } from '@/consts/api'

export async function getFilteredList (filterFn = () => { return true }, sortFn = ['h'], order = ['asc']) {
  let mangaResult = await getMangaList()
  let filteredList = this._.filter(mangaResult.manga, filterFn)
  return this._.orderBy(filteredList, sortFn, order)
}

export const getMangaImgUrl = (img) => {
  return img ? CDN_BASE_URL + img : ''
}
