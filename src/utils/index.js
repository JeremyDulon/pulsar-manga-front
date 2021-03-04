const isPlural = (subject) => subject === true || ((subject && subject.length) || subject) > 1

/**
 * Fonction basique de pluralisation d'un mot
 * @param w
 * @param subject
 * @param char
 */
export const plr = (w, subject = [], char = 's') => isPlural(subject)
  ? w + char
  : w
