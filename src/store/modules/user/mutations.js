import * as mutationTypes from './mutation-types'

export default {
  [mutationTypes.USER_SET_TOKEN]: (state, token) => {
    state.authToken = token
  },
  [mutationTypes.USER_SET_USER]: (state, user) => {
    state.utilisateur = user
  },
  [mutationTypes.USER_ADD_PREV_LOGIN]: (state, { username }) => {
    if (state.prevLogin.indexOf(username) === -1) {
      state.prevLogin.push(username)
    }
  }
}
