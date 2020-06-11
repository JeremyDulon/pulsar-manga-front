import { STORAGE_KEY } from '@/consts/app'

const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))

/**
 * Récèpère l'état depuis le local storage s'il est disponible et le merge avec l'état par défaut
 *
 * @param {String} key - La clé du module
 * @param {Object} defaultState - L'état par défaut
 */
export const getDefaultState = (key, defaultState = {}) => {
  return {
    ...defaultState,
    ..._.get(storageState, key, {})
  }
}

/**
 * Plugin de gestion de la sauvegarde dans le local storage
 * @param store
 */
export default store => {
  store.subscribe(({ type }, state) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  })
}
