import { getMangaList } from '@/utils/api'

export async function getFilteredList (filterFn = () => { return true }, sortFn = ['h'], order = ['asc']) {
  let mangaResult = await getMangaList()
  let filteredList = this._.filter(mangaResult.manga, filterFn)
  return this._.orderBy(filteredList, sortFn, order)
}
