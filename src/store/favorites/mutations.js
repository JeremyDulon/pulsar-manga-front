/*
export function someMutation (state) {
}
*/

export const addFavorite = (state, manga) => {
  let index = _.findIndex(state.favorites, (_m) => _m.id === manga.id)
  if (!index) {
    state.favorites.push(manga)
  } else {
    state.favorites.splice(index, 1)
  }
}
