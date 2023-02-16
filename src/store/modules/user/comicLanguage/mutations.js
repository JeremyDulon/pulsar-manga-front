// import Vue from 'vue'
// export const showSetItem = (state, item) => {
//   let items = state.items
//   let index = items.findIndex((stateItem) => item.id === stateItem.id)
//   items[index] = item
//   console.log('mutations ' + items[0].favorite)
//   Vue.set(state, 'items', items)
//   console.log('state after mutation ' + state.items[0].favorite)
// }
export const showSetItem = (state, item) => Object.assign(state, { item })
export const listSetItems = (state, items) => Object.assign(state, { items })
export const listSetTotalItems = (state, totalItems) => Object.assign(state, { totalItems })
