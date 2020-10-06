import { scroll } from 'quasar'

/**
 * Scroll automatique jusqu'a un élément
 * @param el
 * @param duration
 */
export const scrollToElement = (el, duration = 500) =>
  scroll.setScrollPosition(
    scroll.getScrollTarget(el),
    el.offsetTop,
    duration
  )
