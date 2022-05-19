export default {
  isLogged: (state) => {
    return state.token !== null
  },
  /**
   * Récupère le token
   * @param state
   * @returns {null|Object}
   */
  token: (state) => state.token,
  isAdmin: (state) => state.user && state.user.roles && state.user.roles.includes('ROLE_ADMIN'),
  getFavorite: (state) => (slug) => {
    return state.user && state.user.favorites.find(favorite => favorite.slug === slug)
  }
}
