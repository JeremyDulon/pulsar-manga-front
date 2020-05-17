export default {
  favorites: (state) => {
    console.log(state)
    return state.favorites || []
  }
}
