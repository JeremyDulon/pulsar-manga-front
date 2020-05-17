import * as mutationTypes from './mutation-types'

export default {
  [mutationTypes.MANGA_ADD_FAVORITE]: (state, manga) => {
    const favorites = state.favorites
    const i = favorites.findIndex((m) => m.i === manga.i)
    if (i === -1) {
      favorites.push(manga)
    } else {
      favorites.splice(i, 1, manga)
    }
  }
}
