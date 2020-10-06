export default {
  isLogged: (state) => {
    console.log(state)
    return state.authToken !== null && state.user.enabled
  }
}
