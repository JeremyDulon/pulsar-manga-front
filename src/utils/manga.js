import { getFavorites, getMangaList } from '@/utils/api'

export async function getFilteredList (filterFn = () => { return true }, sortFn = ['h'], order = ['asc']) {
  let mangaResult = await getMangaList()
  let filteredList = this._.filter(mangaResult, filterFn)
  return this._.orderBy(filteredList, sortFn, order)
}

export async function getFavoritesList () {
  return getFavorites()
}
