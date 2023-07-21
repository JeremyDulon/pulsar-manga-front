export const showSetItem = (state, item) => Object.assign(state, { item })
export const listSetItems = (state, items) => Object.assign(state, { items })
export const listSetTotalItems = (state, totalItems) => Object.assign(state, { totalItems })

export const updateItemFavorite = (state, favoriteState) => {
  let currentItem = state.item
  if (currentItem) {
    currentItem.favorite = favoriteState
    let currentItemIndex = state.items.findIndex(item => item.comicLanguage['@id'] === currentItem.comicLanguage['@id'])
    if (currentItemIndex) {
      let items = state.items
      items[currentItemIndex] = currentItem
      Object.assign(state, { item: currentItem, items: items })
    }
  }
}
