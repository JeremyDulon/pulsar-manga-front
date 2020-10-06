import { Loading, Notify } from 'quasar'
/**
 * Handler générique pour les traitements long
 * - Affiche un loader
 * - Lance la callback
 * - Masque le loader
 * @param f
 * @param {{message?: string, reject: boolean}} opt
 *  - reject pour récupérer l'erreur
 * @returns {Promise<void>}
 */
export const loadingHandler = async (f, opt = { message: 'Chargement', reject: false }) => {
  Loading.show({
    message: 'Chargement',
    ...opt
  })
  try {
    return await f()
  } catch (e) {
    console.error(e)
    toast.negative({
      message: 'An error has occurred.',
      caption: typeof e === 'string'
        ? e
        : e.message
    })
    return opt.reject
      ? Promise.reject(e)
      : void 0
  } finally {
    Loading.hide()
  }
}

/**
 * Raccourcis pour les notify
 * @type {{
 * positive: function (opt: {}),
 * negative: function (opt: {}),
 * warning: function (opt: {}),
 * info: function (opt: {}),
 * }}
 */
export const toast = {}
;[
  'positive',
  'negative',
  'warning',
  'info'
].forEach((color) => {
  toast[color] = (opt = {}) => {
    const _opt = typeof opt === 'string'
      ? { message: opt }
      : opt
    return Notify.create({
      color,
      ..._opt
    })
  }
})
