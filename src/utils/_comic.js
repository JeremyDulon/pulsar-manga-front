import { getFavorites, getComicList } from '@/utils/_api'
import _ from 'lodash'

export async function getFilteredList (filterFn = () => { return true }, sortFn = ['h'], order = ['asc']) {
  let comicResult = await getComicList()
  let filteredList = _.filter(comicResult, filterFn)
  return _.orderBy(filteredList, sortFn, order)
}

export async function getFavoritesList () {
  return getFavorites()
}
