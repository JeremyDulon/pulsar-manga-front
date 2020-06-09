/*
export function someMutation (state) {
}
*/

export const addFavorite = (state, manga) => {
  let index = _.findIndex(state.favorites, (_m) => _m === manga.id)
  if (index === -1) {
    state.favorites.push(manga.id)
  } else {
    state.favorites.splice(index, 1)
  }
}
