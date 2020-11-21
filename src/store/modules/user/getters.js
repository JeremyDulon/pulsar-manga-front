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
  isAdmin: (state) => state.user && state.user.roles && state.user.roles.includes('ROLE_ADMIN')
}
