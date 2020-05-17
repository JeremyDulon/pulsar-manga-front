/**
 * Date format ISO
 * @type {string}
 */
export const DATE_ISO = 'YYYY-MM-DD'

/**
 * Année et mois format ISO
 * ex : 2019-10
 * @type {string}
 */
export const DATE_ISO_YEAR_MONTH = 'YYYY-MM'

/**
 * Heure format ISO
 * @type {string}
 */
export const TIME = 'HH:mm'

/**
 * Heure format Long
 * ex : 12h30
 * @type {string}
 */
export const TIME_LONG = 'HH[h]mm'

/**
 * Heure format ISO
 * @type {string}
 */
export const TIME_FULL = 'HH:mm:ss'

/**
 * Date format FR
 * @type {string}
 */
export const DATE_FR = 'DD/MM/YYYY'

/**
 * Date format FR
 * @type {string}
 */
export const DATE_FR_MONTH_YEAR_LONG = 'MMMM YYYY'

/**
 * Date format `XX MOIS`
 * ex : `25 Janvier`
 * @type {string}
 */
export const DATE_FR_JOUR_MOIS_LONG = 'D MMMM'

/**
 * Date format FR long
 * @type {string}
 */
export const DATE_FR_LONG = 'DD MMMM YYYY'

/**
 * DateTime format FR
 * @type {string}
 */
export const DATETIME_FR = `${DATE_FR} ${TIME}`

/**
 * DateTime format FR
 * @type {string}
 */
export const DATETIME_FR_LONG = `${DATE_FR_LONG} à ${TIME_LONG}`

/**
 * Masque pour les dates au format ISO
 * @type {string}
 */
export const DATETIME_ISO = `${DATE_ISO}[T]${TIME_FULL}`

/**
 * Format de date de quasar
 * @type {string}
 */
export const DATE_QUASAR = 'YYYY/MM/DD'
