/*
export function someGetter (state) {
}
*/

export const getFavorites = (state) => {
  return state.favorites
}

export const getFavorite = (state, favorites) => (id) => {
  return _.find(favorites, (_m) => _m.id === id)
}
