export default {
  isLogged: (state) => {
    return state.authToken !== null
  },
  /**
   * Récupère le token
   * @param state
   * @returns {null|Object}
   */
  authToken: (state) => state.authToken,
  isAdmin: (state) => state.user && state.user.roles && state.user.roles.includes('ROLE_ADMIN'),
  getFavorite: (state) => (slug) => {
    return state.user && state.user.favorites.find(favorite => favorite.slug === slug)
  }
}
