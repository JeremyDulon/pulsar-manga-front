import { getFavorites, getComicList } from '@/utils/_api'

export async function getFilteredList (filterFn = () => { return true }, sortFn = ['h'], order = ['asc']) {
  let comicResult = await getComicList()
  let filteredList = this._.filter(comicResult, filterFn)
  return this._.orderBy(filteredList, sortFn, order)
}

export async function getFavoritesList () {
  return getFavorites()
}
