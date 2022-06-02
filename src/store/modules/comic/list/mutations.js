export default () => ({
  listSetItems (state, items) {
    Object.assign(state, { items })
  },
  listSetTotalItems (state, totalItems) {
    Object.assign(state, { totalItems })
  }
})
