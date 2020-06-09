/*
export function someGetter (state) {
}
*/

export const getFavorites = (state) => {
  return state.favorites
}

export const getFavorite = (state) => (id) => {
  return _.find(state.favorites, (_m) => _m === id)
}
