// import Vue from 'vue'
// export const showSetItem = (state, item) => {
//   let items = state.items
//   let index = items.findIndex((stateItem) => item.id === stateItem.id)
//   items[index] = item
//   console.log('mutations ' + items[0].favorite)
//   Vue.set(state, 'items', items)
//   console.log('state after mutation ' + state.items[0].favorite)
// }
export const showSetItem = (state, newItem) => {
  let oldItem = state.items.find(stateItem => stateItem.comicLanguage === newItem.comicLanguage)
  if (oldItem) {
    Object.assign(state, { item: newItem })
  }
  let stateItems = state.items
  let index = stateItems.findIndex((stateItem) => newItem.comicLanguage === stateItem.comicLanguage)
  stateItems[index] = newItem
  Object.assign(state, { items: stateItems })
}

export const listSetItems = (state, items) => {
  Object.assign(state, { items })
  let oldItem = state.item
  let newItem = state.items.find(stateItem => stateItem.comicLanguage === oldItem.comicLanguage)
  if (newItem) {
    Object.assign(state, { item: newItem })
  }
}
export const listSetTotalItems = (state, totalItems) => Object.assign(state, { totalItems })
