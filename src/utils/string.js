const isPlural = (subject) => subject === true || ((subject && subject.length) || subject) > 1

/**
 * Fonction basique de pluralisation d'un mot
 * @param w
 * @param subject
 * @param char
 */
export const plz = (w, subject = [], char = 's') => isPlural(subject)
  ? w + char
  : w
/**
 * Factory de pluralisation
 *
 * @param single
 * @param plural
 * @returns {function(Array)}
 */
export const plzFactory = (single, plural) => (subject) => isPlural(subject)
  ? plural
  : single
